import { ElMessage } from 'element-plus';

export const copy = (text: string) => {
  const _input = document.createElement('textarea'); // 直接构建input
  _input.value = text; // 设置内容
  document.body.appendChild(_input); // 添加临时实例
  _input.select(); // 选择实例内容
  document.execCommand('Copy'); // 执行复制
  document.body.removeChild(_input); // 删除临时实例
  ElMessage.success('复制成功!');
};
