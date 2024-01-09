import { vue2GlobalConfig } from './useGlobalConfig'

export function useGlobalSize() {
  return computed<any>(() => {
    return unref(vue2GlobalConfig).size
  })
}
