import { getSchemaData } from '@ideal-schema/playground-demi'
import { useGlobalSetting } from '@ideal-schema/playground-store'
import { copy } from '@ideal-schema/shared'
import beautify from 'js-beautify'

export default defineComponent({
  name: 'CopySchemaCodeWidget',
  setup() {
    const { workspaceComponentType } = useGlobalSetting()

    const handleCopyJSON = () => {
      const schema = getSchemaData('code', workspaceComponentType.value)
      copy(
        beautify.js_beautify(
          JSON.stringify(
            workspaceComponentType.value === 'crud'
              ? { ...schema.config, columns: schema.columns }
              : schema,
          ),
          {
            indent_size: 2,
          },
        ),
      )
    }

    return () => (
      <el-tooltip effect="light" content="JSON复制" placement="top" showAfter={500}>
        <el-button onClick={handleCopyJSON}>
          <el-icon>
            <i-document-remove />
          </el-icon>
        </el-button>
      </el-tooltip>
    )
  },
})
