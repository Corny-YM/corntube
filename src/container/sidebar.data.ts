import { FacebookFilled, GithubFilled } from '@ant-design/icons-vue'
import Home from '@/components/Icons/Home.vue'
import Subscription from '@/components/Icons/Subscription.vue'
import Library from '@/components/Icons/Library.vue'
import Clock from '@/components/Icons/Clock.vue'
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
    label: 'Lịch sử',
    icon: Clock,
    path: '/history',
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

export const menuFooterItem = [
  {
    href: 'https://www.facebook.com/corny1508/',
    icon: FacebookFilled,
    title: 'Facebook',
    color: '#1e40af',
  },
  {
    href: 'https://github.com/Corny-YM',
    icon: GithubFilled,
    title: 'Github',
    color: 'default',
  },
]
