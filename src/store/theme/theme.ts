import { defineStore } from 'pinia'
import { initRootStyle, fontSizecolumns } from './rootStyle'
import { initThemeVars, initThemState, colorColumns } from './rootTheme'

export const useThemeStore = defineStore(
  'theme',
  () => {
    /* 暗黑模式切换 */
    const theme = ref<'light' | 'dark'>(initThemState)
    /* 组件库的主题色 */
    const themeVars = ref({ ...initThemeVars })
    /* 全局的配置 */
    const rootStyle = ref({ ...initRootStyle })
    /* 切换暗黑模式 */
    function toggleTheme(mode?: 'light' | 'dark') {
      theme.value = mode || (theme.value === 'light' ? 'dark' : 'light')
      uni.setNavigationBarColor({
        frontColor: theme.value === 'light' ? '#000000' : '#ffffff',
      })
    }
    /* 切换文字大小 */
    function changeFontSize(rootFontSize: string) {
      rootStyle.value.rootFontSize = rootFontSize
    }

    return {
      theme,
      themeVars,
      rootStyle,
      toggleTheme,
      fontSizecolumns,
      changeFontSize,
      colorColumns,
    }
  },
  {
    persist: true,
  },
)
