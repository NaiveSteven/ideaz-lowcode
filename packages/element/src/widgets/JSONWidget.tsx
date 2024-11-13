import { parseElementSchema } from '@ideal-schema/playground-parser'
import { useGlobalSetting } from '@ideal-schema/playground-store'
import Codemirror from 'codemirror-editor-vue3'
import beautify from 'js-beautify'

export default defineComponent({
  name: 'JSONWidget',
  setup() {
    const { workspaceComponentType } = useGlobalSetting()
    const editor = ref()
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

    return () => (
      <Codemirror
        value={beautify.js_beautify(
          JSON.stringify(
            workspaceComponentType.value === 'crud'
              ? { ...parseElementSchema('code', workspaceComponentType.value).config, columns: parseElementSchema('code', workspaceComponentType.value).columns }
              : parseElementSchema('code', workspaceComponentType.value),
          ),
          {
            indent_size: 2,
          },
        )}
        class="h-full"
        language="json"
        options={cmOptions}
        // onChange={(value: any) => console.log(value, 'value')}
        onReady={ready}
      />
    )
  },
})
