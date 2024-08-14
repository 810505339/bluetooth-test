<script setup lang="ts">
import { useThemeStore } from '@/store'
const themeStore = useThemeStore()
const { themeVars, theme, rootStyle } = storeToRefs(themeStore)
</script>

<template>
  <view pt20>{{ rootStyle.rootFontSize }}</view>
  <view class="base-layout" :style="{ '--base-font-size': rootStyle.rootFontSize }">
    <wd-config-provider :themeVars="themeVars" :theme="theme" :class="theme">
      <KuRootView />
      <wd-toast />
      <wd-message-box :zIndex="102" />
    </wd-config-provider>
  </view>
</template>
