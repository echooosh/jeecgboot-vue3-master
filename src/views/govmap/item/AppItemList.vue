<template>
  <a-row :class="['p-4', `${prefixCls}--box`]" :gutter="10">
    <a-col :xl="6" :lg="8" :md="10" :sm="24" style="flex: 1">
      <a-card :bordered="false" style="height: 100%">
        <AppCateTree @select="onTreeSelect"></AppCateTree>
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
        <!--省市区字段回显插槽-->
        <template #pcaSlot="{text}">
           {{ getAreaTextByCode(text) }}
        </template>
        <template #fileSlot="{text}">
           <span v-if="!text" style="font-size: 12px;font-style: italic;">无文件</span>
           <a-button v-else :ghost="true" type="primary" preIcon="ant-design:download-outlined" size="small" @click="downloadFile(text)">下载</a-button>
        </template>
      </BasicTable>
      <!-- 表单区域 -->
      <AppItemModal @register="registerModal" :appCateData="appCateData" @success="handleSuccess"></AppItemModal>
      </a-card>
    </a-col>
  </a-row>
</template>

<script lang="ts" name="govmap-appItem" setup>
  import {ref, computed, unref, watch} from 'vue';
  import {BasicTable, useTable, TableAction} from '/@/components/Table';
  import AppCateTree from './components/AppCateTree.vue';
  import {useModal} from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage'
  import AppItemModal from './components/AppItemModal.vue'
  import {columns, searchFormSchema} from './AppItem.data';
  import {list, deleteOne, batchDelete, getImportUrl,getExportUrl} from './AppItem.api';
  import { downloadFile } from '/@/utils/common/renderUtils';
  const checkedKeys = ref<Array<string | number>>([]);
  //注册model
  const [registerModal, {openModal}] = useModal();
  //注册table数据
  const { prefixCls,tableContext,onExportXls,onImportXls } = useListPage({
      tableProps:{
           title: '办事事项',
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
               width: 120,
               fixed:'right'
            },
        // 请求之前对参数做处理
        beforeFetch(params) {
          params.cateId = appCateData.value.key;
        },
      },
       exportConfig: {
            name:"办事事项",
            url: getExportUrl,
          },
          importConfig: {
            url: getImportUrl,
            success: handleSuccess
          },
  })

  // 当前选中的部门信息
  let appCateData = ref({});

  watch(
      appCateData,
      () => reload()
  );

  const [registerTable, {reload},{ rowSelection, selectedRowKeys }] = tableContext

  // 左侧树选择后触发
  function onTreeSelect(data) {
    appCateData.value = data;
  }

   /**
    * 新增事件
    */
  function handleAdd() {
     openModal(true, {
       isUpdate: false,
       showFooter: true,
     });
  }
   /**
    * 编辑事件
    */
  function handleEdit(record: Recordable) {
     openModal(true, {
       record,
       isUpdate: true,
       showFooter: true,
     });
   }
   /**
    * 详情
   */
  function handleDetail(record: Recordable) {
     openModal(true, {
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
         }, {
           label: '删除',
           popConfirm: {
             title: '是否确认删除',
             confirm: handleDelete.bind(null, record),
           }
         }
       ]
   }


</script>

<style scoped>

</style>
