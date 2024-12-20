import { cloneDeep } from 'lodash-es'
import { isFunction, isString, uid } from '../../../utils'
import { useLocale } from '../../../hooks'
import type { FormProps } from '../src/props'
import type { FormColumn } from '../../types'

export const SELECT_TYPES = ['cascader', 'select', 'datepicker', 'picker', 'checkbox', 'radio']

export function useFormItems(props: FormProps) {
  const { t } = useLocale()
  const formatFormItems = ref<FormColumn[]>([])

  const setDefaultPlaceholder = (formItem: FormColumn) => {
    const label = formItem.label || formItem.formItemProps?.label || ''
    const type = isFunction(formItem.component) ? formItem.component() : formItem.component

    if (SELECT_TYPES.includes((type || '').toLowerCase()))
      return (isString(label) && !label.includes('Slot')) ? `${t('form.selectPlaceholder')}${label}` : `${t('form.selectPlaceholder')}`

    else
      return (isString(label) && !label.includes('Slot')) ? `${t('form.inputPlaceholder')}${label}` : `${t('form.inputPlaceholder')}`
  }

  const isHide = (item: FormColumn) => {
    return isFunction(item.hide) ? item.hide(props.modelValue) : item.hide
  }

  watch(() => props.columns, () => {
    const _schema = cloneDeep(props.columns).map((cur: any) => {
      const item = cur.schema ? { ...cur, ...cur.schema } : cur
      return {
        ...item,
        __key: item.key || item.field || item.slot || uid(),
        children: item.children
          ? item.children.map((child) => {
            const isPlaceholder = Object.keys(child.fieldProps || {}).some(key => key.includes('placeholder') || key.includes('Placeholder'))
            const fieldProps = !isPlaceholder
              ? {
                  placeholder: setDefaultPlaceholder(child),
                  clearable: true,
                  filterable: true,
                  ...child?.fieldProps,
                }
              : {
                  clearable: true,
                  filterable: true,
                  ...child?.fieldProps,
                }
            return {
              ...child,
              fieldProps,
            }
          })
          : undefined,
      }
    })
    formatFormItems.value = _schema
      .filter((item: any) => !isHide(item.schema ? { ...item, ...item.schema } : item))
      .map((cur: any) => {
        const item = cur.schema ? { ...cur, ...cur.schema } : cur
        return {
          ...item,
          fieldProps: {
            placeholder: setDefaultPlaceholder(item),
            clearable: true,
            filterable: true,
            ...item?.fieldProps,
          },
        }
      })
  }, { deep: true, immediate: true })

  return { formatFormItems }
}
