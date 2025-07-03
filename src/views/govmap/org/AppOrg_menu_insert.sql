-- 注意：该页面对应的前台目录为views/govmap文件夹下
-- 如果你想更改到其他目录，请修改sql中component字段对应的值


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external)
VALUES ('202211171212110200', NULL, '办事机构', '/govmap/org/appOrgList', 'govmap/org/AppOrgList', NULL, NULL, 0, NULL, '1', 0.00, 0, NULL, 1, 1, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2022-11-17 00:12:20', NULL, NULL, 0);

-- 权限控制sql
-- 新增
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('202211171212120201', '202211171212110200', '添加办事机构', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:app_org:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-11-17 00:12:20', NULL, NULL, 0, 0, '1', 0);
-- 编辑
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('202211171212120202', '202211171212110200', '编辑办事机构', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:app_org:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-11-17 00:12:20', NULL, NULL, 0, 0, '1', 0);
-- 删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('202211171212120203', '202211171212110200', '删除办事机构', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:app_org:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-11-17 00:12:20', NULL, NULL, 0, 0, '1', 0);
-- 批量删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('202211171212120204', '202211171212110200', '批量删除办事机构', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:app_org:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-11-17 00:12:20', NULL, NULL, 0, 0, '1', 0);
-- 导出excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('202211171212120205', '202211171212110200', '导出excel_办事机构', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:app_org:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-11-17 00:12:20', NULL, NULL, 0, 0, '1', 0);
-- 导入excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('202211171212120206', '202211171212110200', '导入excel_办事机构', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:app_org:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-11-17 00:12:20', NULL, NULL, 0, 0, '1', 0);
