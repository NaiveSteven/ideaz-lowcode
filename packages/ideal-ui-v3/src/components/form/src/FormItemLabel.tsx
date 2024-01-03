import { defineComponent, h } from 'vue';
import { isFunction } from '@ideal-schema/shared';

export default defineComponent({
  name: 'FormItemLabel',
  props: {
    label: {
      type: String,
      default: '',
    },
    tooltip: {
      type: [String, Function],
      default: '',
    },
    colon: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    return () => {
      const { label, colon, tooltip } = props;
      return (
        <span>
          {label}
          <el-tooltip
            effect="dark"
            placement="top"
            v-slots={{
              content: () => <>{renderContent(props)}</>,
            }}
          >
            {tooltip && (
              <el-icon class="c-form-item-label__icon">
                <i-question-filled />
              </el-icon>
            )}
          </el-tooltip>
          {colon ? ':' : null}
        </span>
      );
    };
  },
});

const renderContent = (props: IndexType) => {
  const { tooltip } = props;
  if (isFunction(tooltip)) {
    return tooltip(h);
  }
  if (tooltip) {
    return tooltip;
  }
};
