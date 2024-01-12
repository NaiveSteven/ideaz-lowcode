import ZCheckbox from './checkbox'
import ZRadio from './radio'
import ZSelect from './select'
import Form from './form'
import ZInput from './input'
import Table from './table'
import TagSelect from './tag-select'
import ZText from './text'
import ZWatermark from './watermark'
import CheckCard from './check-card'
import ZDescription from './descriptions'
import ZFullScreen from './full-screen'
import ZCrud from './crud'
import Dialog from './dialog'
import { makeInstaller } from './makeInstaller'

const { ZForm, ZFilterForm, ZFormItem } = Form
const { ZTable, ZTableCustomColumnContainer } = Table
const { ZCheckCard, ZCheckCardItem } = CheckCard
const { ZTagSelect, ZTagSelectItem } = TagSelect
const { ZDialog, ZDialogTip } = Dialog

const components = [ZCheckbox, ZRadio, ZSelect, ZForm, ZInput, ZTable, ZFilterForm, ZTagSelect, ZText, ZWatermark, ZCheckCard, ZCheckCardItem, ZDescription, ZTagSelectItem, ZTableCustomColumnContainer, ZFullScreen, ZCrud, ZDialog, ZDialogTip, ZFormItem]

const installer = makeInstaller([...components])

export default installer
export * from './types'

export {
  ZRadio,
  ZSelect,
  ZCheckbox,
  ZForm,
  ZInput,
  ZTable,
  ZFilterForm,
  ZTagSelect,
  ZText,
  ZWatermark,
  ZCheckCard,
  ZCheckCardItem,
  ZDescription,
  ZTagSelectItem,
  ZTableCustomColumnContainer,
  ZFullScreen,
  ZCrud,
  ZDialog,
  ZDialogTip,
  ZFormItem,
}
