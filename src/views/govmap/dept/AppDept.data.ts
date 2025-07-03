import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '部门名称',
    align:"center",
    dataIndex: 'deptName'
   },
   {
    title: '部门地址',
    align:"center",
    dataIndex: 'deptAddress'
   },
   {
    title: '部门电话',
    align:"center",
    dataIndex: 'deptTel'
   },
   {
    title: '业务范围',
    align:"center",
    dataIndex: 'businessScope'
   },
   {
    title: '办事大厅ID',
    align:"center",
    dataIndex: 'hallId'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '部门名称',
    field: 'deptName',
    component: 'Input',
  },
  {
    label: '部门地址',
    field: 'deptAddress',
    component: 'Input',
  },
  {
    label: '部门电话',
    field: 'deptTel',
    component: 'Input',
  },
  {
    label: '业务范围',
    field: 'businessScope',
    component: 'InputTextArea',

  },
  {
    label: '办事大厅ID',
    field: 'hallId',
    component: 'Input',
    show: false
  },
	// TODO 主键隐藏字段，目前写死为ID
	{
	  label: '',
	  field: 'id',
	  component: 'Input',
	  show: false
	},
];



/**
* 流程表单调用这个方法获取formSchema
* @param param
*/
export function getBpmFormSchema(_formData): FormSchema[]{
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}
