<template>
  <div class="dialog-container">
    <el-dialog v-model="visible" title="更新内容(2022-12-20 23:17:00)" width="460px">
      <div :style="{ lineHeight: 1.75, fontSize: '15px' }">
        <div>1. 数据源、按钮配置等组件支持拖拽</div>
        <div>2. 支持弹窗和页面背景预览代码切换</div>
        <div>3. 补充优化页面预览的代码</div>
        <div>4. 表单项支持extra字段</div>
        <div>5. 修复表格type切换为按钮无效问题</div>
        <div>6. 修复清空代码报错问题</div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button :type="type" size="default" @click="handleConfirm">知道了</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'TipConfirmDialog',
  });
</script>
<script lang="ts" setup>
  import { useShowDialog } from '@/hooks';

  const props = withDefaults(
    defineProps<{
      modelValue: boolean;
      type?: 'danger' | 'primary';
    }>(),
    {
      modelValue: false,
      type: 'primary',
    }
  );
  const emit = defineEmits(['update:modelValue', 'confirm', 'cancel']);
  const { visible } = useShowDialog(props, emit);

  const handleConfirm = () => {
    sessionStorage.setItem('isUpdate', '1');
    visible.value = false;
  };
</script>

<style lang="scss" scoped>
  .dialog-container {
    ::v-deep(.el-dialog__body) {
      padding: 10px 20px;
      padding-top: 5px;
      padding-bottom: 0;
    }

    ::v-deep(.el-dialog__footer) {
      padding-bottom: 20px;
    }
  }
</style>
