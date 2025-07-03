import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '分类名称',
    align: 'left',
    dataIndex: 'cateName'
   },
   {
    title: '分类描述',
    align: 'center',
    dataIndex: 'cateDesc'
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
      dict: "app_cate,cate_name,id",
      pidField: "pid",
      pidValue: "0",
      hasChildField: "has_child",
    },
  },
  {
    label: '分类名称',
    field: 'cateName',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入分类名称!'},
          ];
     },
  },
  {
    label: '分类描述',
    field: 'cateDesc',
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
