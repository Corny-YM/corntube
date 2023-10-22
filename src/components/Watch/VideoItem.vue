<script setup lang="ts"></script>

<template>
  <a
    href="https://www.youtube.com/watch?v=xrucyTvoe3k&ab_channel=Trick2G"
    class="video-item"
  >
    <!-- IMG -->
    <div class="flex justify-center rounded-xl overflow-hidden mr-2">
      <a-image
        :preview="false"
        width="320px"
        height="94px"
        src="https://i.ytimg.com/vi/iCKWkULdBRI/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBdm8eRQ0GXuORLGNoTLIq9qKit9Q"
      />
    </div>

    <!-- INFO -->
    <div class="flex items-center">
      <div class="flex flex-col">
        <!-- title content -->
        <div class="title-video">
          Future Mcdonald's Employee?!?! BUT WE FEEDING THIS UDYR! - Trick2g
        </div>
        <!-- channel -->
        <div class="mb-1 text-xs">Spider-Menace</div>
        <!-- detail -->
        <div class="text-xs">537 N lượt xem • 11 tháng trước</div>
      </div>
    </div>
  </a>
</template>

<style lang="scss" scoped>
.video-item {
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
  border-radius: 12px;
  cursor: pointer;
  margin-bottom: 8px;
}
</style>
