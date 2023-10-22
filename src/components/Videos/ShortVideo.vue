<script setup lang="ts">
defineProps<{ detail?: boolean }>()
</script>

<template>
  <div class="w-fit center flex-col mx-2 mb-7 rounded-xl cursor-pointer">
    <!-- IMG -->
    <div class="flex justify-center rounded-xl overflow-hidden">
      <a-image
        :preview="false"
        src="https://i.ytimg.com/vi/dykiaeJWp3A/oar2.jpg?sqp=-oaymwEaCJUDENAFSFXyq4qpAwwIARUAAIhCcAHAAQY=&rs=AOn4CLCKLrIUHIisYuyS0sNn-Lbm_zWjeA"
      />
    </div>

    <!-- INFO -->
    <div class="flex items-center mt-3">
      <div class="flex flex-col">
        <!-- title content -->
        <div class="title-video">
            THE PROBLEM WITH MY ILLAOI... 
        </div>
        <!-- detail -->
        <div class="">738 N lượt xem</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title-video {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;

  max-width: 100%;
  max-height: 4.4rem;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0.25rem /* 4px */;
  font-size: 0.875rem /* 14px */;
  font-weight: 500;
  line-height: 1.25rem /* 20px */;
}
</style>
