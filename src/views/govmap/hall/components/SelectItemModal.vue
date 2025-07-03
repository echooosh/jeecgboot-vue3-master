<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="选择事项" width="1000px" @ok="handleSubmit">
    <!--事项列表树-->
    <BasicTree
        v-if="!treeReloading"
        title="事项"
        toolbar
        search
        showLine
        :checkable="true"
        :checkStrictly="false"
        :clickRowToExpand="false"
        :treeData="treeData"
        :selectedKeys="selectedKeys"
        :checkedKeys="checkedKeys"
        :expandedKeys="expandedKeys"
        ref="treeRef"
        :autoExpandParent="autoExpandParent"
        @select="onSelect"
        @expand="onExpand"
        @search="onSearch"
    />
  </BasicModal>
</template>
<script lang="ts" setup>
import {ref, unref, toRaw, nextTick} from 'vue';
import { BasicTree, TreeActionType } from '/@/components/Tree/index';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { querySelectItemTree} from '../AppHall.api';
import {useMessage} from "/@/hooks/web/useMessage";
// 声明Emits
const emit = defineEmits(['select', 'register']);
const selectedItemIds = ref('');
const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
  loadOrgTreeData();
  checkedKeys.value = data.selectedItemIds;
});
let loading = ref<boolean>(false);
let checkedKeys = ref<Array<string | number>>([]);
// 部门树列表数据
let treeData = ref<any[]>([]);
// 当前展开的项
let expandedKeys = ref<any[]>([]);
// 当前选中的项
let selectedKeys = ref<any[]>([]);
// 是否自动展开父级
let autoExpandParent = ref<boolean>(true);
// 用户身份
let userIdentity = ref<string>('2');
// 树组件重新加载
let treeReloading = ref<boolean>(false);

// 加载事项数据
function loadOrgTreeData() {
  loading.value = true;
  treeData.value = [];
  querySelectItemTree()
      .then((res) => {
        if (res.success) {
          if (Array.isArray(res.result)) {
            treeData.value = res.result;
            userIdentity.value = res.message;
            autoExpandParentNode();
            setTimeout(()=>{getTree().setCheckedKeys(checkedKeys.value)},500)
          }
        } else {
          createMessage.warning(res.message);
        }
      })
      .finally(() => (loading.value = false));
}



// 自动展开父节点，只展开一级
function autoExpandParentNode() {
  let keys: Array<any> = [];
  treeData.value.forEach((item, index) => {
    if (item.children && item.children.length > 0) {
      keys.push(item.key);
    }
    if (index === 0) {
      // 默认选中第一个
      setSelectedKey(item.key, item);
    }
  });
  if (keys.length > 0) {
    reloadTree();
    expandedKeys.value = keys;
  }
}

// 重新加载树组件，防止无法默认展开数据
async function reloadTree() {
  await nextTick();
  treeReloading.value = true;
  await nextTick();
  treeReloading.value = false;
}

/**
 * 设置当前选中的行
 */
function setSelectedKey(key: string, data?: object) {
  selectedKeys.value = [key];
  if (data) {
    //emit('select', data);
  }
}

// 搜索事件
function onSearch(value: string) {
  if (value) {
    loading.value = true;
    searchByKeywords({ keyWord: value, myDeptSearch: '1' })
        .then((result) => {
          if (Array.isArray(result)) {
            treeData.value = result;
          } else {
            createMessage.warning('未查询到部门信息');
            treeData.value = [];
          }
        })
        .finally(() => (loading.value = false));
  } else {
    loadOrgTreeData();
  }
}

// 树选择事件
function onSelect(selKeys, event) {
  if (selKeys.length > 0 && selectedKeys.value[0] !== selKeys[0]) {
    setSelectedKey(selKeys[0], event.selectedNodes[0]);
  } else {
    // 这样可以防止用户取消选择
    setSelectedKey(selectedKeys.value[0]);
  }
}

// 树展开事件
function onExpand(keys) {
  expandedKeys.value = keys;
  autoExpandParent.value = false;
}



const treeRef = ref<Nullable<TreeActionType>>(null);
const { createMessage } = useMessage();
function getTree() {
  const tree = unref(treeRef);
  if (!tree) {
    throw new Error('tree is null!');
  }
  return tree;
}

function handleGetCheckData() {
  const keys = getTree().getCheckedKeys();
  checkedKeys = keys;

}


//提交事件
function handleSubmit() {
 handleGetCheckData();
  setModalProps({ confirmLoading: true });
  //关闭弹窗
  closeModal();
  //刷新列表
  emit('select', toRaw(unref(checkedKeys)));
  setModalProps({ confirmLoading: false });
}
</script>
<style lang="less" scoped>
/*升级antd3后，查询框与树贴的太近，样式优化*/
:deep(.jeecg-tree-header) {
  margin-bottom: 6px;
}
</style>
