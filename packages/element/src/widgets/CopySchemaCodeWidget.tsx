import { parseElementSchema } from '@ideal-schema/playground-parser'
import { useGlobalSetting } from '@ideal-schema/playground-store'
import { copy } from '@ideal-schema/shared'
import { ElMessage } from 'element-plus'
import beautify from 'js-beautify'

export default defineComponent({
  name: 'CopySchemaCodeWidget',
  setup() {
    const { workspaceWidgetType } = useGlobalSetting()

    const handleCopyJSON = () => {
      const schema = parseElementSchema('code', workspaceWidgetType.value)
      copy(
        beautify.js_beautify(
          JSON.stringify(
            workspaceWidgetType.value === 'crud'
              ? { ...schema.config, columns: schema.columns }
              : schema,
          ),
          {
            indent_size: 2,
          },
        ),
      )
      ElMessage.success('JSON复制成功')
    }

    return () => (
      <el-tooltip effect="light" content="JSON复制" placement="top" showAfter={500}>
        <el-button onClick={handleCopyJSON}>
          <el-icon size="20"><i class={['icon-fuzhi1', 'iconfont']}></i></el-icon>
        </el-button>
      </el-tooltip>
    )
  },
})
