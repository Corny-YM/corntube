<script setup lang="ts">
import ChannelHeader from '@/components/Channel/Header.vue'
import ChannelTabs from '@/components/Channel/Tabs/index.vue'
</script>

<template>
  <div class="w-full h-full overflow-y-auto">
    <!-- Banner Picture -->
    <div class="center">
      <a-image
        width="100%"
        src="https://pipedproxy.kavin.rocks/v_1RuJiuBNSsxeunJJH8_X4GWCHjz13yxpizS4qgjajmrwQtvGaBKfpHZQjOrrU-VWP9Fa38Q5Q=w1060-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rw?host=yt3.googleusercontent.com"
        :preview="false"
      />
    </div>

    <!-- Channel Header -->
    <ChannelHeader />

    <!-- Tabs -->
    <ChannelTabs />
  </div>
</template>
