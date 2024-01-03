<template>
  <div class="demo-block">
    <div class="demo-wrap" :class="{ show: isShow }">
      <div class="demo-source">
        <slot name="source"></slot>
      </div>
      <div class="demo-highlight">
        <div class="demo-icon">
          <el-tooltip content="拷贝代码">
            <div class="demo-icon__item" @click="handleCopy">
              <el-icon><i-document-copy /></el-icon>
            </div>
          </el-tooltip>
          <el-tooltip content="秀代码">
            <div class="demo-icon__item" @click="handleCode">
              <el-icon><i-help-filled /></el-icon>
            </div>
          </el-tooltip>
        </div>

        <el-collapse-transition>
          <div v-show="isShow">
            <slot name="highlight"></slot>
          </div>
        </el-collapse-transition>
      </div>
      <div class="tag-detail">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  import { ref, getCurrentInstance } from 'vue';

  export default {
    setup(props, { slots }) {
      const instance = getCurrentInstance();
      const globalProperties = instance.appContext.config.globalProperties;

      const handleCopy = useCopy.bind(this, {
        slots,
        globalProperties,
      });

      const isShow = ref(false);
      const handleCode = () => {
        isShow.value = !isShow.value;
      };

      return {
        isShow,
        handleCode,
        handleCopy,
      };
    },
  };

  const useCopy = ({ slots, globalProperties }) => {
    const html = slots.highlight()[0]['children'][0]['children'];
    globalProperties.$message.success('拷贝成功');
    copy(html);
  };

  function copy(value) {
    const oInput = document.createElement('textarea');
    document.body.appendChild(oInput);
    oInput.style.width = '0';
    oInput.style.height = '0';
    oInput.style.position = 'fixed';
    oInput.style.opacity = '0';
    oInput.value = value;

    const ua = window.navigator.userAgent;

    if (!!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
      oInput.focus();
      oInput.setSelectionRange(0, 9999);
      document.execCommand('copy');
    } else if (ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1) {
      oInput.select();
      document.execCommand('copy');
    } else {
      oInput.focus();
      oInput.setSelectionRange(0, 9999);
      document.execCommand('copy');
    }
    document.body.removeChild(oInput);
  }
</script>
