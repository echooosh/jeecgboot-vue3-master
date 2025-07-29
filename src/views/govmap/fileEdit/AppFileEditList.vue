<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <!--插槽:table标题-->
      <template #tableTitle>
        <a-button type="primary" @click="handleCreate" preIcon="ant-design:plus-outlined"> 新增</a-button>
        <a-button type="primary" preIcon="ic:round-expand" @click="expandAll">展开全部</a-button>
        <a-button type="primary" preIcon="ic:round-compress" @click="collapseAll">折叠全部</a-button>
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>
    <!--字典弹窗-->
    <AppFileEditModal @register="registerModal" @success="handleSuccess" />
    <AppFileEditDrawer @register="registerDrawer" @success="handleSuccess" :showFooter="showFooter" />
  </div>
</template>

<script lang="ts" name="123-appFileEdit" setup>
  //ts语法
  import { ref, reactive } from 'vue';
  import { BasicTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { useDrawer } from '/@/components/Drawer';
  import { useListPage } from '/@/hooks/system/useListPage';
  import AppFileEditModal from './components/AppFileEditModal.vue';
  import AppFileEditDrawer from './components/AppFileEditDrawer.vue';
  import { columns, searchFormSchema } from './AppFileEdit.data';
  import { getTreeFileListApi, deleteAppFileEditApi } from './AppFileEdit.api';
  const queryParam = reactive<any>({
    fileName: '',
    exactMatch: false,
  });
  const [registerDrawer, { openDrawer }] = useDrawer();
  const showFooter = ref(true);
  //字典model
  const [registerModal, { openModal }] = useModal();
  //注册table数据
  const { prefixCls, tableContext } = useListPage({
    tableProps: {
      api: getTreeFileListApi,
      title: '在线编辑',
      columns,
      canResize: false,
      pagination: false,
      isTreeTable: true,
      striped: true,
      formConfig: {
        labelWidth: 120,
        schemas: searchFormSchema,
        autoSubmitOnEnter: true,
        showAdvancedButton: true,
        fieldMapToNumber: [],
        fieldMapToTime: [],
      },
      actionColumn: {
        width: 240,
        fixed: 'right',
      },
      rowSelection: {
        checkStrictly: false,
      },
      rowKey: 'path', // 把path当成rowKey
      beforeFetch: (params) => {
        params.hasQuery = 'true';
        return params;
      },
    },
  });
  const [
    registerTable,
    { reload, expandAll, collapseAll, updateTableDataRecord, findTableDataRecord, getDataSource },
    { rowSelection, selectedRowKeys },
  ] = tableContext;

  /**
   * 新增事件
   */
  function handleCreate() {
    openModal(true, {
      isUpdate: false,
      showFooter: true,
      showContent: false,
    });
  }

  /**
   * 编辑事件
   */
  // async function handleEdit(record: Recordable) {
  //   openModal(true, {
  //     record,
  //     isUpdate: true,
  //     showFooter: true,
  //     showContent: false,
  //   });
  // }

  /**
   * 详情
   */
  function handleDetail(record: Recordable) {
    openDrawer(true, {
      record,
      isUpdate: true,
      showFooter: true,
    });
  }

  /**
   * 删除事件
   */
  async function handleDelete(record) {
    await deleteAppFileEditApi({ path: record.path }, handleSuccess);
  }
  /**
   * 成功回调
   */
  async function handleSuccess() {
    (selectedRowKeys.value = []) && reload();
  }

  /**
   * 操作栏
   */
  function getTableAction(record) {
    return [
      {
        label: '详情',
        onClick: handleDetail.bind(null, record),
      },
      {
        label: '删除',
        popConfirm: {
          title: '确定删除吗?',
          confirm: handleDelete.bind(null, record),
          placement: 'topLeft',
        },
      },
    ];
  }
  /**
   * 下拉操作栏
   */
  // function getDropDownAction(record) {
  //   return [
  //     {
  //       label: '详情',
  //       onClick: handleDetail.bind(null, record),
  //     },
  //     {
  //       label: '删除',
  //       popConfirm: {
  //         title: '确定删除吗?',
  //         confirm: handleDelete.bind(null, record),
  //         placement: 'topLeft',
  //       },
  //     },
  //   ];
  // }
</script>

<style lang="less" scoped>
  :deep(.ant-picker),
  :deep(.ant-input-number) {
    width: 100%;
  }
</style>
