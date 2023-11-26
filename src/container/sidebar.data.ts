import Home from '@/components/Icons/Home.vue'
import Subscription from '@/components/Icons/Subscription.vue'
import Library from '@/components/Icons/Library.vue'
import Setting from '@/components/Icons/Setting.vue'

export const menuItem = [
  {
    label: 'Trang chủ',
    icon: Home,
    path: '/',
  },
  {
    label: 'Kênh đăng ký',
    icon: Subscription,
    path: '/subscribed',
  },
  {
    label: 'Thư viện',
    icon: Library,
    path: '/library',
  },
  {
    label: 'Cài đặt',
    icon: Setting,
    path: '/settings',
  },
]

export const subscribedItem = [
  {
    id: 1,
    avatar: 'https://i.pravatar.cc/150?img=3',
    name: 'The bausffs',
    path: '/channel/uashd123123',
  },
  {
    id: 2,
    avatar: 'https://i.pravatar.cc/150?img=12',
    name: 'F8',
    path: '/channel/uashd123123',
  },
  {
    id: 3,
    avatar: 'https://i.pravatar.cc/150?img=35',
    name: 'LL Stylish',
    path: '/channel/uashd123123',
  },
  {
    id: 4,
    avatar: 'https://i.pravatar.cc/150?img=35',
    name: 'LL Stylish',
    path: '/channel/uashd123123',
  },
  {
    id: 5,
    avatar: 'https://i.pravatar.cc/150?img=35',
    name: 'LL Stylish',
    path: '/channel/uashd123123',
  },
]
