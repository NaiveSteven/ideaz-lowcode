import PolyInput from './poly-input';
import ValueInput from './value-input';
import PlaceholderBlock from './placeholder-block';
import ButtonsConfig from './buttons-config';
import type { App } from 'vue';

const components = [PolyInput, ValueInput, PlaceholderBlock, ButtonsConfig];

const componentNames = ['PolyInput', 'ValueInput', 'PlaceholderBlock', 'ButtonsConfig'];

const install = (app: App) => {
  components.forEach((component, index) => {
    app.component(componentNames[index], component);
  });
};

export default { install };
