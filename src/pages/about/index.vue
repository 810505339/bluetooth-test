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
  <view class="" pt-safe>
    <z-paging
      v-model="list"
      @query="queryList"
      ref="paging"
      @search="search"
      :auto-show-back-to-top="true"
    >
      <template v-slot:top>
        <view flex p-2>
          <wd-search maxlength="10" flex-1 cancel-txt="搜索" />
        </view>
      </template>
      <view p-5 border-b text-center v-for="(item, index) in list" :key="index">
        {{ item }}
      </view>
    </z-paging>
    <!-- 使用页面滚动 -->
    <!-- <z-paging
        :use-page-scroll="true"
        :refresher-only="true"
        ref="paging"
        @query="queryList"
        :auto-show-back-to-top="true"
      >
        <template #top>
          <wd-navbar title="标题" left-text="返回" right-text="按钮" left-arrow />
        </template>
        <view h-100vh>
          <wd-button block>你好</wd-button>
          <view><text text-xl bg-amber>你好</text></view>
        </view>
        <view h-100vh text-sm>这是一个蓝色</view>
        <view h-100vh text-sm>这是一个绿色</view>
      </z-paging> -->
  </view>
</template>

<script lang="ts" setup>
import { onPageScroll, onReachBottom } from '@dcloudio/uni-app'
import useZPaging from 'z-paging/components/z-paging/js/hooks/useZPaging'
const list = ref([])
const paging = ref<ZPagingInstance>()
useZPaging(paging)
function search() {
  paging.value?.reload(true)
}
// z-paging相关Events可以通过ZPagingEvent.Xxx设置Event类型，例如@query对应ZPagingEvent.Query、@scroll对应ZPagingEvent.Scroll
const queryList: ZPagingEvent.Query = (pageNo, pageSize) => {
  setTimeout(() => {
    const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
    paging.value?.complete(list)
    console.log(pageNo, pageSize)
  }, 500)
}

onPageScroll((e) => {
  console.log(e)
})
</script>

<style lang="scss" scoped>
//
</style>
