<template>
  <BasicModal v-bind="$attrs" @register="registerModal" destroyOnClose :title="title" :width="800" @ok="handleSubmit">
    <BasicForm @register="registerForm" name="AppRelatedNoticeForm" />
  </BasicModal>
</template>

<script lang="ts" setup>
  import { ref, computed, unref, onMounted } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from '../AppRelatedNotice.data';
  import { saveOrUpdate } from '../AppRelatedNotice.api';
  import { queryOrgTreeList, list as getHallList } from '/@/views/govmap/hall/AppHall.api';

  onMounted(async () => {
    const cascaderOptions = ref<any[]>([]);
    queryOrgTreeList().then(async (res) => {
      if (res.success) {
        if (Array.isArray(res.result)) {
          const orgTree = res.result;
          const result = await Promise.all(
            orgTree.map(async (org: any) => {
              const halls = await getHallList({ orgId: org.key });
              return {
                label: org.title,
                value: org.key,
                children: halls.records?.map((hall: any) => ({
                  label: hall.hallName,
                  value: hall.id,
                })),
              };
            })
          );
          cascaderOptions.value = result;
          const hallField = formSchema.find((f) => f.field === 'hallId');
          if (hallField) {
            hallField.component = 'Cascader';
            hallField.componentProps = {
              options: cascaderOptions.value,
              placeholder: '请选择机构及大厅',
              showSearch: true,
              onChange: (value, selectedOptions) => {
                // value 是 [orgId, hallId]
                // selectedOptions 是 [{ label: orgName, value: orgId }, { label: hallName, value: hallId }]
                const hallId = value?.[1] || null;
                const hall_name = selectedOptions?.[1]?.label || '';
                setFieldsValue({
                  hallId,
                  hall_name,
                });
              },
            };
          }
        }
      }
    });
  });
  // Emits声明
  const emit = defineEmits(['register', 'success']);
  const isUpdate = ref(true);
  const isDetail = ref(false);
  //表单配置
  const [registerForm, { setProps, resetFields, setFieldsValue, validate, scrollToField }] = useForm({
    labelWidth: 150,
    schemas: formSchema,
    showActionButtonGroup: false,
    baseColProps: { span: 24 },
  });
  //表单赋值
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    //重置表单
    await resetFields();
    setModalProps({ confirmLoading: false, showCancelBtn: !!data?.showFooter, showOkBtn: !!data?.showFooter });
    isUpdate.value = !!data?.isUpdate;
    isDetail.value = !!data?.showFooter;
    if (unref(isUpdate)) {
      //表单赋值
      await setFieldsValue({
        ...data.record,
      });
    }
    // 隐藏底部时禁用整个表单
    setProps({ disabled: !data?.showFooter });
  });
  //设置标题
  const title = computed(() => (!unref(isUpdate) ? '新增' : !unref(isDetail) ? '详情' : '编辑'));
  //表单提交事件
  async function handleSubmit(v) {
    try {
      let values = await validate();
      setModalProps({ confirmLoading: true });
      //提交表单
      await saveOrUpdate(values, isUpdate.value);
      //关闭弹窗
      closeModal();
      //刷新列表
      emit('success');
    } catch ({ errorFields }) {
      if (errorFields) {
        const firstField = errorFields[0];
        if (firstField) {
          scrollToField(firstField.name, { behavior: 'smooth', block: 'center' });
        }
      }
      return Promise.reject(errorFields);
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
