import Codemirror from 'codemirror-editor-vue3'
import beautify from 'js-beautify'
import { useTsxCode } from '../hooks'

export default defineComponent({
  name: 'TsxWidget',
  setup() {
    const editor = ref()
    const { getTsxCode } = useTsxCode()

    const cmOptions = {
      mode: 'text/javascript',
      theme: 'default',
      lineNumbers: true,
      smartIndent: true,
      indentUnit: 2,
      foldGutter: true,
      styleActiveLine: true,
    }

    const ready = (val: any) => {
      editor.value = val
    }

    return () => {
      return (
        <Codemirror
          value={beautify.js_beautify(getTsxCode(), {
            e4x: true,
            indent_size: 2,
          })}
          class="h-full"
          options={cmOptions}
          onChange={(value: any) => console.log(value, 'value')}
          onReady={ready}
        />
      )
    }
  },
})
