import Driver from 'driver.js';
import 'driver.js/dist/driver.min.css';

const steps = [
  {
    element: '.composite-panel-tabs',
    popover: {
      title: '最左侧菜单',
      description: '组件、目录结构、历史记录都在这',
      position: 'right',
    },
  },
  {
    element: '.drawer',
    popover: {
      title: '组件物料',
      description: '表单组件、布局组件物料都在这',
      position: 'right',
    },
  },
  {
    element: '.board',
    popover: {
      title: '画板',
      description: '我们可以在这边拼接组件',
      position: 'right',
    },
  },
  {
    element: '.design-tools',
    popover: {
      title: '工具栏',
      description: '切换屏幕大小、切换画板等操作都在这！',
      position: 'bottom-right',
    },
  },
  {
    element: '.settings-panel',
    popover: {
      title: '组件属性配置',
      description: '在这里配置表单和组件属性！',
      position: 'left',
    },
  },
];

export const useDriver = () => {
  let driver: Driver | null = null;

  driver = new Driver({
    allowClose: false,
    closeBtnText: '关闭',
    nextBtnText: '下一步',
    prevBtnText: '上一步',
  });

  const startDriver = () => {
    const isNew = getIsNew();
    if (isNew) {
      driver?.defineSteps(steps);
      driver?.start();
      setLocalStorage();
    }
  };

  const getIsNew = () => {
    try {
      const isNew = JSON.parse(localStorage.getItem('isNew') || '1');
      return Number(isNew);
    } catch (error) {
      console.log(error, 'getIsNew error');
    }
  };

  const setLocalStorage = () => {
    localStorage.setItem('isNew', '0');
  };

  return { startDriver, getIsNew };
};
