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

    <wd-search placeholder-left>
      <template #suffix>
        <view flex items-center mx-4 gap-1 @click="handleClick">
          <text>扫码</text>
          <wd-icon name="scan" />
        </view>
      </template>
    </wd-search>

    <wd-message-box selector="wd-message-box-slot">
      <wd-button @click="closeMessage">关闭</wd-button>
    </wd-message-box>
    <view>
      <view py-4>
        <text>当前的模式是:{{ theme }}</text>
        <wd-button @click="themeStore.toggleTheme()">切换主题</wd-button>
      </view>
      <wd-select-picker
        :show-confirm="false"
        label="切换颜色"
        :columns="themeStore.colorColumns"
        v-model="themeVars.colorTheme"
        type="radio"
        :z-index="100"
      />
      <text text-primary>当前的颜色是:{{ themeVars.colorTheme }}</text>
      <view h-20 bg-primary center>背景颜色是主题色</view>
      <view h-20 bg-secondary text-primary center>背景颜色是次题色</view>
      <view flex items-center justify-around py-5>
        <view rounded-2 h-6 w-6 bg-t100 center text-12>r-2</view>
        <view rounded-4 h-12 w-12 bg-t100 center text-16>r-4</view>
        <view rounded-6 h-16 w-16 bg-t100 center text-18>r-6</view>
        <view rounded-8 h-24 w-24 bg-t100 center text-20>r-8</view>
      </view>
      <view h-20 border="~ primary solid" center text-18>边框颜色</view>
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
      <view p-2>
        <wd-button :round="false" m-2>确认</wd-button>
        <wd-button :round="false" m-2 disabled>禁止</wd-button>

        <wd-button :round="false" m-2 icon="add" plain>添加</wd-button>
        <view flex gap-5>
          <wd-button :round="false" block flex-1>确认</wd-button>
          <wd-button :round="false" block flex-1 custom-class="btn-secondary">取消</wd-button>
        </view>
        <wd-button :round="false" block my-2 size="large">主要按钮</wd-button>
        <wd-button :round="false" block my-2 size="large" custom-class="btn-secondary">
          次要按钮
        </wd-button>
        <wd-button :round="false" block my-2 plain size="large">镂空按钮</wd-button>
      </view>
      <view py-2>
        <wd-input type="text" v-model="value" placeholder="请输入用户名" />
      </view>

      <view mt-6>
        <wd-button @click="showActions">弹出菜单</wd-button>
        <wd-action-sheet v-model="show" :actions="actions" @close="close" :z-index="103" />
      </view>

      <wd-datetime-picker
        v-model="value"
        label="日期选择"
        @confirm="handleConfirm"
        :z-index="103"
      />

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
      <view mt-6>
        <wd-radio-group v-model="value" shape="dot">
          <wd-radio :value="1">单选框1</wd-radio>
          <wd-radio :value="2">单选框2</wd-radio>
        </wd-radio-group>
        <wd-radio-group v-model="value" shape="dot" inline>
          <wd-radio :value="1">单选框1</wd-radio>
          <wd-radio :value="2">单选框2</wd-radio>
        </wd-radio-group>
        <wd-checkbox-group v-model="value2" shape="square">
          <wd-checkbox modelValue="1" disabled>选项一</wd-checkbox>
          <wd-checkbox modelValue="2" shape="button">选项二</wd-checkbox>
          <wd-checkbox modelValue="3" shape="square">选项三</wd-checkbox>
          <wd-checkbox modelValue="4">选项四</wd-checkbox>
          <wd-checkbox modelValue="5">选项五</wd-checkbox>
          <wd-checkbox modelValue="6">选项六</wd-checkbox>
          <wd-checkbox modelValue="7">选项七</wd-checkbox>
        </wd-checkbox-group>
        <view>当前选中的值为:{{ value }}</view>
      </view>
      <view mt-6>
        <wd-textarea
          v-model="value10"
          :focus-when-clear="false"
          :maxlength="120"
          clearable
          show-word-limit
          auto-height
        />
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useThemeStore } from '@/store'
import { isH5, platform } from '@/utils/platform'
import { useQueue, useMessage } from 'wot-design-uni'
const message = useMessage('wd-message-box-slot')
const { closeOutside } = useQueue()
const themeStore = useThemeStore()
console.log(themeStore)
const { theme, rootStyle, themeVars } = storeToRefs(themeStore)
const value = ref<number>(Date.now())
const value1 = ref<number>(1)
const value2 = ref(['1'])
const value10 = ref('')
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
    if (!isH5) {
      plus.runtime.restart()
    }
  }, 1000)
}

function handleClick() {
  console.log(message)
  message
    .confirm({
      title: '评分',
    })
    .then(() => {
      message.alert(`你的评分为：100分`)
    })
    .catch((error) => {
      console.log(error)
    })
}

function closeMessage() {
  message.close()
}

const show = ref<boolean>(false)
const actions = ref([
  {
    name: '选项1',
  },
  {
    name: '选项2',
  },
  {
    name: '选项3',
    subname: '描述信息',
  },
])

function showActions() {
  show.value = true
}

function close() {
  show.value = false
}
</script>

<style lang="scss" scoped>
//
</style>
