import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../layouts/index.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          component: () => import('@/pages/Home.vue'),
          name: 'index',
          path: '',
        },
        {
          component: () => import('@/pages/Channel.vue'),
          name: 'channel',
          path: 'channel/:id',
        },
        {
          component: () => import('@/pages/Playlist.vue'),
          name: 'playlist',
          path: 'playlist',
        },
        {
          component: () => import('@/pages/Search.vue'),
          name: 'search',
          path: 'search',
        },
        {
          component: () => import('@/pages/History.vue'),
          name: 'history',
          path: 'history',
        },
      ],
    },
    {
      path: '/watch',
      component: DefaultLayout,
      props: { sidebar: false },
      children: [
        {
          component: () => import('@/pages/Watch.vue'),
          name: 'watch',
          path: '',
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: '403',
      component: () => import('@/pages/403.vue'),
    },
  ],
})

export default router
