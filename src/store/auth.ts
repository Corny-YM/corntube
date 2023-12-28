import { defineStore } from 'pinia'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { RealtimePostgresChangesPayload, User } from '@supabase/supabase-js'
import { messagePopup } from '@/utils'
import {
  loginGoogle,
  logout,
  getUser,
  getSubscribedChannels,
  createSubscribedChannels,
  removeSubscribedChannels,
  createUserPlaylist,
  getUserPlaylist,
  addUserPlaylistItem,
} from '@/api/supabase'
import {
  DestroySubscribedRequest,
  IAddUserPlaylistItem,
  ISubscribed,
  IUserPlaylist,
  StoreSubscribedRequest,
} from '@/api/model/supabase'
import supabase from '@/services/supabase'

type IDatabaseName = 'UserPlaylists' | 'PlaylistItem' | 'Subscribeds'
interface ICallback {
  (
    payload: RealtimePostgresChangesPayload<{
      [key: string]: any
    }>
  ): void
}

export const useAuth = defineStore('auth', () => {
  const currentUser = ref<User | null>(
    JSON.parse(localStorage.getItem('currentUser')!)
  )
  const currentSubscribedChannel = ref<ISubscribed[]>([])
  const currentPlaylist = ref<IUserPlaylist[]>([])

  const user = computed(() => currentUser.value)
  const subscribedChannel = computed(() => currentSubscribedChannel.value)
  const userPlaylist = computed(() => currentPlaylist.value)
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

  const subscribePostgresChanges = (
    key: IDatabaseName,
    callback: ICallback
  ) => {
    supabase
      .channel(key)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: key },
        callback
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
      subscribePostgresChanges('Subscribeds', (data) => {
        const newSubscribed = data?.new as ISubscribed
        newSubscribed.subscriber = JSON.stringify(newSubscribed.subscriber)
        if (data.eventType === 'INSERT') {
          currentSubscribedChannel.value.push(newSubscribed)
        }
        if (data.eventType === 'DELETE') {
          const index = currentSubscribedChannel.value.findIndex(
            (c) => c.id === data.old.id
          )
          currentSubscribedChannel.value.splice(index, 1)
        }
      })
    }
  }
  const getPlaylist = async () => {
    if (!user.value) return
    const { data, error } = await getUserPlaylist(user.value.id)
    if (error) {
      messagePopup({
        type: 'error',
        content: 'Không thể lấy danh sách phát. Vui lòng thử lại sau',
      })
    }
    if (data) {
      currentPlaylist.value = data
      subscribePostgresChanges('UserPlaylists', (data) => {
        const newSubscribed = data?.new as IUserPlaylist
        if (data.eventType === 'INSERT') {
          currentPlaylist.value.push(newSubscribed)
        }
        if (data.eventType === 'DELETE') {
          const index = currentPlaylist.value.findIndex(
            (c) => c.id === data.old.id
          )
          currentPlaylist.value.splice(index, 1)
        }
      })
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

  const createPlaylist = async (name: string) => {
    if (!user.value) {
      await mutateLogin()
      return
    }
    const { error } = await createUserPlaylist({
      user_id: user.value.id,
      name: name,
    })
    if (error) {
      console.log(error)
      if (error.code !== '23505') messagePopup({ type: 'error' })
    } else {
      messagePopup({
        type: 'success',
        content: 'Tạo danh sách thành công',
      })
    }
  }

  const addPlaylistItem = async (data: IAddUserPlaylistItem) => {
    if (!user.value) return
    if (!data?.url)
      return messagePopup({
        type: 'error',
        content: 'Thêm thất bại. Vui lòng thử lại sau',
      })

    const { error } = await addUserPlaylistItem(data)
    if (error) {
      console.log(error)
      if (error.code !== '23505') messagePopup({ type: 'error' })
    } else {
      messagePopup({
        type: 'success',
        content: 'Thêm vào danh sách thành công',
      })
    }
  }

  watch([currentUser], () => {
    if (currentUser.value) {
      getSubscribed()
      getPlaylist()
    }
  })

  return {
    user,
    subscribedChannel,
    userPlaylist,
    isPendingLogin,
    isPendingLogout,
    mutateLogin,
    mutateLogout,
    getSubscribed,
    createSubscribed,
    removeSubscribed,
    getPlaylist,
    createPlaylist,
    addPlaylistItem,
  }
})
