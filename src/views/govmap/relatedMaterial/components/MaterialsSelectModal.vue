<!--相关附件选择框-->
<template>
  <div>
    <BasicModal
        v-bind="$attrs"
        @register="register"
        :title="modalTitle"
        width="900px"
        wrapClassName="j-user-select-modal"
        @ok="handleOk"
        destroyOnClose
        @visible-change="visibleChange"
    >
      <a-row>
        <a-col :span="showSelected ? 18 : 24">
          <BasicTable
              @register="registerTable"
              :columns="columns"
              :api="getAllowSelectMaterialList"
              :bordered="true"
              :useSearchForm="true"
              :formConfig="formConfig"
              :searchInfo="searchInfo"
              :rowSelection="rowSelection"
              :actionColumn="actionColumn"
              :showIndexColumn="false"
              :showActionColumn="true"
              v-bind="getBindValue"
          >
            <!--操作栏-->
            <template #action="{ record }">
              <TableAction :actions="getTableAction(record)"  />
            </template>
            <!--插槽:table标题-->
            <template #tableTitle>
              <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined"> 新增</a-button>
              <a-button type="primary" @click="handleSort" preIcon="ant-design:plus-outlined"> 编辑排序</a-button>
            </template>
            <template #fileSlot="{record}">
              <span v-if="!record.materialFile" style="font-size: 12px;font-style: italic;">无文件</span>
              <a-button v-else :ghost="true" type="primary" preIcon="ant-design:download-outlined" size="small" @click="onDownloadFile(record)">下载</a-button>
            </template>
          </BasicTable>
        </a-col>
<!--        <a-col :span="showSelected ? 6 : 0">
          <BasicTable
              v-bind="selectedTable"
              :dataSource="selectRows"
              :useSearchForm="true"
              :formConfig="{ showActionButtonGroup: false, baseRowStyle: { minHeight: '40px' } }"
          >
            &lt;!&ndash;操作栏&ndash;&gt;
            <template #action="{ record }">
              <a href="javascript:void(0)" @click="handleDeleteSelected(record)"><Icon icon="ant-design:delete-outlined"></Icon></a>
            </template>

          </BasicTable>
        </a-col>-->
      </a-row>

    </BasicModal>
    <!-- 表单区域 -->
    <AppRelatedMaterialModal @register="materialModal" @success="tableReload"></AppRelatedMaterialModal>
    <SortMaterialModal @register="sortMaterialModal" @reloadSort="reloadSort"></SortMaterialModal>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, unref } from 'vue';
import {BasicModal, useModal, useModalInner} from '/@/components/Modal';
import {deleteOne, getAllowSelectMaterialList} from '../AppRelatedMaterial.api';
import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';
import { useSelectBiz } from '/@/components/Form/src/jeecg/hooks/useSelectBiz';
import { useAttrs } from '/@/hooks/core/useAttrs';
import { selectProps } from '/@/components/Form/src/jeecg/props/props';
import AppRelatedMaterialModal from './AppRelatedMaterialModal.vue'
import SortMaterialModal from './SortMaterialModal.vue'
import { downloadFile } from '/@/utils/common/renderUtils';
import {BasicColumn} from "/@/components/Table";
import {message} from "ant-design-vue";

export default defineComponent({
  name: 'MaterialsSelectModal',
  components: {
    TableAction: createAsyncComponent(() => import('/@/components/Table/src/components/TableAction.vue'), {
      loading: true,
    }),
    AppRelatedMaterialModal,
    SortMaterialModal,
    //此处需要异步加载BasicTable
    BasicModal,
    BasicTable: createAsyncComponent(() => import('/@/components/Table/src/BasicTable.vue'), {
      loading: true,
    }),
  },
  props: {
    ...selectProps,
    //选择框标题
    modalTitle: {
      type: String,
      default: '附件选择',
    },
  },
  emits: ['register', 'getSelectResult'],


  setup(props, { emit, refs }) {
    //注册弹框
    const [register, { closeModal }] = useModalInner();
    //注册model
    const [materialModal, {openModal:openMaterialModal}] = useModal();
    //注册model
    const [sortMaterialModal, {openModal:openSortMaterialModal}] = useModal();

    let tableRef = unref<Nullable<TableActionType>>(null);
    function registerTable(tableAction, formActions){
      tableRef = unref(tableAction);
    }

    function onDownloadFile(record){
      downloadFile(record.materialFile);
    }

    function tableReload(){
      if (!tableRef) {
        throw new Error('tableAction is null');
      }
      tableRef.reload();
    }

    const attrs = useAttrs();
    //表格配置
    const config = {
      canResize: false,
      bordered: true,
      size: 'small',
      rowKey: 'id',
    };
    const actionColumn = {
      width: 120,
      fixed:'right'
    }
    const getBindValue = Object.assign({}, unref(props), unref(attrs), config);
    const [{ rowSelection, visibleChange, indexColumnProps, getSelectResult, handleDeleteSelected, selectRows, selectValues }] = useSelectBiz(
        getAllowSelectMaterialList,
        getBindValue
    );
    const searchInfo = ref(props.params);
    //查询form
    const formConfig = {
      labelCol: {
        span: 8,
      },
      baseColProps: {
        xs: 24,
        sm: 10,
        md: 10,
        lg: 10,
        xl: 10,
        xxl: 10,
      },
      schemas: [
        {
          label: '材料名称',
          field: 'name',
          component: 'Input',
          colProps: { span: 8 },
        },
        {
          label: '是否公开',
          field: 'isOpen',
          component: 'JDictSelectTag',
          componentProps:{
            dictCode:"yn"
          },
          colProps: { span: 8 },
        },
      ],
    };
    //定义表格列
    const columns : BasicColumn[] = [
      {
        title: '创建人',
        dataIndex: 'createBy',
        width: 30,
        align: 'center',
      },
      {
        title: '材料名称',
        dataIndex: 'name',
        width: 50,
        align: 'left',
      },
      {
        title: '是否公开',
        dataIndex: 'isOpen_dictText',
        width: 30,
        align: 'center',
      },
      {
        title: '文件',
        align:"center",
        width: 20,
        dataIndex: 'materialFile',
        slots: { customRender: 'fileSlot' },
      },
      {
        title: '素材描述',
        align:"center",
        dataIndex: 'materialDesc',
        width: 50,
      },
    ];
    //已选择的table信息
    const selectedTable = {
      pagination: false,
      showIndexColumn: false,
      scroll: { y: 390 },
      size: 'small',
      canResize: false,
      bordered: true,
      rowKey: 'id',
      columns: [
        {
          title: '附件名称',
          dataIndex: 'name',
          width: 40,
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          width: 40,
          slots: { customRender: 'action' },
        },
      ],
    };

    /**
     * 删除事件
     */
    async function handleDelete(record) {
      await deleteOne({id: record.id}, handleSuccess);
    }
    /**
     * 操作栏
     */
    function getTableAction(record){
      return [
        {
          label: '删除',
          popConfirm: {
            title: '是否确认删除',
            confirm: handleDelete.bind(null, record),
          }
        }
      ]
    }

    /**
     * 确定选择
     */
    function handleOk() {
      getSelectResult((options, values) => {
        //回传选项和已选择的值
        emit('getSelectResult', options, values);
        //关闭弹窗
        closeModal();
      });
    }

    /**
     * 刷新排序值
     * @param sortValues
     */
    function reloadSort( sortValues ){
      selectValues.value = sortValues
    }

    /**
     * 新增事件
     */
    function handleAdd() {
      openMaterialModal(true, {
        isUpdate: false,
        showFooter: true,
      });
    }
    /**
     * 调整排序
     */
    function handleSort() {
      getSelectResult((options, values) => {
        if(values.length == 0){
          message.warning('请先选择附件。');
          return ;
        }
        openSortMaterialModal(true, {
          values: values,
        });
      });


    }


    return {
      onDownloadFile,
      registerTable,
      getTableAction,
      handleOk,
      getAllowSelectMaterialList,
      register,
      visibleChange,
      getBindValue,
      formConfig,
      indexColumnProps,
      columns,
      rowSelection,
      selectValues,
      selectedTable,
      selectRows,
      handleDeleteSelected,
      materialModal,
      sortMaterialModal,
      handleAdd,
      handleSort,
      reloadSort,
      tableReload,
    };
  },
});
</script>
