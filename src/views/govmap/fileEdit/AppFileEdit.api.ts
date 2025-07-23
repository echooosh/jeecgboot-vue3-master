import { defHttp } from '/@/utils/http/axios';

enum Api {
  create = '/sys/file/createFile', // 创建新文件 post overwrite: 创建或覆盖已存在文件
  save = '/sys/file/save', // 文件编辑-保存文件内容 post
  Tree = '/sys/file/tree', // 文件编辑-树形结构 get
  content = '/sys/file/content', // 文件编辑-获取文件内容 get
  delete = '/sys/file/delete', // 删除文件 delete
  search = '/sys/file/searchFile', // 根据文件名查询
}

/**
 * 获取树结构
 * @param params
 */
export const getTreeFileListApi = (params) => defHttp.get({ url: Api.Tree, params });
/**
 * 获取文件内容
 * @param params
 */
export const getTreeFileContentApi = (params) =>
  defHttp.get(
    {
      url: Api.content,
      params,
      responseType: 'blob',
    },
    {
      isReturnNativeResponse: true,
      errorMessageMode: 'none',
      successMessageMode: 'none',
    }
  );
/**
 * 删除
 */
export const deleteAppFileEditApi = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.delete, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};
/**保存
 * @param params
 */
export const saveDictApi = (params) => {
  return defHttp.post({ url: Api.save, params }, { joinParamsToUrl: true });
};
/**
 * 创建新文件
 * @param params
 */
export const createNewFileApi = (params) => {
  return defHttp.post({ url: Api.create, params }, { joinParamsToUrl: true, errorMessageMode: 'none' });
};

/**
 * 查询文件
 * @param params
 */
export const searchFileApi = (params) => {
  return defHttp.post({ url: Api.search, params }, { joinParamsToUrl: true });
};
