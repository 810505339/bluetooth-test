<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '设置',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <view @click="closeOutside">
    <wd-navbar title="设置" fixed placeholder safeAreaInsetTop left-arrow />
    <view>
      <text text-sm>当前的颜色是:{{ themeVars.colorTheme }}</text>
      <wd-select-picker
        label="切换颜色"
        :columns="themeStore.colorColumns"
        v-model="themeVars.colorTheme"
        type="radio"
        :z-index="100"
      />
    </view>
    <wd-select-picker
      label="字体大小"
      :columns="themeStore.fontSizecolumns"
      v-model="rootStyle.rootFontSize"
      :z-index="100"
      type="radio"
      @change="handleChange"
    />

    <view>
      <view py-2>
        <wd-popover mode="menu" :content="menu">
          <wd-button>列表</wd-button>
        </wd-popover>
        <wd-button>主要按钮</wd-button>
        <wd-button plain>主要按钮</wd-button>
      </view>
      <view py-2>
        <wd-input type="text" v-model="value" placeholder="请输入用户名" />
      </view>

      <wd-datetime-picker
        v-model="value"
        label="日期选择"
        @confirm="handleConfirm"
        :z-index="101"
      />

      <view>
        <text text-sm>当前的模式是:{{ theme }}</text>
        <wd-button @click="themeStore.toggleTheme()">切换主题</wd-button>
      </view>

      <wd-tabs v-model="tab" mt-6>
        <block v-for="item in 4" :key="item">
          <wd-tab :title="`标签${item}`">
            <view h-20>内容{{ item }}</view>
          </wd-tab>
        </block>
      </wd-tabs>
      <wd-segmented mt-6 :options="list" v-model:value="current" />
      <wd-calendar v-model="value" label="日期选择" />
      <wd-notice-bar
        text="这是一条消息提示信息，这是一条消息提示信息，这是一条消息提示信息"
        prefix="warn-bold"
      />
      <view mt-6>
        <wd-slider v-model="slider" />
      </view>
      <view mt-6>
        <wd-switch v-model="checked" />
      </view>
      <view mt-6>
        <wd-input-number v-model="slider" />
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useThemeStore } from '@/store'
import { useQueue, useMessage } from 'wot-design-uni'
const message = useMessage()
const { closeOutside } = useQueue()
const themeStore = useThemeStore()
const { theme, rootStyle, themeVars } = storeToRefs(themeStore)
const value = ref<number>(Date.now())
function handleConfirm({ value }) {
  console.log(new Date(value))
}
function formatter(type, value) {
  switch (type) {
    case 'year':
      return value + '年'
    case 'month':
      return value + '月'
    case 'date':
      return value + '日'
    case 'hour':
      return value + '时'
    case 'minute':
      return value + '分'
    default:
      return value
  }
}
const menu = ref<Array<Record<string, any>>>([
  {
    iconClass: 'read',
    content: '全部标记已读',
  },
  {
    iconClass: 'delete',
    content: '清空最近会话',
  },
  {
    iconClass: 'detection',
    content: '消息订阅设置',
  },
  {
    iconClass: 'subscribe',
    content: '消息异常检测',
  },
])
const tab = ref<number>(0)
const list = ref<string[]>(['评论', '点赞', '贡献', '打赏'])

const current = ref('点赞')
const slider = ref<number>(30)
const checked = ref<boolean>(true)

function handleChange({ value }) {
  setTimeout(() => {
    plus.runtime.restart()
  }, 1000)
}
</script>

<style lang="scss" scoped>
//
</style>
