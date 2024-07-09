import * as el from '@ideal-schema/element'

// const arr: (keyof typeof customs)[] = []
// const obj: IndexType = {}

// Object.keys(customs).forEach((key: any) => {
//   arr.push(key)
// })
// arr.forEach((key: keyof typeof customs) => {
//   obj[key] = customs[key]
// })

const ComponentWidget = el.ComponentWidget
const WorkspaceComponentList = el.WorkspaceComponent
const SettingForm = el.SettingForm
const PlayWidget = el.PlayWidget
const PageWidget = el.PageWidget
const CopySchemaCodeWidget = el.CopySchemaCodeWidget
const CopyPageCodeWidget = el.CopyPageCodeWidget
const ViewPort = el.ViewPort
const TsxWidget = el.TsxWidget
const JSONWidget = el.JSONWidget

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
