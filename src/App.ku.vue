<script setup lang="ts">
import { useThemeStore } from '@/store'
const themeStore = useThemeStore()
const { themeVars, theme, rootStyle } = storeToRefs(themeStore)
</script>

<template>
  <!-- 无效官方没修复bug首页会无效全局字体 -->
  <!-- <page-meta v-bind="rootStyle"></page-meta> -->
  <view class="base-layout" :style="{ '--base-font-size': rootStyle.rootFontSize }" :class="theme">
    <view pt20>{{ rootStyle.rootFontSize }}</view>
    <wd-config-provider :themeVars="themeVars" :theme="theme">
      <KuRootView />
      <wd-toast />
      <wd-message-box :zIndex="102" />
    </wd-config-provider>
  </view>
</template>
