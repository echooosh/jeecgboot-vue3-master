import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '文件名称',
    align: 'center',
    dataIndex: 'name',
  },
  {
    title: '文件路径',
    align: 'center',
    dataIndex: 'path',
  },
  {
    title: '文件类型',
    align: 'center',
    dataIndex: 'type',
  },
  {
    title: '修改时间',
    align: 'center',
    dataIndex: 'lastModified',
  },
];
// 表头的查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: '文件名称',
    component: 'Input',
    field: 'fileName',
  },
];
// 新建和编辑的表单数据
export const formSchema: FormSchema[] = [
  {
    label: '文件路径',
    field: 'path',
    component: 'InputTextArea',
  },
];
// 修改文件内容的表单
export const contentForm: FormSchema[] = [
  {
    label: '文件内容',
    field: 'name',
    component: 'JUpload',
    componentProps: {
      multiple: false,
    },
  },
];

/**
 * 流程表单调用这个方法获取formSchema
 * @param param
 */
export function getBpmFormSchema(_formData): FormSchema[] {
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}
