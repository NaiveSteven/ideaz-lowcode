import { getSchemaData } from '@ideal-schema/playground-demi'
import { useGlobalSetting } from '@ideal-schema/playground-store'
import Codemirror from 'codemirror-editor-vue3'
import beautify from 'js-beautify'

export default defineComponent({
  name: 'JsonWidget',
  setup() {
    const { workspaceWidgetType } = useGlobalSetting()

    const editor = ref()

    const cmOptions = {
      mode: 'text/javascript', // Language mode
      theme: 'default', // Theme
      lineNumbers: true, // Show line number
      smartIndent: true, // Smart indent
      indentUnit: 2, // The smart indent unit is 2 spaces in length
      foldGutter: true, // Code folding
      styleActiveLine: true, // Display the style of the selected row
    }

    const ready = (val: any) => {
      editor.value = val
      // console.log(editor, 'editor');
    }

    return () => (
      <Codemirror
        value={beautify.js_beautify(
          JSON.stringify(
            workspaceWidgetType.value === 'crud'
              ? { ...getSchemaData('code', workspaceWidgetType.value).config, columns: getSchemaData('code', workspaceWidgetType.value).columns }
              : getSchemaData('code', workspaceWidgetType.value),
          ),
          {
            indent_size: 2,
          },
        )}
        class="h-full"
        language="json"
        options={cmOptions}
        onChange={(value: any) => console.log(value, 'value')}
        onReady={ready}
      />
    )
  },
})
