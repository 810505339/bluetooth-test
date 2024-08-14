<!-- <route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '一键导航',
  },
}
</route>

<template>
  <view>
    <view>
      <view class="page-section page-section-gap">
        <map style="width: 100%; height: 300px" />
      </view>
      <button type="primary" @click="showRoute()">开启导航</button>
      <button type="primary" @click="startNaviDirectly()">直接导航</button>
    </view>
  </view>
</template>

<script lang="ts">
// // // 插件
const OneNavi = uni.requireNativePlugin('AMap-OneNavi') // 2101//插件
</script>

<script lang="ts" setup>
const data = ref({
  start: {
    coordinate: {
      latitude: 29.61751708984375,
      longitude: 106.5043967013889,
    },
    name: '渝北区黄山大道中段6号', //,
  },
  wayPoints: [
    {
      coordinate: {
        latitude: 29.68751708984375,
        longitude: 106.5243967013889,
      },
      name: '渝北区',
    },
  ],
  end: {
    coordinate: {
      latitude: 29.72097552154459,
      longitude: 106.62744411176179,
    },
    name: '渝北区渝航路一巷31号',
  },
})

const onNaviCallback = (type: string, data: any) => {
  // 回调处理，参考https://a.amap.com/lbs/static/unzip/Android_Navi_Doc/com/amap/api/navi/INaviInfoCallback.html
  if (type === 'onArriveDestination') {
    // 到达目的地后回调函数。
    const isEmulaterNavi = data // true代表是模拟导航到达目的地，false代表实时导航到达目的地
    OneNavi.exitRoute()
  } else if (type === 'onArrivedWayPoint') {
    // 驾车路径导航到达某个途经点的回调函数
    const wayID = data // 到达途径点的编号，标号从0开始，依次累加。
  } else if (type === 'onBroadcastModeChanged') {
    // 播报模式变化回调
    var mode = data // 1-简洁播报 2-详细播报 3-静音
  } else if (type === 'onCalculateRouteFailure') {
    // 驾车路径规划失败后的回调函数
    const errorInfo = data // errorInfo-参见PathPlanningErrCode: https://a.amap.com/lbs/static/unzip/Android_Navi_Doc/index.html
  } else if (type === 'onCalculateRouteSuccess') {
    // 路线规划成功回调
    const ids = data // 路线索引id数组，第一条为12，第二条为13，第三条为14
  } else if (type === 'onDayAndNightModeChanged') {
    // 昼夜模式设置变化回调
    var mode = data // 0-自动切换 1-白天 2-夜间
  } else if (type === 'onExitPage') {
    // 退出组件或退出组件导航的回调函数
    const pageType = data // 1：退出导航页面，2:退出组件页面（包含路径规划、搜索和导航）
  } else if (type === 'onGetNavigationText') {
    // 导航播报信息回调函数
    const s = data // 播报文字
  } else if (type === 'onInitNaviFailure') {
    // 导航初始化失败时的回调函数
  } else if (type === 'onLocationChange') {
    // 当GPS位置有更新时的回调函数
    const location = data // 当前位置的定位信息,字段参考https://a.amap.com/lbs/static/unzip/Android_Navi_Doc/index.html
  } else if (type === 'onMapTypeChanged') {
    // 组件地图白天黑夜模式切换回调
    const mapType = data // 3-黑夜，4-白天
  } else if (type === 'onNaviDirectionChanged') {
    // 导航视角变化回调
    const naviMode = data // 导航视角, 1-正北朝上模式 2-车头朝上状态
  } else if (type === 'onReCalculateRoute') {
    // 重新规划的回调
    var type = data // type-参见ReCalculateRouteType: https://a.amap.com/lbs/static/unzip/Android_Navi_Doc/index.html
  } else if (type === 'onScaleAutoChanged') {
    // 比例尺智能缩放设置变化回调
    const enable = data // 是否开启
  } else if (type === 'onStartNavi') {
    // 启动导航后的回调函数
    var type = data // 1:实时导航 2:模拟导航 3:巡航模式(android) <=0:未开始导航
  } else if (type === 'onStopSpeaking') {
    // 停止播报回调。当退出组件导航页，或切换组件的播报模式为静音的时候，会触发该回调
  } else if (type === 'onStrategyChanged') {
    // 切换算路偏好回调
    const strategy = data // 切换后偏好 参考https://a.amap.com/lbs/static/unzip/Android_Navi_Doc/index.html
  }
}

const showRoute = () => {
  // 开始导航，参数全部可选
  OneNavi.showRoute(
    {
      // start:this.start,//起点，不设置当前位置做为起点
      // wayPoints:this.wayPoints,//途径点，不超过3个
      end: data.value.end, // 终点,
      pageType: 0, // 页面类型，0:进入路线页面， 1：进入导航页面
      // broadcastMode:3,//设置播报模式 1-简洁播报 2-详细播报 3-静音模式
      // carDirectionMode:1, //设置导航视角,1-正北向上 2-车头向上
      // carInfo:this.carInfo,//设置车辆信息，进行尾号限行与货车导航
      // dayAndNightMode:0, //设置导航页面昼夜模式,0-自动切换 1-白天 2-夜间
      // multipleRouteNaviMode:true, //设置是否多路线导航模式，true:多路线导航模式, false:单路线导航模式 默认为true
      // naviMode:1, //1-实时导航 2-模拟导航
      // needCalculateRouteWhenPresent:true,//启动组件进行直接导航时，设置是否进行算路，true : 算路，false : 启动组件以后不会算路直接开启导航。默认为true。
      needDestroyDriveManagerInstanceWhenNaviExit: true, // 退出导航组件是否销毁导航实例,true-退出导航页时停止导航，退出组件时销毁导航 false-退出组件不会销毁导航；当使用组件直接导航时，退出导航页也不会停止导航
      // routeStrategy:10, //设置组件规划路线的策略，默认为速度优先+躲避拥堵+距离较短,参考https://a.amap.com/lbs/static/unzip/Android_Navi_Doc/com/amap/api/navi/enums/PathPlanningStrategy.html
      // scaleAutoChangeEnable:true, //设置比例尺智能缩放是否开启
      // secondActionVisible:false, //设置组件导航页是否显示下下个路口引导，默认不显示,注意：该接口仅驾车模式有效
      // showCrossImage:true, //设置驾车导航时是否显示路口放大图
      showExitNaviDialog: true, // 设置退出导航组件是否显示退出弹框
      // showRouteStrategyPreferenceView:false, //表示设置路径规划偏好策略页面是否显示
      // showVoiceSetings:false, //是否展示导航语音播报设置项
      theme: 0, // 组件主题 范围0-2分别表示蓝色，白色， 黑色
      // trafficEnabled:false, //导航组件路况开关是否打开, 默认为false
      isUseInternalTTS: true, // 是否使用内部语音播报 注意：6.1.0版本开始，默认值改为true
    },
    function (res) {
      console.log(res)
      // 回调处理
      onNaviCallback(res.type, res.data)
    },
  )
}

const startNaviDirectly = () => {
  OneNavi.showRoute(
    {
      pageType: 1, // 0:进入路线页面， 1：进入导航页面
      // start:this.start,//起点
      end: data.value.end, /// /终点
      isUseInternalTTS: false, // 是否使用内部语音播报 注意：6.1.0版本开始，默认值改为true
      needDestroyDriveManagerInstanceWhenNaviExit: true,
    },
    function (res) {
      console.log(res)
      // 回调处理
      onNaviCallback(res.type, res.data)
    },
  )
}
</script>

<style lang="scss" scoped>
//
</style> -->
<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '关于',
  },
}
</route>

<template>
  <view class="">关于</view>
</template>

<script lang="ts" setup>
//
</script>

<style lang="scss" scoped>
//
</style>
