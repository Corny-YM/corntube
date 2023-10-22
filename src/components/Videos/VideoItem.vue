<script setup lang="ts">
defineProps<{ detail?: boolean; playlist?: boolean }>()
</script>

<template>
  <div class="w-fit center flex-col mx-2 mb-7 rounded-xl cursor-pointer">
    <!-- IMG -->
    <div class="flex justify-center rounded-xl overflow-hidden">
      <a-image
        :preview="false"
        src="https://i.ytimg.com/vi/iCKWkULdBRI/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBdm8eRQ0GXuORLGNoTLIq9qKit9Q"
      />
    </div>

    <!-- INFO -->
    <div class="flex items-center mt-3">
      <div v-if="detail" class="h-full mr-3">
        <a-avatar
          class="center w-9 h-9"
          src="https://i.pravatar.cc/150?img=3"
        />
      </div>
      <div class="flex flex-col">
        <!-- title content -->
        <div class="title-video">
          Future Mcdonald's Employee?!?! BUT WE FEEDING THIS UDYR! - Trick2g
        </div>
        <!-- channel -->
        <div v-if="detail">Spider-Menace</div>
        <!-- detail -->
        <div class="">537 N lượt xem • 11 tháng trước</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
