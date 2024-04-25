export interface CompositeTab {
  title: string
  icon: string
  key: string
}

export const COMPOSITE_TABS: CompositeTab[] = [
  {
    title: '组件',
    icon: 'i-setting',
    key: 'component',
  },
  {
    title: '大纲树',
    icon: 'i-menu',
    key: 'menu',
  },
  {
    title: '历史记录',
    icon: 'i-clock',
    key: 'history',
  },
]
