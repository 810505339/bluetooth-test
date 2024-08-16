import { ConfigProviderThemeVars } from 'wot-design-uni'
/* 默认的主题list */
export const colorColumns = [
  {
    value: '#0055FE',
    label: '蓝色',
  },
  {
    value: 'red',
    label: '红色',
  },
  {
    value: 'green',
    label: '绿色',
  },
]
/* 默认的主题 */
export const initThemState = 'light'
/* 默认的主题 */
export const initThemeVars: ConfigProviderThemeVars = {
  colorTheme: colorColumns[0].value,
}
