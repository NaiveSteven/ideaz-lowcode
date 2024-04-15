import * as iview from '@ideaz/iview'

// const arr: (keyof typeof customs)[] = []
// const obj: IndexType = {}

// Object.keys(customs).forEach((key: any) => {
//   arr.push(key)
// })
// arr.forEach((key: keyof typeof customs) => {
//   obj[key] = customs[key]
// })

const ComponentWidget = iview.ComponentWidget
const WorkspaceComponentList = iview.WorkspaceComponent
const SettingForm = iview.SettingForm
const PlayWidget = iview.PlayWidget
const PageWidget = iview.PageWidget
const CopySchemaCodeWidget = iview.CopySchemaCodeWidget
const CopyPageCodeWidget = iview.CopyPageCodeWidget
const ViewPort = iview.ViewPort
const TsxWidget = iview.TsxWidget
const JSONWidget = iview.JSONWidget

export {
  ComponentWidget,
  CopyPageCodeWidget,
  CopySchemaCodeWidget,
  JSONWidget,
  PageWidget,
  PlayWidget,
  SettingForm,
  TsxWidget,
  ViewPort,
  WorkspaceComponentList,
}
