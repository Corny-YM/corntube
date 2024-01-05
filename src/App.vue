<script setup lang="ts">
import { useLocalDBStore } from '@/store/localDB'

const route = useRoute()
const router = useRouter()
const { init } = useLocalDBStore()

watch(
  () => route.hash,
  (hash) => {
    if (hash.startsWith('#access_token')) {
      router.replace({ ...route, hash: '' })
    }
  },
  { immediate: true }
)

onMounted(() => {
  init()
})
</script>

<template>
  <router-view />
</template>
