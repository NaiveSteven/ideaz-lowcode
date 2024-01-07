import * as customs from '@ideal-schema/element'

const arr: (keyof typeof customs)[] = []
const obj: IndexType = {}

Object.keys(customs).forEach((key: any) => {
  arr.push(key)
})
arr.forEach((key: keyof typeof customs) => {
  obj[key] = customs[key]
})

const ComponentWidget = obj.ComponentWidget
const WorkspaceComponentList = obj.WorkspaceComponentList
const SettingForm = obj.SettingForm
const PlayWidget = obj.PlayWidget
const PageWidget = obj.PageWidget
const CopySchemaCodeWidget = obj.CopySchemaCodeWidget
const CopyPageCodeWidget = obj.CopyPageCodeWidget
const getSchemaData = obj.getSchemaData

export {
  getSchemaData,
  ComponentWidget,
  WorkspaceComponentList,
  SettingForm,
  PlayWidget,
  PageWidget,
  CopySchemaCodeWidget,
  CopyPageCodeWidget,
}
