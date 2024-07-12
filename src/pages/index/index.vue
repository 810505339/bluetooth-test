<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
  },
}
</route>
<template>
  <view
    class="bg-white overflow-hidden pt-2 px-4"
    :style="{ marginTop: safeAreaInsets?.top + 'px' }"
  >
    <view class="text-center mt-8">
      当前平台是：
      <text class="text-green-500">{{ PLATFORM.platform }}</text>
    </view>
    <view class="text-center mt-4">
      模板分支是：
      <text class="text-green-500">base</text>
    </view>

    <view>
      <wd-button @click="initBlue" block my-2>初始化蓝牙</wd-button>
      <wd-button @click="discovery" block my-2>搜索附近蓝牙设备</wd-button>
      <view>
        <text>附近蓝牙</text>
        <view v-for="(item, index) in blueDeviceList" :key="index" @click="connect(item)" py-4 px-2>
          <view>
            <text>id: {{ item.deviceId }}</text>
          </view>
          <view>
            <text>name: {{ item.name }}</text>
          </view>
        </view>
      </view>
      <view mt-2 v-if="device.name">
        <view>当前连接的蓝牙是id：{{ device.id }}</view>
        <view>当前连接的蓝牙是name：{{ device.name }}</view>
      </view>
      <wd-button @click="getServices" block my-2>获取蓝牙服务</wd-button>
      <wd-button @click="getCharacteristics" block my-2>获取特征值</wd-button>
      <wd-button @click="notify" block my-2>开启消息监听</wd-button>
      <wd-button @click="send" block my-2>发送数据</wd-button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import PLATFORM from '@/utils/platform'

// 搜索到的蓝牙设备列表
const blueDeviceList = ref([])
// 【1】初始化蓝牙
function initBlue() {
  uni.openBluetoothAdapter({
    success(res) {
      console.log('初始化蓝牙成功')
      console.log(res)
      uni.showToast({
        title: '初始化成功',
        icon: 'success',
      })
    },
    fail(err) {
      uni.showToast({
        title: '初始化失败' + err,
        icon: 'fail',
      })
    },
  })
}

// 【2】开始搜寻附近设备
function discovery() {
  uni.startBluetoothDevicesDiscovery({
    success(res) {
      console.log('开始搜索')

      // 开启监听回调
      uni.onBluetoothDeviceFound(found)
    },
    fail(err) {
      console.log('搜索失败')
      console.error(err)
    },
  })
}

// 【3】找到新设备就触发该方法
function found(res) {
  console.log(res)
  blueDeviceList.value.push(res.devices[0])
}

// 蓝牙设备的id
const device = ref({
  name: '',
  id: '',
})

// 【4】连接设备
function connect(data) {
  console.log(data)

  device.value = {
    name: data.name,
    id: data.deviceId,
  }

  uni.createBLEConnection({
    deviceId: device.value.id,
    success(res) {
      console.log('连接成功')
      console.log(res)

      uni.showToast({
        title: '连接成功',
        icon: 'success',
      })
      // 停止搜索
      stopDiscovery()
    },
    fail(err) {
      console.log('连接失败')
      console.error(err)
    },
  })
}

// 【5】停止搜索
function stopDiscovery() {
  uni.stopBluetoothDevicesDiscovery({
    success(res) {
      console.log('停止成功')
      console.log(res)
    },
    fail(err) {
      console.log('停止失败')
      console.error(err)
    },
  })
}

// 【6】获取服务
function getServices() {
  uni.getBLEDeviceServices({
    deviceId: device.value.id, // 设备ID，在上一步【4】里获取
    success(res) {
      console.log(res)
    },
    fail(err) {
      console.error(err)
    },
  })
}

// 【7】获取特征值
function getCharacteristics() {
  uni.getBLEDeviceCharacteristics({
    deviceId: device.value.id, // 设备ID，在【4】里获取到
    serviceId: '0000FFE0-0000-1000-8000-00805F9B34FB', // 服务UUID，在【6】里能获取到
    success(res) {
      console.log(res)
    },
    fail(err) {
      console.error(err)
    },
  })
}

// 【8】开启消息监听
function notify() {
  uni.notifyBLECharacteristicValueChange({
    deviceId: device.value.id, // 设备ID，在【4】里获取到
    serviceId: '0000FFE0-0000-1000-8000-00805F9B34FB', // 服务UUID，在【6】里能获取到
    characteristicId: '0000FFE1-0000-1000-8000-00805F9B34FB', // 特征值，在【7】里能获取到
    success(res) {
      console.log(res)

      // 接受消息的方法
      listenValueChange()
    },
    fail(err) {
      console.error(err)
    },
  })
}

// ArrayBuffer转16进度字符串示例
function ab2hex(buffer) {
  const hexArr = Array.prototype.map.call(new Uint8Array(buffer), function (bit) {
    return ('00' + bit.toString(16)).slice(-2)
  })
  return hexArr.join('')
}

// 将16进制的内容转成我们看得懂的字符串内容
function hexCharCodeToStr(hexCharCodeStr) {
  const trimedStr = hexCharCodeStr.trim()
  const rawStr = trimedStr.substr(0, 2).toLowerCase() === '0x' ? trimedStr.substr(2) : trimedStr
  const len = rawStr.length
  if (len % 2 !== 0) {
    alert('存在非法字符!')
    return ''
  }
  let curCharCode
  const resultStr = []
  for (let i = 0; i < len; i = i + 2) {
    curCharCode = parseInt(rawStr.substr(i, 2), 16)
    resultStr.push(String.fromCharCode(curCharCode))
  }
  return resultStr.join('')
}

// 【9】监听消息变化
function listenValueChange() {
  uni.onBLECharacteristicValueChange((res) => {
    // 结果
    console.log(res)

    // 结果里有个value值，该值为 ArrayBuffer 类型，所以在控制台无法用肉眼观察到，必须将该值转换为16进制
    const resHex = ab2hex(res.value)
    console.log(resHex)

    // 最后将16进制转换为ascii码，就能看到对应的结果
    const result = hexCharCodeToStr(resHex)
    console.log(result)
  })
}

// 【10】发送数据
function send() {
  // 向蓝牙设备发送一个0x00的16进制数据

  const msg = 'hello'

  const buffer = new ArrayBuffer(msg.length)
  const dataView = new DataView(buffer)
  // dataView.setUint8(0, 0)

  for (let i = 0; i < msg.length; i++) {
    dataView.setUint8(i, msg.charAt(i).charCodeAt())
  }

  uni.writeBLECharacteristicValue({
    deviceId: device.value.id, // 设备ID，在【4】里获取到
    serviceId: '0000FFE0-0000-1000-8000-00805F9B34FB', // 服务UUID，在【6】里能获取到
    characteristicId: '0000FFE1-0000-1000-8000-00805F9B34FB', // 特征值，在【7】里能获取到
    value: buffer as unknown as any[],
    success(res) {
      console.log(res)
    },
    fail(err) {
      console.error(err)
    },
  })
}

defineOptions({
  name: 'Home',
})

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

onLoad(() => {})
</script>

<style>
.main-title-color {
  color: #d14328;
}
</style>
