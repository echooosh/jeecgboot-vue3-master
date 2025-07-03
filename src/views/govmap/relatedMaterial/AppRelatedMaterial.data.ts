import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '创建人',
    align:"center",
    dataIndex: 'createBy'
   },
   {
    title: '材料名称',
    align:"center",
    dataIndex: 'name'
   },
   {
    title: '文件',
    align:"center",
    dataIndex: 'materialFile',
    slots: { customRender: 'fileSlot' },
   },
   {
    title: '是否公开',
    align:"center",
    dataIndex: 'isOpen_dictText'
   },
   {
    title: '素材描述',
    align:"center",
    dataIndex: 'materialDesc'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
	{
      label: "材料名称",
      field: 'name',
      component: 'Input',
      colProps: {span: 6},
 	},
	{
      label: "是否公开",
      field: 'isOpen',
      component: 'JDictSelectTag',
      componentProps:{
          dictCode:"yn"
      },
      colProps: {span: 6},
 	},
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '材料名称',
    field: 'name',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入材料名称!'},
          ];
     },
  },
  {
    label: '文件',
    field: 'materialFile',
    component: 'JUpload',
    componentProps:{
        bizPath:"materials",
        maxCount:1
     },
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入文件!'},
          ];
     },
  },
  {
    label: '是否公开',
    field: 'isOpen',
      component: 'JDictSelectTag',
      componentProps:{
          type:"radio",
          dictCode:"yn"
      },
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入是否公开!'},
          ];
     },
  },
  {
    label: '素材描述',
    field: 'materialDesc',
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
