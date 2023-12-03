import { defineStore } from 'pinia'
import { User } from '@supabase/supabase-js'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { getUser, loginGoogle, logout } from '@/api/supabase'
import { messagePopup } from '@/utils'

export const useAuth = defineStore('auth', () => {
  const currentUser = ref<User | null>(
    JSON.parse(localStorage.getItem('currentUser')!)
  )

  const user = computed(() => currentUser.value)
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

  return {
    user,
    isPendingLogin,
    isPendingLogout,
    mutateLogin,
    mutateLogout,
  }
})
