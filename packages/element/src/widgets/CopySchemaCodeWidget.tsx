import { computed, defineComponent } from 'vue'
import { getSchemaData } from '@ideal-schema/playground-demi'
import { useGlobalSettingStore } from '@ideal-schema/playground-store'
import { copy } from '@ideal-schema/shared'
import beautify from 'js-beautify'

export default defineComponent({
  name: 'CopySchemaCodeWidget',
  setup() {
    const globalSettingStore = useGlobalSettingStore()

    const workspaceComponentType = computed(() => globalSettingStore.getWorkspaceComponentType)

    const handleCopyJSON = () => {
      console.log(workspaceComponentType.value, 'workspaceComponentType.value')

      const schema = getSchemaData('code', workspaceComponentType.value)
      copy(
        beautify.js_beautify(
          JSON.stringify(
            workspaceComponentType.value === 'tablePro'
              ? getSchemaData(schema, workspaceComponentType.value).config
              : getSchemaData(schema, workspaceComponentType.value),
          ),
          {
            indent_size: 2,
          },
        ),
      )
    }

    return () => (
      <el-tooltip effect="light" content="JSON复制" placement="top" showAfter={500}>
        <el-button onClick={handleCopyJSON} style={{ borderRight: 'none' }}>
          <el-icon>
            <i-document-remove />
          </el-icon>
        </el-button>
      </el-tooltip>
    )
  },
})
