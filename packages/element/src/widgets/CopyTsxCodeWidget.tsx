import { copy } from '@ideal-schema/shared'
import { ElMessage } from 'element-plus'
import beautify from 'js-beautify'
import { useTsxCode } from '../hooks'

export default defineComponent({
  name: 'CopyPageCodeWidget',
  setup() {
    const { getTsxCode } = useTsxCode()

    const handleCopyJSON = () => {
      copy(
        beautify.html_beautify(getTsxCode()!, {
          indent_size: 2,
        }),
      )
      ElMessage.success('TSX代码复制成功')
    }

    return () => {
      return (
        <el-tooltip effect="light" content="TSX代码复制" placement="top" showAfter={500}>
          <el-button onClick={handleCopyJSON}>
            <el-icon size="16"><i-copy-document /></el-icon>
          </el-button>
        </el-tooltip>
      )
    }
  },
})
