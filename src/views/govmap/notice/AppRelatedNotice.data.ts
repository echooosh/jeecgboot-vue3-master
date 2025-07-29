import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '公告名称',
    align: 'center',
    dataIndex: 'name',
  },
  {
    title: '公告内容',
    align: 'center',
    dataIndex: 'materialDesc',
  },
  {
    title: '文件',
    align: 'center',
    dataIndex: 'materialFile',
  },
  {
    title: '大厅ID',
    align: 'center',
    dataIndex: 'hallId',
  },
  {
    title: '大厅名称',
    align: 'center',
    dataIndex: 'hallName',
  },
  {
    title: '发布状态',
    align: 'center',
    dataIndex: 'isOpen',
  },
  {
    title: '创建日期',
    align: 'center',
    dataIndex: 'createTime',
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '公告名称',
    field: 'name',
    component: 'Input',
    //colProps: {span: 6},
  },
  {
    label: '发布状态',
    field: 'isOpen',
    component: 'Input',
    //colProps: {span: 6},
  },
  {
    label: '创建日期',
    field: 'createTime',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    //colProps: {span: 6},
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '创建日期',
    field: 'createTime',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: '公告名称',
    field: 'name',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入公告名称!' }];
    },
  },
  {
    label: '公告内容',
    field: 'materialDesc',
    component: 'InputTextArea',
  },
  {
    label: '大厅ID',
    field: 'hallId',
    component: 'Cascader',
    componentProps: {
      options: [],
      placeholder: '请选择机构及大厅',
    },
  },
  {
    field: 'hall_name',
    label: '大厅名称',
    componentProps: {
      disabled: true, // 设置为禁用
    },
    component: 'Input',
  },
  {
    label: '文件',
    field: 'materialFile',
    component: 'JUpload',
    componentProps: {},
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入文件!' }];
    },
  },
  {
    label: '发布状态',
    field: 'isOpen',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [{ required: true, message: '请输入发布状态!' }];
    },
  },
  // TODO 主键隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
];

// 高级查询数据
export const superQuerySchema = {
  name: { title: '公告名称', order: 0, view: 'text', type: 'string' },
  materialDesc: { title: '公告内容', order: 1, view: 'textarea', type: 'string' },
  materialFile: { title: '文件', order: 2, view: 'file', type: 'string' },
  isOpen: { title: '发布状态', order: 3, view: 'text', type: 'string' },
  recVersion: { title: '版本号', order: 4, view: 'number', type: 'number' },
};

/**
 * 流程表单调用这个方法获取formSchema
 * @param param
 */
export function getBpmFormSchema(_formData): FormSchema[] {
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}
