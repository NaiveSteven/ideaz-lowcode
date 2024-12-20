import type { App } from 'vue'
import ButtonsConfig from './buttons-config'
import Notify from './notify'
import OptionItemWidget from './option-item-widget'
import PlaceholderBlock from './placeholder-block'
import PolyInput from './poly-input'
import ValueInput from './value-input'

const components = [PolyInput, ValueInput, PlaceholderBlock, ButtonsConfig, OptionItemWidget, Notify]

const componentNames = ['PolyInput', 'ValueInput', 'PlaceholderBlock', 'ButtonsConfig', 'OptionItemWidget', 'Notify']

function install(app: App) {
  components.forEach((component, index) => {
    app.component(componentNames[index], component)
  })
}

export default { install }
