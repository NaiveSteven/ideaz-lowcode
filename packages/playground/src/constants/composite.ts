export interface CompositeTab {
  title: string
  icon: string
  key: string
}

export const COMPOSITE_TABS: CompositeTab[] = [
  {
    title: '组件',
    icon: 'icon-shezhi',
    key: 'component',
  },
  {
    title: '目录',
    icon: 'icon-fuhao-tuceng',
    key: 'menu',
  },
  {
    title: '操作记录',
    icon: 'icon-shijianzhou',
    key: 'history',
  },
]
