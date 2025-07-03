<!--相关素材选择-->
<template>
  <div>
    <JSelectBiz @handleOpen="handleOpen" :loading="loadingEcho" v-bind="attrs"></JSelectBiz>
    <MaterialsSelectModal @register="regModal" @getSelectResult="setValue" v-bind="getBindValue"></MaterialsSelectModal>
  </div>
</template>
<script lang="ts">
import MaterialsSelectModal from './MaterialsSelectModal.vue';
import JSelectBiz from '/@/components/Form/src/jeecg/components/base/JSelectBiz.vue';
import { defineComponent, ref, reactive, watchEffect, watch, provide, computed, unref } from 'vue';
import { useModal } from '/@/components/Modal';
import { propTypes } from '/@/utils/propTypes';
import { useRuleFormItem } from '/@/hooks/component/useFormItem';
import { useAttrs } from '/@/hooks/core/useAttrs';
import { SelectValue } from 'ant-design-vue/es/select';

export default defineComponent({
  name: 'SelectMaterials',
  components: {
    MaterialsSelectModal,
    JSelectBiz,
  },
  inheritAttrs: false,
  props: {
    value: propTypes.oneOfType([propTypes.string, propTypes.array]),
    labelKey: {
      type: String,
      default: 'name',
    },
    rowKey: {
      type: String,
      default: 'id',
    },
    params: {
      type: Object,
      default: () => {},
    },
  },
  emits: ['options-change', 'change'],
  setup(props, { emit, refs }) {
    const emitData = ref<any[]>();
    //注册model
    const [regModal, { openModal }] = useModal();
    //表单值
    const [state] = useRuleFormItem(props, 'value', 'change', emitData);
    //下拉框选项值
    const selectOptions = ref<SelectValue>([]);
    //下拉框选中值
    let selectValues = reactive<object>({
      value: [],
      change: false,
    });
    // 是否正在加载回显数据
    const loadingEcho = ref<boolean>(false);
    //下发 selectOptions,xxxBiz组件接收
    provide('selectOptions', selectOptions);
    //下发 selectValues,xxxBiz组件接收
    provide('selectValues', selectValues);
    //下发 loadingEcho,xxxBiz组件接收
    provide('loadingEcho', loadingEcho);

    const tag = ref(false);
    const attrs = useAttrs();
    let initFlag = true;

    /**
     * 监听组件值
     */
    watchEffect(() => {
      props.value && initFlag && initValue();
    });

    /**
     * 监听selectValues变化
     */
    watch(selectValues, () => {
      if (selectValues) {
        state.value = selectValues.value;
      }
    });

    /**
     * 打卡弹出框
     */
    function handleOpen() {
      tag.value = true;
      openModal(true, {
        isUpdate: false,
      });
    }

    /**
     * 将字符串值转化为数组
     */
    function initValue() {
      let value = props.value ? props.value : [];
      initFlag= false;
      if (value && typeof value === 'string' && value != 'null' && value != 'undefined') {
        console.log(value);
        state.value = value.split(',');
        selectValues.value = value.split(',');
      }
    }

    /**
     * 设置下拉框的值
     */
    function setValue(options, values) {
      selectOptions.value = options;
      //emitData.value = values.join(",");
      state.value = values;
      selectValues.value = values;
    }

    const getBindValue = Object.assign({}, unref(props), unref(attrs));
    return {
      state,
      getBindValue,
      attrs,
      selectOptions,
      selectValues,
      loadingEcho,
      tag,
      regModal,
      setValue,
      handleOpen,
    };
  },
});

</script>
<style lang="less" scoped>
.j-select-row {
  @width: 82px;

  .left {
    width: calc(100% - @width - 8px);
  }

  .right {
    width: @width;
  }

  .full {
    width: 100%;
  }

  :deep(.ant-select-search__field) {
    display: none !important;
  }
}
</style>
