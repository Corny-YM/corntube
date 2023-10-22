<script lang="ts" setup>
import {
  HomeOutlined,
  PlaySquareOutlined,
  SettingOutlined,
  AppstoreOutlined,
  FacebookFilled,
  GithubFilled,
  RightOutlined,
  MenuOutlined,
} from '@ant-design/icons-vue'

const menuItem = [
  {
    label: 'Trang chủ',
    icon: HomeOutlined,
    path: '/',
  },
  {
    label: 'Kênh đăng ký',
    icon: PlaySquareOutlined,
    path: '/subscribed',
  },
  {
    label: 'Thư viện',
    icon: AppstoreOutlined,
    path: '/library',
  },
  {
    label: 'Cài đặt',
    icon: SettingOutlined,
    path: '/settings',
  },
]

const subscribedItem = [
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

const props = defineProps<{
  sidebar: boolean
  isShow: boolean
}>()
const emits = defineEmits(['update:isShow'])

const sidebarRef = ref<HTMLDivElement | null>(null)
const sidebarOverlayRef = ref<HTMLDivElement | null>(null)

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
</script>

<template>
  <div class="relative">
    <div
      ref="sidebarRef"
      class="sidebar fixed top-0 bottom-0 z-[60]"
      :class="[
        isShowSidebar ? 'active' : '',
        sidebar ? 'xl:relative' : 'transitioning',
      ]"
    >
      <div class="flex flex-col h-full">
        <!-- Toggle bar & Logo -->
        <div
          class="flex items-center gap-2 select-none px-4 py-[14px]"
          :class="sidebar ? 'xl:hidden' : ''"
        >
          <div
            class="center w-auto h-auto text-xl p-2 cursor-pointer rounded-full hover:bg-lightHover"
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
        <div class="flex flex-col gap-2 p-3 w-full">
          <router-link
            v-for="item in menuItem"
            :to="item.path"
            :key="item.path"
            class="h-10 flex items-center px-3 rounded-lg cursor-pointer hover:bg-lightHover"
          >
            <div class="flex justify-center items-center mr-6">
              <component :is="item.icon" class="center w-6 h-6 text-2xl" />
            </div>
            <div class="center text-[16px]">{{ item.label }}</div>
          </router-link>
        </div>

        <!-- Menu subscribed -->
        <div class="menu-subscribed h-full flex flex-col">
          <div class="w-full h-full p-3">
            <p class="menu-subscribed__title border-blueAntd px-3 py-1">
              Kênh đăng ký
            </p>

            <!-- List subscribed -->
            <div class="w-full h-fit flex flex-col gap-1">
              <div
                v-for="subscribed in subscribedItem"
                :key="subscribed.id"
                class="h-11 flex items-center px-3 rounded-lg cursor-pointer hover:bg-lightHover"
              >
                <div class="flex justify-center items-center mr-4">
                  <a-avatar class="w-7 h-7" :src="subscribed.avatar" />
                </div>
                <div
                  class="text-[16px] font-medium overflow-hidden whitespace-nowrap text-ellipsis"
                >
                  {{ subscribed.name }}
                </div>
              </div>
            </div>

            <!-- Button show all subscribed -->
            <div
              class="h-10 flex items-center px-3 rounded-lg cursor-pointer hover:bg-lightHover"
            >
              <div class="flex justify-center items-center w-7 h-7 mr-4">
                <RightOutlined class="center w-4 h-4 text-2xl" />
              </div>
              <div class="center text-[16px]">Hiện thị tất cả</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Menu footer -->
      <div class="menu-footer flex">
        <div class="w-full flex justify-end items-center py-3">
          <div class="center gap-2 mr-2">
            <a class="center" href="https://www.facebook.com/corny1508/">
              <a-tag class="center m-0" color="#1e40af">
                <template #icon>
                  <FacebookFilled style="color: white" />
                </template>
                Facebook
              </a-tag>
            </a>
            <a class="center" href="https://github.com/Corny-YM">
              <a-tag class="center m-0">
                <template #icon>
                  <GithubFilled />
                </template>
                Github
              </a-tag>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="sidebar"
      class="sidebar-collapse"
      :class="!isShowSidebar ? 'active' : ''"
    >
      <!-- MenuItem -->
      <div class="flex flex-col px-2 py-3 w-full">
        <router-link
          v-for="item in menuItem"
          :to="item.path"
          :key="item.path"
          class="flex flex-col justify-center items-center gap-1 py-2 rounded-lg cursor-pointer hover:bg-lightHover"
        >
          <div class="flex justify-center items-center">
            <component :is="item.icon" class="center w-6 h-6 text-2xl" />
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
  @apply flex-col justify-between;
  @apply overflow-hidden bg-white;
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
  display: none;
  position: fixed;
  inset: 0;
  z-index: 55;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 250ms ease-in-out;

  &.showing {
    display: block !important;
  }

  @media screen and (max-width: 1280px) {
    display: block;
    visibility: hidden;
    opacity: 0;
    &.active {
      visibility: visible;
      opacity: 1;
    }
  }
}

.menu-subscribed,
.menu-footer {
  width: 100%;
  border-top: 2px solid rgba(5, 5, 5, 0.06);
}

menu-subscribed__title {
  border-left-width: 3px;
  border-left-style: solid;
}
</style>
