<script lang="ts" setup>
import { CaretRightOutlined } from '@ant-design/icons-vue'

const activeKey = ref()
</script>

<template>
  <a-collapse v-model:activeKey="activeKey" :bordered="false">
    <template #expandIcon="{ isActive }">
      <caret-right-outlined :rotate="isActive ? 90 : 0" />
    </template>
    <a-collapse-panel key="1" header="Hiển thị thêm">
      <span>
        Make sure to hit the like button and subscribe to my channel!<br /><br />↓
        More Info Below ↓
        <br />
        <br />
        For business inquiries ➡
        <a
          style="color: #41b883; text-decoration: none"
          href="mailto:thebausffs@evolved.gg"
        >
          thebausffs@evolved.gg
        </a>
        <br />
        <br />
        •Twitch ➡
        <a
          style="color: #41b883; text-decoration: none"
          href="http://www.twitch.tv/thebausffs"
          target="_blank"
          ref="noopener"
        >
          http://www.twitch.tv/thebausffs
        </a>
        <br />
        •Twitter ➡
        <a
          style="color: #41b883; text-decoration: none"
          href="http://www.twitter.com/thebausffs"
          target="_blank"
          ref="noopener"
        >
          http://www.twitter.com/thebausffs
        </a>
        <br />
        •Discord ➡
        <a
          style="color: #41b883; text-decoration: none"
          href="https://www.discord.gg/thebausffs"
          target="_blank"
          ref="noopener"
        >
          https://www.discord.gg/thebausffs
        </a>
        <br />
        <br />
        YTB Management/Edit/Thumbnail by Kipro ➡
        <a
          style="color: #41b883; text-decoration: none"
          href="https://twitter.com/kipro31"
          target="_blank"
          ref="noopener"
        >
          https://twitter.com/kipro31
        </a>
        <br />
        <br />
        Pre-Intro song ➡ FLYIN - Say it Now
        <br />
        Intro song "8 Bit Adventure" By HeatleyBros ➡ "8 Bit Adventure!" Querky
        Fun Chiptun...
        <br />
        <br />
        Outro song ➡ LAKEY INSPIRED - Better Days
        <br />
        LAKEY INSPIRED ➡ @lakeyinspired
        <br />
        <br />
        <span style="color: #41b883"> #Thebausffs </span>
        <span style="color: #41b883">#ShillingGang</span>
      </span>
    </a-collapse-panel>
  </a-collapse>
</template>
