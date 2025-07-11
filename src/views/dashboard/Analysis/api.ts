import { defHttp } from '/@/utils/http/axios';

enum Api {
  loginfo = '/sys/loginfo',
  visitInfo = '/sys/visitInfo',
  noticeInfo = '/govmap/appRelatedNotice/list',
  countAll = '/govmap/appTenantPageVisit/countall',
}
/**
 * 日志统计信息
 * @param params
 */
export const getLoginfo = (params) => defHttp.get({ url: Api.loginfo, params }, { isTransformResponse: false });
/**
 * 访问量信息
 * @param params
 */
export const getVisitInfo = (params) => defHttp.get({ url: Api.visitInfo, params }, { isTransformResponse: false });

/**
 * 通知公告
 * @param params
 */
export const getNoticeInfoApi = (params) => defHttp.get({ url: Api.noticeInfo, params }, { isTransformResponse: false });

/**
 * 地图访问量信息
 * @param params
 */
export const countAllApi = (params, data = {}) =>
  defHttp.post({ url: Api.countAll + '?tenantId=' + encodeURIComponent(params), data }, { isTransformResponse: false });
