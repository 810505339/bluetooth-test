<!-- 实例 -->
<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '下拉刷新',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <view>
    <wd-input type="text" placeholder="请输入用户名" />
  </view>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
//
::v-deep .wd-input {
  & .wd-input__inner {
    @apply text-amber;
  }
}
</style>
