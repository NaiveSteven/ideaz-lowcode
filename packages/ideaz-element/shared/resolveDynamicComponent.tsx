import { getCurrentInstance } from 'vue'
import { toCamelCase } from '../utils'

interface IndexType {
  [propName: string]: any
}

interface ResolveOptions {
  name: string
  attrs: IndexType
  content?: any
}

export function resolveDynamicComponent(options: ResolveOptions) {
  const nativeTags = ['div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']
  const cop = nativeTags.includes(options.name)
    ? options.name
    : getCurrentInstance()!.appContext!.components[toCamelCase(options.name)]
  return h(
    // resolveComponent(options.name),
    cop,
    {
      ...(options.attrs || {}),
    },
    options.content || {},
  )
}
