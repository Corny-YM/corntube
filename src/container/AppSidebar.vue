<script setup lang="ts">
import { RightOutlined, MenuOutlined } from '@ant-design/icons-vue'
import { menuItem, menuFooterItem } from './sidebar.data'
import { useAuth } from '@/store/auth'
import { storeToRefs } from 'pinia'

const props = defineProps<{
  sidebar: boolean
  isShow: boolean
}>()
const emits = defineEmits(['update:isShow'])

const route = useRoute()
const auth = useAuth()
const { subscribedChannel } = storeToRefs(auth)

const sidebarRef = ref<HTMLDivElement | null>(null)
const sidebarOverlayRef = ref<HTMLDivElement | null>(null)
const isShowAll = ref(false)

const currentPath = computed(() => route.path)
const isShowSidebar = computed({
  get: () => props.isShow,
  set: (value) => emits('update:isShow', value),
})

const handleCloseSidebar = () => {
  unref(sidebarRef)?.classList.remove('active')
  unref(sidebarOverlayRef)?.classList.remove('active')
  unref(sidebarOverlayRef)?.classList.remove('showing')
  setTimeout(() => {
    isShowSidebar.value = false
  }, 250)
}
const handleShowAllSubscribed = () => {
  isShowAll.value = !isShowAll.value
}
const handleResize = () => {
  if (window.innerWidth <= 1281) {
    isShowSidebar.value = false
  }
}

onMounted(() => window.addEventListener('resize', handleResize))

onUnmounted(() => window.removeEventListener('resize', handleResize))
</script>

<template>
  <div class="relative">
    <div
      ref="sidebarRef"
      class="sidebar fixed top-0 bottom-0 z-[60]"
      :class="[
        isShowSidebar ? 'active' : '',
        sidebar ? 'min-[1281px]:relative' : 'transitioning',
      ]"
    >
      <div class="flex flex-col h-full max-h-[calc(100%-46px)]">
        <!-- Toggle bar & Logo -->
        <div
          class="flex items-center gap-2 select-none px-4 py-[14px]"
          :class="sidebar ? 'min-[1281px]:hidden' : ''"
        >
          <div
            class="center w-auto h-auto text-xl p-2 cursor-pointer rounded-full hover:bg-lightHover dark:hover:bg-darkHover"
            @click="handleCloseSidebar"
          >
            <MenuOutlined />
          </div>
          <router-link to="/" class="header-logo no-underline">
            <div class="text-3xl font-semibold font-rubikWet text-blueAntd">
              CornTube
            </div>
          </router-link>
        </div>

        <!-- MenuItem -->
        <div class="flex flex-col h-fit p-3 w-full">
          <router-link
            v-for="item in menuItem"
            :to="item.path"
            :key="item.path"
            :class="
              item.path === currentPath ? `bg-lightHover dark:bg-darkHover` : ''
            "
            class="h-10 flex items-center px-3 rounded-lg cursor-pointer hover:bg-lightHover dark:hover:bg-darkHover"
          >
            <div class="flex justify-center items-center mr-6">
              <component :is="item.icon" class="center w-6 h-6 text-2xl" />
            </div>
            <div class="center text-[16px]">{{ item.label }}</div>
          </router-link>
        </div>

        <!-- Menu subscribed -->
        <div
          class="menu-subscribed h-full max-h-full flex flex-col overflow-auto"
        >
          <div class="w-full h-full max-h-full px-3 py-2 flex flex-col">
            <p class="menu-subscribed__title border-blueAntd px-3 py-1 mb-2">
              Kênh đăng ký
            </p>

            <template v-if="subscribedChannel && subscribedChannel.length">
              <!-- List subscribed -->
              <div
                class="w-full h-fit flex flex-col"
                :key="subscribedChannel.length"
              >
                <SubscribedItem
                  v-for="channel in subscribedChannel.slice(
                    0,
                    isShowAll ? subscribedChannel.length : 7
                  )"
                  :key="channel.id"
                  :subscribed="JSON.parse(channel?.subscriber!)"
                />
              </div>

              <!-- Button show all subscribed -->
              <div
                v-if="subscribedChannel.length > 7"
                class="min-h-[40px] flex items-center px-3 rounded-lg cursor-pointer hover:bg-lightHover dark:hover:bg-darkHover"
                @click="handleShowAllSubscribed"
              >
                <div
                  class="flex justify-center items-center w-7 h-7 mr-4 transition-all"
                  :class="isShowAll ? '-rotate-90' : 'rotate-90'"
                >
                  <RightOutlined class="center w-4 h-4 text-2xl" />
                </div>
                <div class="center text-sm">
                  {{ isShowAll ? 'Ẩn bớt' : 'Hiện thị tất cả' }}
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>

      <!-- Menu footer -->
      <div class="menu-footer flex">
        <div class="w-full flex justify-end items-center py-3">
          <div class="center gap-2 mr-2">
            <a
              v-for="item in menuFooterItem"
              :key="item.href"
              :href="item.href"
              class="center"
              target="_blank"
            >
              <a-tag class="center m-0 dark:text-lightText" :color="item.color">
                <template #icon>
                  <component :is="item.icon" />
                </template>
                {{ item.title }}
              </a-tag>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="sidebar"
      class="sidebar-collapse hidden md:block"
      :class="!isShowSidebar ? 'active' : ''"
    >
      <!-- MenuItem -->
      <div class="flex flex-col px-1 py-3 w-full">
        <router-link
          v-for="item in menuItem"
          :to="item.path"
          :key="item.path"
          :class="
            item.path === currentPath ? `bg-lightHover dark:bg-darkHover` : ''
          "
          class="min-w-[76px] flex flex-col justify-center items-center gap-1 p-2 rounded-lg cursor-pointer hover:bg-lightHover dark:hover:bg-darkHover dark:text-lightText"
        >
          <div class="flex justify-center items-center">
            <component
              :is="item.icon"
              class="center w-6 h-6 text-2xl dark:text-lightText"
            />
          </div>
          <div class="center text-[10px]">{{ item.label }}</div>
        </router-link>
      </div>
    </div>

    <!-- Overlay -->
    <div
      ref="sidebarOverlayRef"
      class="sidebar-overlay"
      :class="[
        isShowSidebar ? 'active' : '',
        !sidebar && isShowSidebar ? 'showing' : '',
      ]"
      @click="handleCloseSidebar"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  @apply flex flex-col justify-between;
  @apply overflow-hidden bg-white dark:bg-primaryDark dark:text-lightText;
  width: 240px;
  height: 100%;
  transition: all 250ms ease-in-out !important;

  &.transitioning {
    display: flex !important;
    transform: translate3d(-100%, 0, 0) !important;
    &.active {
      transform: translate3d(0, 0, 0) !important;
    }
  }

  @media screen and (min-width: 1280px) {
    display: none;
    &.active {
      display: flex;
    }
  }
  @media screen and (max-width: 1280px) {
    // width: 0px;
    transform: translate3d(-100%, 0, 0);
    &.active {
      transform: translate3d(0, 0, 0);
    }
  }
}

.sidebar-collapse {
  transition: all 250ms ease-in-out;

  @media screen and (min-width: 1280px) {
    overflow: hidden;
    width: 0px;
    &.active {
      width: auto;
    }
  }
}

.sidebar-overlay {
  @apply bg-[#00000080] dark:bg-[#242424b5];
  @apply hidden fixed inset-0 z-[55];
  transition: all 250ms ease-in-out;

  &.showing {
    display: block !important;
  }

  @media screen and (max-width: 1280px) {
    @apply block invisible opacity-0;
    &.active {
      @apply visible opacity-100;
    }
  }
}

.menu-subscribed,
.menu-footer {
  width: 100%;
  border-top: 2px solid rgba(5, 5, 5, 0.06);
}

.menu-subscribed__title {
  @apply font-medium;
  border-left-width: 3px;
  border-left-style: solid;
}
</style>
