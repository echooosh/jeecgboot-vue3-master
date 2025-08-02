<template>
  <BasicModal v-bind="$attrs" @register="registerModal" destroyOnClose :width="800" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" name="AppFileEditForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { useMessage } from '/@/hooks/web/useMessage';
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { formSchema } from '../AppFileEdit.data';
  import { createNewFileApi } from '../AppFileEdit.api';
  const { createMessage, createConfirm } = useMessage();
  // 获取emit
  const emit = defineEmits(['register', 'success']);
  const isUpdate = ref(true);
  const isDetail = ref(false);

  // 当前编辑的数据
  let model: Nullable<Recordable> = null;
  //表单配置
  const [registerForm, { setProps, resetFields, setFieldsValue, validate, updateSchema, scrollToField }] = useForm({
    schemas: formSchema,
    showActionButtonGroup: false,
    baseColProps: { span: 24 },
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
  });

  //表单赋值
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    //重置表单
    await resetFields();
    setModalProps({ confirmLoading: false, minHeight: 80, showCancelBtn: !!data?.showFooter, showOkBtn: !!data?.showFooter });
    isUpdate.value = !!data?.isUpdate;
    isDetail.value = !!data?.showFooter;
    if (data?.record) {
      model = data.record;
      //表单赋值
      await setFieldsValue({
        ...data.record,
      });
    } else {
      model = null;
    }
    // 隐藏底部时禁用整个表单
    setProps({ disabled: !!data?.hideFooter });
  });
  //设置标题
  const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));

  //表单提交事件

  async function handleSubmit() {
    const values = await validate();
    try {
      if (values.type === 'directory') return createMessage.warning('当前文件类型不支持修改');
      setModalProps({ confirmLoading: true });
      // 新建模式
      if (!unref(isUpdate)) {
        await createNewFileApi({ filePath: values.path, overwrite: false });
      } else {
        // 编辑模式直接走覆盖
        await createNewFileApi({ filePath: values.path, overwrite: true });
      }

      // 提交成功
      closeModal();
      emit('success', {
        isUpdate: unref(isUpdate),
        values: { ...values },
      });
    } catch (e) {
      if (e?.message?.includes('文件已存在')) {
        createConfirm({
          title: '提示',
          content: '文件已存在，是否覆盖？',
          iconType: 'warning',
          onOk: async () => {
            await createNewFileApi({ filePath: values.path, overwrite: true });
            closeModal();
            emit('success', { isUpdate: unref(isUpdate), values: { ...values } });
          },
        });
      } else {
        createMessage.error(e.message || '操作失败');
      }
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
<style lang="less" scoped>
  /** 时间和数字输入框样式 */
  :deep(.ant-input-number) {
    width: 100%;
  }

  :deep(.ant-calendar-picker) {
    width: 100%;
  }
</style>
