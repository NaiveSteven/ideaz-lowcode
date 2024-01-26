import type { App } from 'vue'
import ButtonsConfig from './buttons-config'
import OptionItemWidget from './option-item-widget'
import PlaceholderBlock from './placeholder-block'
import PolyInput from './poly-input'
import ValueInput from './value-input'

const components = [PolyInput, ValueInput, PlaceholderBlock, ButtonsConfig, OptionItemWidget]

const componentNames = ['PolyInput', 'ValueInput', 'PlaceholderBlock', 'ButtonsConfig', 'OptionItemWidget']

function install(app: App) {
  components.forEach((component, index) => {
    app.component(componentNames[index], component)
  })
}

export default { install }
