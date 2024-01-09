import { isUnDef } from '../utils'

interface Props {
  alias?: {
    label?: string
    value?: string
    disabled?: string
  }
  [key: string]: any
}

export function setFormAlias(props: Props) {
  return {
    keys: {
      label: isUnDef(props.alias) ? 'label' : props.alias?.label || 'label',
      value: isUnDef(props.alias) ? 'value' : props.alias?.value || 'value',
      disabled: isUnDef(props.alias)
        ? 'disabled'
        : props.alias?.disabled || 'disabled',
    },
  }
}
