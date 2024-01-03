import { defineComponent, ref } from 'vue';
import beautify from 'js-beautify';
import Codemirror from 'codemirror-editor-vue3';
import { usePageCode } from '../hooks';

export default defineComponent({
  name: 'PageWidget',
  setup() {
    const editor = ref();
    const { getPageCode } = usePageCode();

    const cmOptions = {
      mode: 'text/javascript', // Language mode
      theme: 'default', // Theme
      lineNumbers: true, // Show line number
      smartIndent: true, // Smart indent
      indentUnit: 2, // The smart indent unit is 2 spaces in length
      foldGutter: true, // Code folding
      styleActiveLine: true, // Display the style of the selected row
    };

    const ready = (val: any) => {
      editor.value = val;
    };

    return () => {
      return (
        <Codemirror
          value={beautify.html_beautify(getPageCode(), {
            indent_size: 2,
          })}
          class="h-full"
          language="html"
          options={cmOptions}
          onChange={(value: any) => console.log(value, 'value')}
          onReady={ready}
        />
      );
    };
  },
});
