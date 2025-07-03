import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '大厅名称',
    align:"center",
    dataIndex: 'hallName'
   },
   {
    title: '大厅地点',
    align:"center",
    dataIndex: 'hallAddress'
   },
    {
        title: '坐标经度',
        align:"center",
        dataIndex: 'lng'
    },
    {
        title: '坐标纬度',
        align:"center",
        dataIndex: 'lat'
    },
   {
    title: '办公电话',
    align:"center",
    dataIndex: 'hallTel'
   },
   {
    title: '办公时间',
    align:"center",
    dataIndex: 'dealDate'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
    {
        field: 'hallName',
        label: '大厅名称',
        component: 'Input',
        colProps: { span: 12 },
    },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '大厅名称',
    field: 'hallName',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
          return [
                 { required: true, message: '请输入大厅名称!'},
          ];
     },
  },

  {
    label: '详细地址',
    field: 'hallAddress',
    component: 'Input',
    componentProps:{
      placeholder: "'请输入详细地址，包括省、市、区、街道名称、门牌号'",
    },
    dynamicRules: ({model,schema}) => {
      return [
        { required: true, message: '请输入详细地址，包括省、市、区、街道名称、门牌号、楼层和房间号（如果适用）!'},
      ];
    },
  },
    {
        label: '照片',
        field: 'photo',
        component: 'JImageUpload',
        componentProps:{
        },
        show:false,
    },
    {
        label: '坐标经度',
        field: 'lng',
        component: 'Input',
    },
    {
        label: '坐标纬度',
        field: 'lat',
        component: 'Input',
    },

  {
    label: '办公电话',
    field: 'hallTel',
    component: 'InputTextArea',
    dynamicRules: ({model,schema}) => {
      return [
        { required: true, message: '请输入办公电话!'},
      ];
    },
  },
  {
    label: '办公时间',
    field: 'dealDate',
    component: 'InputTextArea',
    dynamicRules: ({model,schema}) => {
      return [
        { required: true, message: '请输入办公时间!'},
      ];
    },
  },
  {
    label: '机构职责',
    field: 'hallDuty',
    component: 'InputTextArea',
    show:false,
  },
    {
        label: '业务范围',
        field: 'businessScope',
        component: 'InputTextArea',
      show:false,
    },
  {
    label: '机构描述',
    field: 'hallDesc',
    component: 'InputTextArea',

  },
  {
    label: '机构ID',
    field: 'orgId',
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
