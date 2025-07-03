<template>
  <a-row :class="['p-4', `${prefixCls}--box`]" :gutter="10">
    <a-col :xl="6" :lg="8" :md="10" :sm="24" style="flex: 1">
      <a-card :bordered="false" style="height: 100%">
        <AppOrgTree @select="onTreeSelect"></AppOrgTree>
      </a-card>
    </a-col>
    <!--引用表格-->
    <a-col :xl="18" :lg="16" :md="14" :sm="24" style="flex: 1">
      <a-card :bordered="false" style="height: 100%">
       <BasicTable @register="registerTable" :rowSelection="rowSelection">
         <!--插槽:table标题-->
          <template #tableTitle>
              <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined"> 新增</a-button>
              <a-button  type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
              <j-upload-button  type="primary" preIcon="ant-design:import-outlined" @click="onImportXls">导入</j-upload-button>
              <a-dropdown v-if="selectedRowKeys.length > 0">
                  <template #overlay>
                    <a-menu>
                      <a-menu-item key="1" @click="batchHandleDelete">
                        <Icon icon="ant-design:delete-outlined"></Icon>
                        删除
                      </a-menu-item>
                    </a-menu>
                  </template>
                  <a-button>批量操作
                    <Icon icon="mdi:chevron-down"></Icon>
                  </a-button>
            </a-dropdown>
          </template>
           <!--操作栏-->
          <template #action="{ record }">
            <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)"/>
          </template>
          <!--字段回显插槽-->
          <template #htmlSlot="{text}">
             <div v-html="text"></div>
          </template>
        </BasicTable>
      </a-card>
    </a-col>
    <!--  绑定事项  -->
    <AppItemListTable @register="appItemDrawer" />
    <!--  部门管理  -->
    <appDeptList @register="appDeptDrawer"  />
    <!-- 表单区域 -->
    <AppHallModal @register="registerFromModal" :appOrgData="appOrgData" @success="handleSuccess"></AppHallModal>
  </a-row>
</template>

<script lang="ts" name="govmap-appHall" setup>
  import {ref, computed, unref, watch} from 'vue';
  import { useDrawer } from '/@/components/Drawer';
  import AppOrgTree from './components/AppOrgTree.vue';
  import {BasicTable, useTable, TableAction} from '/@/components/Table';
  import {useModal} from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage'
  import AppHallModal from './components/AppHallModal.vue'
  import {columns, searchFormSchema} from './AppHall.data';
  import {list, deleteOne, batchDelete, getImportUrl, getExportUrl, moveHall} from './AppHall.api';
  import { downloadFile } from '/@/utils/common/renderUtils';
  import AppItemListTable from "./components/AppItemListTable.vue";
  import AppDeptList from "./../dept/AppDeptList.vue";

  const checkedKeys = ref<Array<string | number>>([]);

  const [appItemDrawer, { openDrawer: openAppItemDrawer }] = useDrawer();
  const [appDeptDrawer, { openDrawer: openAppDeptDrawer }] = useDrawer();

  // 当前选中的部门信息
  let appOrgData = ref({});

  watch(
      appOrgData,
      () => reload()
  );
  //注册model
  const [registerFromModal, {openModal: openFromModal}] = useModal();

  //注册table数据
  const { prefixCls,tableContext, createMessage,onExportXls,onImportXls } = useListPage({
      tableProps:{
           title: '办事大厅',
           api: list,
           columns,
           canResize:false,
           formConfig: {
              //labelWidth: 120,
              schemas: searchFormSchema,
              autoSubmitOnEnter:true,
              showAdvancedButton:true,
              fieldMapToNumber: [
              ],
              fieldMapToTime: [
              ],
            },
           actionColumn: {
               width: 300,
               fixed:'right'
            },
        // 请求之前对参数做处理
        beforeFetch(params) {
          params.orgId = appOrgData.value.key;
        },
      },
       exportConfig: {
            name:"办事大厅",
            url: getExportUrl,
          },
          importConfig: {
            url: getImportUrl,
            success: handleSuccess
          },
  })

  const [registerTable, {reload},{ rowSelection, selectedRowKeys }] = tableContext


  // 左侧树选择后触发
  function onTreeSelect(data) {
    appOrgData.value = data;
  }
  /**
   * 编辑事项
   */
  function bindItem(record) {
    openAppItemDrawer(true, record);
  }
  /**
   * 部门管理
   */
  function handleDept(record: Recordable) {
    openAppDeptDrawer(true, record);
  }
   /**
    * 新增事件
    */
  function handleAdd() {
    if(!appOrgData.value.key){
      createMessage.warning('请先选择一个部门');
    }
     openFromModal(true, {
       isUpdate: false,
       showFooter: true,
     });
  }
   /**
    * 编辑事件
    */
  function handleEdit(record: Recordable) {
     openFromModal(true, {
       record,
       isUpdate: true,
       showFooter: true,
     });
   }

   /**
    * 详情
   */
  function handleDetail(record: Recordable) {
     openFromModal(true, {
       record,
       isUpdate: true,
       showFooter: false,
     });
   }

   /**
    * 删除事件
    */
  async function handleDelete(record) {
     await deleteOne({id: record.id}, handleSuccess);
   }
   /**
    * 批量删除事件
    */
  async function batchHandleDelete() {
     await batchDelete({ids: selectedRowKeys.value}, handleSuccess);
   }
   /**
    * 成功回调
    */
  function handleSuccess() {
      (selectedRowKeys.value = []) && reload();
   }
   /**
      * 操作栏
      */
  function getTableAction(record){
       return [
         {
           label: '编辑',
           onClick: handleEdit.bind(null, record),
         },
         {
           label: '关联事项',
           onClick: bindItem.bind(null, record),
         },
         {
           label: '上移',
           popConfirm: {
             title: '是否确认移动？',
             confirm: onMove.bind(null, "up" , record),
           },
         },
         {
           label: '下移',
           popConfirm: {
             title: '是否确认移动？',
             confirm: onMove.bind(null, "down" , record),
           },
         }

       ]
   }
     /**
        * 下拉操作栏
        */
  function getDropDownAction(record){
       return [
         {
           label: '详情',
           onClick: handleDetail.bind(null, record),
         },
         {
           label: '部门管理',
           onClick: handleDept.bind(null, record),
         }, {
           label: '删除',
           popConfirm: {
             title: '是否确认删除',
             confirm: handleDelete.bind(null, record),
           }
         }
       ]
   }
  async function onMove(direction, record){
    await moveHall({id: record.id , direction: direction}, reload);
  }
</script>

<style scoped>

</style>
