<script setup lang="ts">
import { useThemeStore } from '@/store'
const themeStore = useThemeStore()
const { themeVars, theme, rootStyle } = storeToRefs(themeStore)

onShow(() => {
  themeStore.initTheme()
})
</script>

<template>
  <!-- 无效官方没修复bug首页会无效全局字体 -->
  <!-- <page-meta v-bind="rootStyle"></page-meta> -->
  <view class="base-layout" :style="{ '--base-font-size': rootStyle.rootFontSize }" :class="theme">
    <wd-config-provider :themeVars="themeVars" :theme="theme">
      <KuRootView />
      <wd-toast />
      <wd-message-box :zIndex="102" />
    </wd-config-provider>
  </view>
</template>
