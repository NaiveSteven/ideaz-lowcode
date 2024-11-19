import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'

const steps = [
  {
    element: '.composite-panel-tabs',
    popover: {
      title: '最左侧菜单',
      description: '组件、目录结构、操作记录',
      position: 'right',
    },
  },
  {
    element: '.drawer',
    popover: {
      title: '组件物料',
      description: '基础组件、高阶组件物料，拖拽配置表单和表格',
      position: 'right',
    },
  },
  {
    element: '.board',
    popover: {
      title: '画板',
      description: '通过拖拽、选中、新增、复制、删除等操作组件',
      position: 'right',
    },
  },
  {
    element: '.design-tools',
    popover: {
      title: '工具栏',
      description: '切换画板大小、切换画板代码预览、复制产出代码、清空画板',
      position: 'bottom-right',
    },
  },
  {
    element: '.settings-panel',
    popover: {
      title: '组件属性配置',
      description: '配置表单和组件属性',
      position: 'left',
    },
  },
]

export function useDriver() {
  let driver: Driver | null = null

  driver = new Driver({
    allowClose: false,
    closeBtnText: '关闭',
    nextBtnText: '下一步',
    prevBtnText: '上一步',
  })

  const getIsNew = () => {
    try {
      const isNew = JSON.parse(localStorage.getItem('isNew') || '1')
      return Number(isNew)
    }
    catch (error) {
    }
  }

  const setLocalStorage = () => {
    localStorage.setItem('isNew', '0')
  }

  const startDriver = () => {
    const isNew = getIsNew()
    if (isNew) {
      driver?.defineSteps(steps)
      driver?.start()
      setLocalStorage()
    }
  }

  return { startDriver, getIsNew }
}
