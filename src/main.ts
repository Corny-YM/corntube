import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import VuePlyr from 'vue-plyr'
import Antd from 'ant-design-vue'

import 'vue-plyr/dist/vue-plyr.css'
import 'ant-design-vue/dist/reset.css'
import './index.css'
import './assets/scss/index.scss'

import App from './App.vue'
import router from './router'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(Antd)
app.use(pinia)
app.use(VuePlyr, {
  plyr: {},
})
app.use(VueQueryPlugin, {
  queryClient: new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  }),
})

app.mount('#app')
