import {defHttp} from '/@/utils/http/axios';
import { useMessage } from "/@/hooks/web/useMessage";
import {downloadFile} from "/@/utils/common/renderUtils";

const { createConfirm } = useMessage();

enum Api {
  list = '/govmap/appRelatedMaterial/list',
  save='/govmap/appRelatedMaterial/add',
  edit='/govmap/appRelatedMaterial/edit',
  deleteOne = '/govmap/appRelatedMaterial/delete',
  deleteBatch = '/govmap/appRelatedMaterial/deleteBatch',
  importExcel = '/govmap/appRelatedMaterial/importExcel',
  exportXls = '/govmap/appRelatedMaterial/exportXls',
  getAllowSelectMaterialList = "/govmap/appRelatedMaterial/getAllowSelectList",
  exportOfflinePacket = "/govmap/appRelatedMaterial/exportOfflinePacket",
  listVOByIds = "/govmap/appRelatedMaterial/listVOByIds", // 根据IDS获取有序的附件
}
/**
 * 导出api
 * @param params
 */
export const getExportUrl = Api.exportXls;
/**
 * 导入api
 */
export const getImportUrl = Api.importExcel;
/**
 * 列表接口
 * @param params
 */
export const list = (params) =>
  defHttp.get({url: Api.list, params});

/**
 * 删除单个
 */
export const deleteOne = (params,handleSuccess) => {
  return defHttp.delete({url: Api.deleteOne, params}, {joinParamsToUrl: true}).then(() => {
    handleSuccess();
  });
}
/**
 * 批量删除
 * @param params
 */
export const batchDelete = (params, handleSuccess) => {
  createConfirm({
    iconType: 'warning',
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({url: Api.deleteBatch, data: params}, {joinParamsToUrl: true}).then(() => {
        handleSuccess();
      });
    }
  });
}
/**
 * 保存或者更新
 * @param params
 */
export const saveOrUpdate = (params, isUpdate) => {
  let url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({url: url, params});
}

/**
 * 相关附件列表
 * @param params
 */
export const getAllowSelectMaterialList = (params) => {
    return defHttp.get({ url: Api.getAllowSelectMaterialList, params });
};

/**
 * 导出离线包
 * @param params
 */
export const exportOfflinePacket = (params) =>{
    return  defHttp.get({url: Api.exportOfflinePacket, params}, {isTransformResponse:false}).then((result) => {
        downloadFile(  result.result );
    });
}

/**
 * 根据IDS获取有序的附件
 * @param params
 */
export const listVOByIds = (params) =>{
  return defHttp.get({url: Api.listVOByIds, params});
}
