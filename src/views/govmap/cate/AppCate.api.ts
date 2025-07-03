import {defHttp} from "/@/utils/http/axios";
import { useMessage } from "/@/hooks/web/useMessage";
import {downloadFile} from "/@/utils/common/renderUtils";

const { createConfirm } = useMessage();

enum Api {
  list = '/govmap/appCate/rootList',
  save='/govmap/appCate/add',
  edit='/govmap/appCate/edit',
  deleteAppCate = '/govmap/appCate/delete',
  importExcel = '/govmap/appCate/importExcel',
  exportXls = '/govmap/appCate/exportXls',
  loadTreeData = '/govmap/appCate/loadTreeRoot',
  getChildList = '/govmap/appCate/childList',
  getChildListBatch = '/govmap/appCate/getChildListBatch',
  exportOfflinePacket = '/govmap/appCate/exportOfflinePacket',
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
export const deleteAppCate = (params,handleSuccess) => {
  return defHttp.delete({url: Api.deleteAppCate, params}, {joinParamsToUrl: true}).then(() => {
    handleSuccess();
  });
}
/**
 * 批量删除
 * @param params
 */
export const batchDeleteAppCate = (params, handleSuccess) => {
  createConfirm({
    iconType: 'warning',
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({url: Api.deleteAppCate, data: params}, {joinParamsToUrl: true}).then(() => {
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

