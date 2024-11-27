import { useWorkspaceComponent, useWorkspaceForm } from '@ideal-schema/playground-store'
import type { CSSProperties } from 'vue'
import mitt from '../../event'
import Helpers from './Helpers'
import './style.scss'

export default defineComponent({
  name: 'Selection',
  setup() {
    const { activeWidget, widgets } = useWorkspaceComponent()
    const { formConfig } = useWorkspaceForm()

    const position = ref<DOMRect>({} as DOMRect)

    const interval = setInterval(() => {
      setPosition()
    }, 50)

    // watch(
    //   () => workspaceStore.getCurOperateComponent,
    //   async () => {
    //     setPosition();
    //   },
    //   { immediate: true, deep: true }
    // );

    // watch(
    //   () => workspaceStore.getWorkspaceComponentList,
    //   async () => {
    //     setPosition();
    //   },
    //   { immediate: true, deep: true }
    // );

    const style = computed<CSSProperties>(() => {
      // const compositePanelContentWidth: string = document.getElementById(
      //   'composite-panel-tabs-content'
      // )?.style.width as string;
      // const width = compositePanelContentWidth
      //   ? compositePanelContentWidth.slice(0, compositePanelContentWidth.length - 2)
      //   : 300;
      // const designToolsHeight = 28;
      const viewPort = document.getElementById('view-port')
      const viewPortRect = viewPort?.getBoundingClientRect() as DOMRect
      return {
        position: 'absolute',
        top: 0,
        left: 0,
        transform: `perspective(1px) translate3d(
          ${position.value.left - (viewPortRect ? viewPortRect.left : 0)}px,
          ${position.value.top - (viewPortRect ? viewPortRect.top : 0)}px,
          0)`,
        width: `${position.value?.width}px`,
        height: `${position.value?.height}px`,
        border: '2px solid #409eff',
        pointerEvents: 'none',
        boxSizing: 'border-box',
        visibility: 'visible',
        transition: 'all 0.2s',
        zIndex: 2,
      }
    })

    const selectorPosition = computed(() => {
      let index = -1
      widgets.value.forEach((item, i) => {
        if (activeWidget.value.id === item.id) {
          index = i
        }
        else {
          const columns = item.schema?.fieldProps?.columns
          if (columns?.length) {
            columns.forEach((column: Widget, j) => {
              if (activeWidget.value.id === column.id)
                index = j
            })
          }
        }
      })

      // multiple column layout
      if (formConfig.value.column > 1 && activeWidget.value.id)
        return 'bottom'

      if (index === 0 || activeWidget.value.pid || activeWidget.value.name === 'tableForm')
        return 'bottom'

      if (index === -1)
        return 'inner-top'

      return 'top'
    })

    onMounted(() => {
      mitt.on('selection-change', setPosition)
      let ele = document.getElementById(activeWidget.value?.id || '')
      if (!activeWidget.value.id)
        ele = document.getElementById('view-port')

      if (!ele)
        return
      position.value = ele?.getBoundingClientRect() as DOMRect

      document.getElementById('view-port')?.addEventListener('scroll', setPosition)
      window.addEventListener('resize', setPosition)
    })

    async function setPosition() {
      await nextTick()
      await nextTick()
      await delay(50)
      let ele = document.getElementById(`schema-field${activeWidget.value?.id}`)
      if (!activeWidget.value.id)
        ele = document.getElementById('view-port')
      if (activeWidget.value.name === 'tableCol') {
        const schema = widgets.value[0].schema
        const len = schema.data.length
        const bottomDom = document.getElementsByClassName(
          `schema-field${activeWidget.value?.id}`,
        )[len - 1]
        const topDom = document.getElementsByClassName('crudHeader')[0]
        if (bottomDom && topDom) {
          const bottomDomRect = bottomDom.getBoundingClientRect()
          const topDomRect = topDom.getBoundingClientRect()
          position.value = {
            width: bottomDomRect.width,
            height: bottomDomRect.height * len + topDomRect.height,
            x: bottomDomRect.x,
            y: bottomDomRect.y,
            left: bottomDomRect.left,
            top: topDomRect.top,
            right: bottomDomRect.right,
            bottom: bottomDomRect.bottom,
            toJSON: () => { },
          }
        }
      }
      if (ele)
        position.value = ele?.getBoundingClientRect() as DOMRect
    }

    function delay(time: number) {
      return new Promise((resolve) => {
        setTimeout(resolve, time)
      })
    }

    onBeforeUnmount(() => {
      document.getElementById('view-port')?.removeEventListener('scroll', setPosition)
      window.removeEventListener('resize', setPosition)
      mitt.off('selection-change')
      clearInterval(interval)
    })

    return () => {
      return (
        <div style={unref(style)}>
          <Helpers position={selectorPosition.value} />
        </div>
      )
    }
  },
})
