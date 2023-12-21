import { defineStore } from 'pinia'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { User } from '@supabase/supabase-js'
import { messagePopup } from '@/utils'
import {
  loginGoogle,
  logout,
  getUser,
  getSubscribedChannels,
  createSubscribedChannels,
  removeSubscribedChannels,
} from '@/api/supabase'
import {
  DestroySubscribedRequest,
  ISubscribed,
  StoreSubscribedRequest,
} from '@/api/model/supabase'
import supabase from '@/services/supabase'

export const useAuth = defineStore('auth', () => {
  const currentUser = ref<User | null>(
    JSON.parse(localStorage.getItem('currentUser')!)
  )
  const currentSubscribedChannel = ref<ISubscribed[]>([])

  const user = computed(() => currentUser.value)
  const subscribedChannel = computed(() => currentSubscribedChannel.value)
  const enabled = computed(() => !currentUser.value)

  useQuery({
    enabled: enabled,
    queryKey: ['user'],
    queryFn: () => getUser(),
    select(res) {
      if (res.data.user) {
        currentUser.value = res.data.user
        localStorage.setItem('currentUser', JSON.stringify(res.data.user))
      }
    },
  })

  const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
    mutationKey: ['login'],
    mutationFn: loginGoogle,
    onError() {
      messagePopup({
        content: 'Đăng nhập thất bại. Vui lòng thử lại sau',
        type: 'error',
      })
    },
  })
  const { mutate: mutateLogout, isPending: isPendingLogout } = useMutation({
    mutationKey: ['login'],
    mutationFn: logout,
    onSuccess() {
      currentUser.value = null
      currentSubscribedChannel.value = []
      localStorage.removeItem('currentUser')
      messagePopup({
        content: {
          content: 'Đăng xuất thành công',
          class: 'flex justify-end mr-2 mt-12 font-medium',
        },
        type: 'success',
      })
    },
  })

  const subscribePostgresChanges = () => {
    supabase
      .channel('Subscribeds')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'Subscribeds' },
        (data) => {
          const newSubscribed = data?.new as ISubscribed
          newSubscribed.subscriber = JSON.stringify(newSubscribed.subscriber)
          if (data.eventType === 'INSERT') {
            currentSubscribedChannel.value.push(newSubscribed)
            return
          }
          if (data.eventType === 'DELETE') {
            const index = currentSubscribedChannel.value.findIndex(
              (c) => c.id === data.old.id
            )
            currentSubscribedChannel.value.splice(index, 1)
            return
          }
        }
      )
      .subscribe()
  }

  const getSubscribed = async () => {
    if (!user.value) return
    const { data, error } = await getSubscribedChannels(user.value.id)
    if (error) {
      messagePopup({
        type: 'error',
        content: 'Không thể lấy danh sách kênh đã đăng ký 💀💀💀',
      })
    }
    if (data) {
      currentSubscribedChannel.value = data
      subscribePostgresChanges()
    }
  }

  const createSubscribed = async (value: StoreSubscribedRequest) => {
    if (!user.value) {
      await mutateLogin()
      return
    }
    const { error } = await createSubscribedChannels(value)
    if (error) {
      if (error.code !== '23505') messagePopup({ type: 'error' })
    } else {
      messagePopup({
        type: 'success',
        content: 'Đăng ký thành công',
      })
    }
  }
  const removeSubscribed = async (value: DestroySubscribedRequest) => {
    const { error } = await removeSubscribedChannels(value)
    if (error) {
      messagePopup({ type: 'error' })
    } else {
      messagePopup({
        type: 'info',
        content: 'Hủy đăng ký thành công',
      })
    }
  }

  const createPlaylist = async () => {
    if (!user.value) {
      await mutateLogin()
      return
    }
  }

  watch([currentUser], () => {
    if (currentUser.value) getSubscribed()
  })

  return {
    user,
    subscribedChannel,
    isPendingLogin,
    isPendingLogout,
    mutateLogin,
    mutateLogout,
    getSubscribed,
    createSubscribed,
    removeSubscribed,
  }
})
