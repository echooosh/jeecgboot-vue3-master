import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '机构名称',
    align: 'left',
    dataIndex: 'orgName'
   },
   {
    title: '机构介绍',
    align: 'center',
    dataIndex: 'orgDesc'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '父级节点',
    field: 'pid',
    component: 'JTreeSelect',
    componentProps: {
      dict: "app_org,org_name,id",
      pidField: "pid",
      pidValue: "0",
      hasChildField: "has_child",
    },
  },
  {
    label: '机构名称',
    field: 'orgName',
    component: 'Input',
  },
  {
    label: '机构介绍',
    field: 'orgDesc',
    component: 'InputTextArea',
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
