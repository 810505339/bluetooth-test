import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  globalStyle: {
    navigationStyle: 'default',
    navigationBarTitleText: 'unibest',
    navigationBarBackgroundColor: '#f8f8f8',
    navigationBarTextStyle: 'black',
    backgroundColor: '#FFFFFF',
    'app-plus': {
      bounce: 'none', // 将回弹属性关掉
      titleNView: false, // 关闭原生的状态高度
    },
  },
  easycom: {
    autoscan: true,
    custom: {
      '^wd-(.*)': 'wot-design-uni/components/wd-$1/wd-$1.vue',
      '^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)':
        'z-paging/components/z-paging$1/z-paging$1.vue',
    },
  },
  tabBar: {
    color: '#999999',
    selectedColor: '#018d71',
    backgroundColor: '#F8F8F8',
    borderStyle: 'black',
    height: '50px',
    fontSize: '10px',
    iconWidth: '24px',
    spacing: '3px',
    list: [
      {
        pagePath: 'pages/index/index',
        icon: 'home',
        iconType: 'wot',
        text: '首页',
      },
      {
        icon: 'home',
        iconType: 'wot',
        pagePath: 'pages/setting/index',
        text: '服务',
      },
      {
        icon: 'home',
        iconType: 'wot',
        pagePath: 'pages/about/about',
        text: '定位',
      },
    ],
  },
})
