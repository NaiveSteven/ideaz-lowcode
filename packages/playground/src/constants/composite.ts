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
    title: '目录',
    icon: 'i-menu',
    key: 'menu',
  },
]
