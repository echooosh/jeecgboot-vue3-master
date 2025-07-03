import {defHttp} from '/@/utils/http/axios';
import { useMessage } from "/@/hooks/web/useMessage";

const { createConfirm } = useMessage();

enum Api {
  list = '/govmap/appHall/list',
  save='/govmap/appHall/add',
  edit='/govmap/appHall/edit',
  deleteOne = '/govmap/appHall/delete',
  deleteBatch = '/govmap/appHall/deleteBatch',
  importExcel = '/govmap/appHall/importExcel',
  exportXls = '/govmap/appHall/exportXls',
  queryOrgTreeList = "/govmap/appOrg/queryTreeList",
  queryItemByHallIdPage = "/govmap/appItem/queryByHallIdPage",
  queryItemByHallId = "/govmap/appItem/queryItemByHallId",

  querySelectItemTree = "/govmap/appItem/querySelectItemTree",
  addHallBindItem = "/govmap/appItemHall/addHallBindItem",
  delBind = "/govmap/appItemHall/delBind",
  moveItemHall = "/govmap/appItemHall/move",
  moveHall = "/govmap/appHall/move",
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
 * 获取机构树数据
 * @param params
 */
export const queryOrgTreeList = (params?) => defHttp.get({ url: Api.queryOrgTreeList, params }, { isTransformResponse: false });

/**
 * 获取已绑定的事项列表
 * @param params
 */
export const queryItemByHallIdPage = (params) => defHttp.get({ url: Api.queryItemByHallIdPage, params });
/**
 * 获取已绑定的事项ID
 * @param params
 */
export const queryItemByHallId = (params) => {
  return defHttp.get({ url: Api.queryItemByHallId, params })
}

/**
 * 删除绑定的数据
 * @param params
 */
export const delBind = (params,handleSuccess) => {
    return defHttp.delete({url: Api.delBind, params}, {joinParamsToUrl: true}).then(() => {
        handleSuccess();
    });
}

/**
 * 获取事项树
 * @param params
 */
export const querySelectItemTree = (params?) => defHttp.get({ url: Api.querySelectItemTree, params }, { isTransformResponse: false });


export const addHallBindItem = (params, handleSuccess) => {
    return defHttp.post({url: Api.addHallBindItem, params}).then(() => {
        handleSuccess();
    });
}


/**
 * 移动
 * @param params
 */
export const moveItemHall = (params,handleSuccess) => {
    return defHttp.post({url: Api.moveItemHall, params},{joinParamsToUrl: true}).then(() => {
        handleSuccess();
    });
}

/**
 * 移动
 * @param params
 */
export const moveHall = (params,handleSuccess) => {
    return defHttp.post({url: Api.moveHall, params},{joinParamsToUrl: true}).then(() => {
        handleSuccess();
    });
}
