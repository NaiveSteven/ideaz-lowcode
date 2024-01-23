import JsonWidget from './JsonWidget';
import { PlayWidget, PageWidget } from '@ideal-schema/playground-demi';
import './style.scss';

export default defineComponent({
  name: 'ViewWidget',
  components: {
    JsonWidget,
    PlayWidget,
    PageWidget,
  },
  props: {
    viewType: {
      type: String as PropType<'json' | 'design' | 'play' | 'page'>,
      default: 'design',
    },
  },
  setup(props) {
    const getComponent = (viewType: string) => {
      if (viewType === 'json') return 'JsonWidget';
      if (viewType === 'play') return 'PlayWidget';
      return 'PageWidget';
    };

    return () => <div class="view-widget">{h(resolveComponent(getComponent(props.viewType)))}</div>;
  },
});
