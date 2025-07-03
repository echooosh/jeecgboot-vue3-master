import {defHttp} from "/@/utils/http/axios";
import { useMessage } from "/@/hooks/web/useMessage";
import {downloadFile} from "/@/utils/common/renderUtils";

const { createConfirm } = useMessage();

enum Api {
  list = '/govmap/appOrg/rootList',
  save='/govmap/appOrg/add',
  edit='/govmap/appOrg/edit',
  deleteAppOrg = '/govmap/appOrg/delete',
  importExcel = '/govmap/appOrg/importExcel',
  exportXls = '/govmap/appOrg/exportXls',
  loadTreeData = '/govmap/appOrg/loadTreeRoot',
  getChildList = '/govmap/appOrg/childList',
  getChildListBatch = '/govmap/appOrg/getChildListBatch',
  exportOfflinePacket = '/govmap/appOrg/exportOfflinePacket',
  moveOrg = '/govmap/appOrg/move',
}

/**
 * 导出api
 * @param params
 */
export const getExportUrl = Api.exportXls;
/**
 * 导入api
 * @param params
 */
export const getImportUrl = Api.importExcel;
/**
 * 列表接口
 * @param params
 */
export const list = (params) =>
  defHttp.get({url: Api.list, params});
/**
 * 删除
 */
export const deleteAppOrg = (params,handleSuccess) => {
  return defHttp.delete({url: Api.deleteAppOrg, params}, {joinParamsToUrl: true}).then(() => {
    handleSuccess();
  });
}
/**
 * 批量删除
 * @param params
 */
export const batchDeleteAppOrg = (params, handleSuccess) => {
  createConfirm({
    iconType: 'warning',
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({url: Api.deleteAppOrg, data: params}, {joinParamsToUrl: true}).then(() => {
        handleSuccess();
      });
    }
  });
}
/**
 * 保存或者更新
 * @param params
 */
export const saveOrUpdateDict = (params, isUpdate) => {
  let url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({url: url, params});
}
/**
 * 查询全部树形节点数据
 * @param params
 */
export const loadTreeData = (params) =>
  defHttp.get({url: Api.loadTreeData,params});
/**
 * 查询子节点数据
 * @param params
 */
export const getChildList = (params) =>
  defHttp.get({url: Api.getChildList, params});
/**
 * 批量查询子节点数据
 * @param params
 */
export const getChildListBatch = (params) =>
  defHttp.get({url: Api.getChildListBatch, params},{isTransformResponse:false});


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
 * 移动
 * @param params
 */
export const moveOrg = (params,handleSuccess) => {
  return defHttp.post({url: Api.moveOrg, params},{joinParamsToUrl: true}).then(() => {
    handleSuccess();
  });
}
