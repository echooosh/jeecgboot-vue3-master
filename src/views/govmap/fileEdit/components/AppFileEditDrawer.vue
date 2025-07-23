<template>
  <BasicDrawer v-bind="$attrs" @register="registerDrawer" showFooter :width="adaptiveWidth" :title="'文件内容详情'" @ok="handleSubmit">
    <BasicForm @register="registerForm" class="menuForm" />
    <a-button :ghost="true" style="float: right" type="primary" preIcon="ant-design:download-outlined" size="small" @click="downloadFileContent">
      下载
    </a-button>
  </BasicDrawer>
</template>

<script lang="ts" setup>
  import { ref, useAttrs } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { saveDictApi, getTreeFileContentApi } from '../AppFileEdit.api';
  import { useDrawerAdaptiveWidth } from '/@/hooks/jeecg/useAdaptiveWidth';
  import { useMessage } from '/@/hooks/web/useMessage';
  import pako from 'pako';
  const { createMessage } = useMessage();

  const emit = defineEmits(['success', 'register']);
  const { adaptiveWidth } = useDrawerAdaptiveWidth();
  const attrs = useAttrs();
  const fileData = ref<any>(null);

  // 判断是否是文本类文件
  const isTextFile = (fileName: string) => {
    return /\.(txt|json|md|xml|csv|js|ts|html)$/i.test(fileName);
  };

  const [registerForm, { setProps, resetFields, setFieldsValue, updateSchema, validate }] = useForm({
    showActionButtonGroup: false,
    schemas: [
      {
        label: '文件内容',
        field: 'name',
        component: 'JUpload',
        componentProps: { multiple: false },
      },
    ],
  });
  function downloadFromByteString(content: string, filename: string) {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function downloadFileContent() {
    if (fileData.value?.record?.type !== 'file') return;
    const filePath = fileData.value?.record?.path;

    try {
      const res = await getTreeFileContentApi({ filePath });

      const blob = res.data as Blob;
      const contentType = res.headers['content-type'] || '';

      const filename = filePath.split('/').pop() || 'downloaded.file';

      if (contentType.includes('application/json') || contentType.includes('text/plain')) {
        const text = await blob.text();
        try {
          const json = JSON.parse(text);
          const byteStr = json.result || json.message || text;
          if (byteStr) {
            downloadFromByteString(byteStr, filename);
          } else {
            createMessage.warning('文件内容为空，无法下载');
          }
        } catch (err) {
          // 非 JSON 内容，如纯文本
          if (text) {
            downloadFromByteString(text, filename);
          } else {
            createMessage.warning('文件内容为空，无法下载');
          }
        }
      } else {
        // 非文本文件直接下载
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename;
        link.click();
        window.URL.revokeObjectURL(blobUrl);
      }
    } catch (e) {
      console.warn('文件下载失败：', e);
      createMessage.error('下载失败');
    }
  }

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    fileData.value = data;
    await resetFields();
    setDrawerProps({ confirmLoading: false });

    const fileName = data.record?.name || '';
    const filePath = data.record?.path || '';
    const isText = isTextFile(fileName);

    updateSchema([
      {
        label: '文件内容',
        field: 'name',
        component: isText ? 'InputTextArea' : 'JUpload',
        componentProps: isText ? { rows: 20, style: 'font-family: monospace' } : { multiple: false },
      },
    ]);

    const res = await getTreeFileContentApi({ filePath }); // 返回完整响应对象
    if (isText) {
      const blob = res.data;
      const contentType = res.headers['content-type'] || '';
      if (contentType.includes('application/json') || contentType.includes('text/plain')) {
        const text = await blob.text();
        setFieldsValue({ name: JSON.parse(text).result || JSON.parse(text).message });
      } else if (contentType.includes('application/gzip')) {
        const buffer = await blob.arrayBuffer();
        const text = pako.ungzip(new Uint8Array(buffer), { to: 'string' });
        setFieldsValue({ name: JSON.parse(text).result || JSON.parse(text).message });
      } else {
        // 非文本类，如 PNG/PDF
        setFieldsValue({ name: data.record?.name });
      }
    } else {
      setFieldsValue({ name: data?.record?.name || data?.record?.path || '' });
    }

    setProps({ disabled: !attrs.showFooter });
  });

  async function handleSubmit() {
    try {
      const values = await validate();
      // const fileName = fileData.value?.record?.name;
      const filePath = fileData.value?.record?.path;
      // const isText = isTextFile(fileName);
      setDrawerProps({ confirmLoading: true });
      const content = encodeURIComponent(values.name ?? '');

      await saveDictApi({ filePath, content });

      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
