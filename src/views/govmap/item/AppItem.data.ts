import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
   {
    title: '事项名称',
    align:"center",
    dataIndex: 'itemName'
   },
   {
    title: '实施机构',
    align:"center",
    dataIndex: 'dealOrg'
   },
   {
    title: '办理形式',
    align:"center",
    dataIndex: 'dealType_dictText'
   },
   {
    title: '办理地址',
    align:"center",
    dataIndex: 'dealPlace'
   },
   {
    title: '事项类型',
    align:"center",
    dataIndex: 'itemType'
   },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
    {
        field: 'itemName',
        label: '事项名称',
        component: 'Input',
        colProps: { span: 12 },
    },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '事项名称',
    field: 'itemName',
    component: 'Input',
      dynamicRules: ({model,schema}) => {
          return [
              { required: true, message: '请输入事项名称!'},
          ];
      },
  },
    {
        label: '事项编码',
        field: 'itemCode',
        component: 'Input',
    },
    {
        label: '事项类型',
        field: 'itemType',
        component: 'JDictSelectTag',
        componentProps: {
            dictCode: "item_type",
        },
      dynamicRules: ({model,schema}) => {
        return [
          { required: true, message: '请选择事项类型!'},
        ];
      },
    },
    {
        label: '是否热点业务',
        field: 'isHot',
        component: 'JDictSelectTag',
        componentProps:{
            type:"radio",
            dictCode:"yn"
        },
        show: false,
    },
  {
    label: '实施机构',
    field: 'dealOrg',
    component: 'Input',
    dynamicRules: ({model,schema}) => {
      return [
        { required: true, message: '请输入实施机构!'},
      ];
    },
  },

  {
        label: '办理形式',
        field: 'dealType',
        component: 'JCheckbox',
        componentProps:{
            dictCode:"item_deal_type",
        },
        dynamicRules: ({model,schema}) => {
            return [
                { required: true, message: '请选择办理形式!'},
            ];
        },


    },


    {
        label: '线上办理地址',
        field: 'dealPlace',
        component: 'InputTextArea',
        componentProps: {
            rows: 4
        },
      dynamicRules: ({model,schema}) => {
        const dealType = model.dealType;
        return [
          { validator: (rule, value, callback) => {

              if (dealType && dealType.indexOf("线上办理") != -1 &&  !value) {
                callback(new Error('请输入线上办理地址!'));
              } else {
                callback();
              }
            }, trigger: 'blur'
          }
        ];
      },
    },
  {
    label: '事项分类ID',
    field: 'cateId',
    component: 'Input',
      show: false
  },

    {
        label: '办理流程',
        field: 'dealProcess',
        component: 'JEditor',
        componentProps:{
            rows:4
        },
      dynamicRules: ({model,schema}) => {
        return [
          { required: true, message: '请输入办理流程!'},
        ];
      },
    },
    {
        label: '办理条件',
        field: 'dealCondition',
        component: 'InputTextArea',
        componentProps:{
            rows:4
        },
      dynamicRules: ({model,schema}) => {
        return [
          { required: true, message: '请输入办理条件!'},
        ];
      },
    },
/*    {
        label: '相关材料',
        field: 'relatedMaterials',
        component: 'JSelectMultiple',
        componentProps:{
            dictCode:"app_related_material,name,id"
        },
    },*/
/*    {
        label: '相关材料',
        field: 'relatedMaterials',
        component: 'JSelectMultiple',
        slot:"manageMaterials"
    },*/
    {
        label: '相关材料',
        field: 'relatedMaterials',
        component: 'SelectMaterials',
        componentProps: {
            rowKey: 'id',
            labelKey: 'name',
        },
      show: false,
    },
    {
        label: '法定时限',
        field: 'legalDeadline',
        component: 'Input',
        dynamicRules: ({model,schema}) => {
          return [
            { required: true, message: '请输入法定时限!'},
          ];
        },
    },
    {
        label: '承诺时限',
        field: 'promiseDeadline',
        component: 'Input',
        dynamicRules: ({model,schema}) => {
          return [
            { required: true, message: '请输入承诺时限!'},
          ];
        },
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
