<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerTable" :rowSelection="rowSelection" @handle-search-info-change="searchInfoChange">
      <!--插槽:table标题-->
      <template #tableTitle>
        <a-button type="primary" @click="handleCreate" preIcon="ant-design:plus-outlined"> 新增</a-button>
        <a-button type="primary" preIcon="ic:round-expand" @click="expandAll">展开全部</a-button>
        <a-button type="primary" preIcon="ic:round-compress" @click="collapseAll">折叠全部</a-button>

        <!-- 高级查询 -->
        <super-query :config="superQueryConfig" @search="handleSuperQuery" />
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
  import { columns, searchFormSchema, superQuerySchema } from './AppFileEdit.data';
  import { getTreeFileListApi, deleteAppFileEditApi, searchFileApi } from './AppFileEdit.api';
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
        if (params.fileName || params.exactMatch) {
          // 动态切换 API
          setProps({ api: searchFileApi });

          // 清洗一下 query 参数
          return {
            ...params,
            fileName: queryParam.fileName,
            exactMatch: queryParam.exactMatch,
          };
        }

        return params;
      },
    },
  });
  const [
    registerTable,
    { reload, expandAll, setProps, collapseAll, updateTableDataRecord, findTableDataRecord, getDataSource },
    { rowSelection, selectedRowKeys },
  ] = tableContext;

  function searchInfoChange(searchParams) {
    // 更新 queryParam，用于 beforeFetch 拼接参数
    queryParam.fileName = searchParams.fileName;
    queryParam.exactMatch = searchParams.exactMatch;

    // 动态设置查询用的 API
    setProps({ api: searchFileApi });

    // 重新加载表格
    reload();
  }

  // 高级查询配置
  const superQueryConfig = reactive(superQuerySchema);

  /**
   * 高级查询事件
   */
  function handleSuperQuery(params) {
    debugger;
    Object.keys(params).map((k) => {
      queryParam[k] = params[k];
    });
    reload();
  }

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
