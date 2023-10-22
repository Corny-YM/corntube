<script setup lang="ts">
import { MenuOutlined } from '@ant-design/icons-vue'

const props = defineProps<{
  isShow: boolean
}>()

const emits = defineEmits(['update:isShow'])

const isShow = computed({
  get: () => props.isShow,
  set: (value) => emits('update:isShow', value),
})
</script>

<template>
  <header class="header">
    <div class="flex items-center gap-2 select-none">
      <!-- Toggle bar -->
      <div
        class="center w-full h-full text-xl p-2 cursor-pointer rounded-full hover:bg-lightHover"
        @click="isShow = !isShow"
      >
        <MenuOutlined />
      </div>

      <!-- Logo -->
      <router-link to="/" class="header-logo no-underline">
        <div class="text-3xl font-semibold font-rubikWet text-blueAntd">
          CornTube
        </div>
      </router-link>
    </div>

    <!-- Search -->
    <SearchBar />

    <!-- More -->
    <div class="flex justify-center items-center gap-5">
      <ToggleTheme />

      <a-dropdown :trigger="['click']" class="cursor-pointer">
        <Avatar />
        <template #overlay>
          <div
            class="card-profile bg-white border border-solid border-slate-400"
          >
            <div class="card-profile__content cursor-default">
              <div class="flex justify-center items-center gap-4">
                <Avatar />
                <div class="flex flex-col gap-2">
                  <span class="font-semibold text-base">The Anh Nguyen</span>
                  <a-tag color="blue">theanh9356@gmail.com</a-tag>
                </div>
              </div>
            </div>
            <a-divider class="m-0" type="horizontal" />
            <div class="card-profile__action">
              <a-button type="primary">Đăng xuất</a-button>
            </div>
          </div>
        </template>
      </a-dropdown>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 64px;
  z-index: 50;
  margin: 0;
  padding: 0.625rem 1rem;
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;

  &-logo {
    display: flex;
    justify-items: center;
    font-size: 22px;
    color: #555;
    gap: 0.5rem;
    // border-right: solid 1px rgba(0, 0, 0, 0.1);
  }
}

.card-profile {
  width: max-content;
  border-radius: 8px;

  &__content {
    padding: 12px 16px;
  }

  &__action {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 12px 16px;
  }
}
</style>
