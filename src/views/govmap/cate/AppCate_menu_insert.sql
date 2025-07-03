-- 注意：该页面对应的前台目录为views/govmap文件夹下
-- 如果你想更改到其他目录，请修改sql中component字段对应的值


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external)
VALUES ('2022111712128660280', NULL, '事项分类', '/govmap/cate/appCateList', 'govmap/cate/AppCateList', NULL, NULL, 0, NULL, '1', 0.00, 0, NULL, 1, 1, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2022-11-17 00:12:28', NULL, NULL, 0);

-- 权限控制sql
-- 新增
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022111712128660281', '2022111712128660280', '添加事项分类', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:app_cate:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-11-17 00:12:28', NULL, NULL, 0, 0, '1', 0);
-- 编辑
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022111712128660282', '2022111712128660280', '编辑事项分类', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:app_cate:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-11-17 00:12:28', NULL, NULL, 0, 0, '1', 0);
-- 删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022111712128660283', '2022111712128660280', '删除事项分类', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:app_cate:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-11-17 00:12:28', NULL, NULL, 0, 0, '1', 0);
-- 批量删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022111712128660284', '2022111712128660280', '批量删除事项分类', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:app_cate:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-11-17 00:12:28', NULL, NULL, 0, 0, '1', 0);
-- 导出excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022111712128660285', '2022111712128660280', '导出excel_事项分类', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:app_cate:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-11-17 00:12:28', NULL, NULL, 0, 0, '1', 0);
-- 导入excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022111712128660286', '2022111712128660280', '导入excel_事项分类', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:app_cate:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-11-17 00:12:28', NULL, NULL, 0, 0, '1', 0);
