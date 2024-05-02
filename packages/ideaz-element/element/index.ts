import CheckCard from './check-card'
import ZCheckbox from './checkbox'
import ZCrud from './crud'
import ZDescription from './descriptions'
import Dialog from './dialog'
import Form from './form'
import ZFullScreen from './full-screen'
import ZInput from './input'
import { makeInstaller } from './makeInstaller'
import ZRadio from './radio'
import ZSelect from './select'
import Table from './table'
import TagSelect from './tag-select'
import ZText from './text'
import ZWatermark from './watermark'

const { ZForm, ZFilterForm, ZFormItem } = Form
const { ZTable, ZTableCustomColumnContainer } = Table
const { ZCheckCard, ZCheckCardItem } = CheckCard
const { ZTagSelect, ZTagSelectItem } = TagSelect
const { ZDialog, ZDialogTip } = Dialog

const components = [ZCheckbox, ZRadio, ZSelect, ZForm, ZInput, ZTable, ZFilterForm, ZTagSelect, ZText, ZWatermark, ZCheckCard, ZCheckCardItem, ZDescription, ZTagSelectItem, ZTableCustomColumnContainer, ZFullScreen, ZCrud, ZDialog, ZDialogTip, ZFormItem]

const installer = makeInstaller([...components])

export default installer
export * from './form/hooks'
export * from './types'
export {
  ZCheckCard,
  ZCheckCardItem,
  ZCheckbox,
  ZCrud,
  ZDescription,
  ZDialog,
  ZDialogTip,
  ZFilterForm,
  ZForm,
  ZFormItem,
  ZFullScreen,
  ZInput,
  ZRadio,
  ZSelect,
  ZTable,
  ZTableCustomColumnContainer,
  ZTagSelect,
  ZTagSelectItem,
  ZText,
  ZWatermark,
}
