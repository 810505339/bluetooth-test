/* 使用leaflet */
import L from 'leaflet'
/* 使用leaflet.css */
import 'leaflet/dist/leaflet.css'
/* 使用快速导入地图 */
import 'leaflet.chinatmsproviders'
/* 使用移动回放 */
import 'leaflet-trackplayer'

// 引入 leaflet.markercluster  聚合插件
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import 'leaflet.markercluster'
/* 引入子插件 */
import 'leaflet.featuregroup.subgroup'
/* 引入自定义的css */
import '@/style/MarkerCluster.css'

/* 获取高德key */
const key = ''
/* mapname */
const mapName = 'GaoDe.Normal.Map'

export default () => {
  const markers = L.markerClusterGroup({
    spiderfyOnMaxZoom: true, // 当您在底部缩放级别单击集群时，我们会对其进行蜘蛛化，以便您可以查看其所有标记。
    showCoverageOnHover: true, // 当您将鼠标悬停在集群上时，它会显示其标记的边界。
    zoomToBoundsOnClick: true, // 当您单击集群时，我们会缩放到其边界。
    removeOutsideVisibleBounds: true, // 为了提高性能，将从地图中移除离视口太远的聚类和标记。
  })
  const group1 = L.featureGroup.subGroup(markers)
  const group2 = L.featureGroup.subGroup(markers)
  const map = ref<any>({})
  /* 初始化地图 */
  function initMap(
    el: HTMLElement,
    option = {
      center: [31.59, 120.29],
      zoom: 12,
      zoomControl: false,
    },
  ) {
    const normalm = L.tileLayer.chinaProvider(mapName, {
      key,
      maxZoom: 18,
      minZoom: 2,
    })

    const normal = L.layerGroup([normalm])
    const normalLayer = L.map(el, { layers: [normal], ...option })
    if (normalLayer) {
      map.value = normalLayer
      /* 取消点击放大 */
      map.value.doubleClickZoom.disable()
      const toolbar = L.control({ position: 'topleft' })
      toolbar.onAdd = () => {
        const buttonWrap = L.DomUtil.create('div', 'button-wrapper')
        const btn1 = L.DomUtil.create('button', 'button-wrapper')
        let flag = true
        let flag2 = true
        btn1.innerHTML = '第一个组数据隐藏'
        btn1.addEventListener('click', (e) => {
          flag = !flag
          if (flag) {
            group1.onAdd()
          } else {
            group1.onRemove()
          }
          btn1.innerHTML = flag ? '第一个组数据隐藏' : '第一个组数据显示'
        })
        const btn2 = L.DomUtil.create('button', 'button-wrapper')
        btn2.innerHTML = '第二个组数据隐藏'
        btn2.addEventListener('click', (e) => {
          flag2 = !flag2
          if (flag2) {
            group2.onAdd()
          } else {
            group2.onRemove()
          }
          btn2.innerHTML = flag ? '第二个组数据隐藏' : '第二个组数据显示'
        })
        buttonWrap.appendChild(btn1)
        buttonWrap.appendChild(btn2)

        return buttonWrap
      }
      toolbar.addTo(map.value)
    }
  }
  /* 使用动画播放轨迹 */
  function start(
    latlngs: any = [
      [34.191, 108.91770583134237],
      [34.291, 108.92770583134237],
      [34.29928596006031, 108.99],
    ],
  ) {
    const track = new L.TrackPlayer(latlngs, {
      markerIcon: L.icon({
        iconSize: [27, 54],
        iconAnchor: [13.5, 27],
        iconUrl: 'https://weijun-lab.github.io/Leaflet.TrackPlayer/lib/assets/car.png',
      }),
      speed: 2000,
      markerRotation: true,
    }).addTo(toRaw(map.value))
    track.marker.bindPopup(`<p id="car-popup">小车位置</p>`).openPopup()

    track.on('progress', (progress, { lng, lat }, index) => {
      document.getElementById('car-popup').innerHTML = `<p id="car-popup">小车位置${lng},${lat}</p>`
      console.log(`progress:${progress} - position:${lng},${lat} - trackIndex:${index}`)
    })
    track.start()
  }

  // 生成随机点
  const getRandomLatLng = () => {
    const bounds = map.value.getBounds()
    const southWest = bounds.getSouthWest()
    const northEast = bounds.getNorthEast()
    const lngSpan = northEast.lng - southWest.lng
    const latSpan = northEast.lat - southWest.lat
    return L.latLng(
      southWest.lat + latSpan * Math.random(),
      southWest.lng + lngSpan * Math.random(),
    )
  }
  /* 制作点 */
  /*  
    grop:{
      className：'',
      title:"",
      clickable: true, // 是否可以点击
      draggable: false, // 是否可以拖拽
      iconSize:[]
    }
  */
  function markerClusterGroup(markergrop: Array<any> = []) {
    const markergropDeep = markergrop?.map((defaultMarker) => {
      const latlng = L.latLng(defaultMarker.lat, defaultMarker.lng)
      const marker = L.marker(latlng, {
        title: defaultMarker?.title,
        clickable: defaultMarker?.clickable ?? true, // 是否可以点击
        draggable: defaultMarker?.clickable ?? false, // 是否可以拖拽
        icon: L.divIcon({
          className: defaultMarker?.className ?? '',
          html: `
          <div class="amap-marker">
          <div class="amap-marker-label">${defaultMarker?.title ?? '标题'}</div>
          <img src="${defaultMarker?.icon}" class="amap-marker-img" />
          </div>
          `,
          iconSize: [120, 120],
        }),
      })
      marker.on('click', addClick)
      return marker
    })
    return markergropDeep
    // markers.addLayers(grop)
    // /* toRaw https://juejin.cn/post/7107443391348080676 不使用这个会报错 */
    // toRaw(map.value).addLayer(markers)
  }
  /* 添加点 */
  function addLayers(grop: Array<any>) {
    // markers.addLayers(grop)
    grop.forEach((marker, i) => {
      if (i < 50) {
        marker.addTo(group1)
      } else {
        marker.addTo(group2)
      }
    })

    group1.addTo(map.value) // Adding to map now adds all child layers into the parent group.
    group2.addTo(map.value)
    /* toRaw https://juejin.cn/post/7107443391348080676 不使用这个会报错 */
    toRaw(map.value).addLayer(markers)
  }

  /* 给点添加点击事件 */
  function addClick(e: any) {
    alert(e.target.options.title)
  }

  /* 移除点 */
  function removeLayers(LatLngList: Array<any>) {
    console.log(LatLngList)
    markers.removeLayers(LatLngList)
  }
  /* 将点制作成marker */
  function makeMarker(lat: string, lng: string) {
    return L.latLng(lat, lng)
  }

  return {
    initMap,
    start,
    map,
    markerClusterGroup,
    removeLayers,
    getRandomLatLng,
    markers,
    makeMarker,
    addLayers,
  }
}
