import { copy } from '@ideal-schema/shared'
import { ElMessage } from 'element-plus'
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
      ElMessage.success('页面代码复制成功')
    }

    return () => {
      return (
        <el-tooltip effect="light" content="页面代码复制" placement="top" showAfter={500}>
          <el-button onClick={handleCopyJSON}>
            <el-icon size="20"><i class={['icon-fuzhi', 'iconfont']}></i></el-icon>
          </el-button>
        </el-tooltip>
      )
    }
  },
})
