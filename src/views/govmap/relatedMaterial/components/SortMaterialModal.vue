<template>
  <BasicModal
    title="调整附件排序"
    v-bind="$attrs" @register="registerModal" destroyOnClose :width="800" @ok="handleSubmit">
    <draggable
      class="draggable-pannel"
      :list="state.list"
      ghost-class="ghost"
      chosen-class="chosenClass"
      animation="300"
      @start="onStart"
      @end="onEnd"
    >
      <template #item="{ element }">
        <div class="item">
          {{ element.name }}
        </div>
      </template>
    </draggable>
  </BasicModal>
</template>

<script lang="ts" setup>
import {ref, reactive, computed, provide, unref} from 'vue';
import {BasicModal, useModalInner} from '/@/components/Modal';
import {listVOByIds} from '../AppRelatedMaterial.api';
import { message } from 'ant-design-vue';
import draggable from "vuedraggable";

const emit = defineEmits(['reloadSort']);
const state = reactive({
  //需要拖拽的数据，拖拽后数据的顺序也会变化
  list: [],
});


//表单赋值
const [registerModal, {setModalProps, closeModal}] = useModalInner(async (data) => {
  const selectIds = data?.values;
  //初始化
  state.list=[] ;
  listVOByIds({"ids": selectIds.join(",")}).then((data) => {
      data.forEach(materials => {
        state.list.push(materials)
      });
    }
  )
});

async function handleSubmit() {
  let sortValues = [] as any
  state.list.forEach(materials => {
    sortValues.push(materials.id)
  });
  //下发 selectValues,xxxBiz组件接收
  emit('reloadSort', sortValues);
  closeModal();
}
</script>

<style lang="less" scoped>
.itxst {
  width: 600px;
  display: flex;
}
.itxst > div:nth-of-type(1) {
  flex: 1;
}
.itxst > div:nth-of-type(2) {
  width: 270px;
  padding-left: 20px;
}
.item {
  border: solid 1px #eee;
  padding: 6px 10px;
  text-align: left;
}

.item:hover {
  cursor: move;
}
.item + .item {
  margin-top: 10px;
}
.ghost {
  border: solid 1px rgb(58, 60, 73);
}
.chosenClass {
  background-color: #f1f1f1;
}
.draggable-pannel{
  height: 500px;
}
</style>
