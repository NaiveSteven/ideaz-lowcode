import { copy } from '@ideal-schema/shared'
import beautify from 'js-beautify'
import { usePageCode } from '../hooks'

export default defineComponent({
  name: 'CopyPageCodeWidget',
  setup() {
    const { getPageCode } = usePageCode()

    const handleCopyJSON = () => {
      copy(
        beautify.html_beautify(getPageCode(), {
          indent_size: 2,
        }),
      )
    }

    return () => {
      return (
        <el-tooltip effect="light" content="页面代码复制" placement="top" showAfter={500}>
          <el-button onClick={handleCopyJSON}>
            <el-icon>
              <i-document-copy />
            </el-icon>
          </el-button>
        </el-tooltip>
      )
    }
  },
})
