<template>
  <BasicDrawer @register="registerBaseDrawer" title="关联事项" width="800" destroyOnClose>
    <BasicTable @register="registerTable" >
      <template #tableTitle>
        <a-button type="primary" @click="handleCreate"> 新增关联事项</a-button>


      </template>
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>

    </BasicTable>
    <!--用户选择弹窗-->
    <SelectItemModal @register="registerModal" @select="selectOk" />

  </BasicDrawer>
</template>
<script lang="ts" setup>
import { ref, defineProps, watch, unref } from 'vue';
import {BasicTable, useTable, TableAction, FormSchema, BasicColumn} from '/@/components/Table';
import { BasicDrawer, useDrawer, useDrawerInner } from '/@/components/Drawer';
import { useModal } from '/@/components/Modal';

import {queryItemByHallIdPage,  addHallBindItem, delBind, moveItemHall, queryItemByHallId} from '../AppHall.api';
import { getUserRoles } from '/@/views/system/user/user.api';
import SelectItemModal from './SelectItemModal.vue'
import {TreeActionType} from "/@/components/Tree";
import {useMessage} from "/@/hooks/web/useMessage";
import {columns, searchFormSchema} from '../AppHall.data';
import {message} from "ant-design-vue";
const emit = defineEmits(['register']);
const checkedKeys = ref<Array<string | number>>([]);
const hallId = ref('');
const [registerBaseDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
  hallId.value = data.id;
  setProps({ searchInfo: { hallId: data.id } });
  //reload();
});

const itemColumn : BasicColumn[] = [

  {
    title: '事项名称',
    align:"left",
    dataIndex: 'dataIndex'
  },

];
//注册drawer
const [registerModal, { openModal:openSelectItemModel }] = useModal();

const [registerTable, { reload, updateTableDataRecord, setProps }] = useTable({
  title: '事项列表',
  api: queryItemByHallIdPage,
  columns: itemColumn,
  useSearchForm:false,
  striped: true,
  showTableSetting: true,
  clickToRowSelect: false,
  bordered: true,
  showIndexColumn: true,
  tableSetting: { fullScreen: true },
  canResize: false,
  rowKey: 'id',
  actionColumn: {
    width: 180,
    title: '操作',
    dataIndex: 'action',
    slots: { customRender: 'action' },
    fixed: undefined,
  },
});


/**
 * 选择列配置
 */
const rowSelection = {
  type: 'checkbox',
  columnWidth: 50,
  selectedRowKeys: checkedKeys,
  onChange: onSelectChange,
};

/**
 * 选择事件
 */
function onSelectChange(selectedRowKeys: (string | number)[], selectionRows) {
  checkedKeys.value = selectedRowKeys;
}

/**
 * 新增
 */
function handleCreate() {
  queryItemByHallId({hallId: hallId.value}).then((res)=>{
    const selectedItemIds = ref<any[]>([]);
    res.forEach((item)=>{
      selectedItemIds.value.push(item.id);
    })
    openSelectItemModel(true, {selectedItemIds:selectedItemIds.value});
  })

}

/**
 * 调整排序
 */
function handleSort(){
  openSortMaterialModal(true, {
    values: values,
  });
}

/**
 * 删除事件
 */
async function handleDelete(record) {
  await delBind({itemId: record.id, hallId: hallId.value}, reload);
}

/**
 * 批量删除事件
 */
async function batchHandleDelete() {
  await delBind({ userIds: checkedKeys.value.join(','), roleId: roleId.value }, reload);
}

/**
 * 选择已有用户
 */
function handleSelect() {
  openModal(true);
}
/**
 * 添加
 */
async function selectOk(val) {
  await addHallBindItem({ hallId: hallId.value, itemIds: val }, reload);
}
/**
 * 操作栏
 */
function getTableAction(record) {
  return [
    {
      label: '取消关联',
      popConfirm: {
        title: '是否确认取消关联',
        confirm: handleDelete.bind(null, record),
      },
    },
    {
      label: '上移',
      onClick: onMove.bind(null, "up" , record),

    },
    {
      label: '下移',
      onClick: onMove.bind(null,'down', record),

    },
  ];
}

async function onMove(direction, record){
  await moveItemHall({itemId: record.id, hallId: hallId.value , direction: direction}, reload);
}

</script>
