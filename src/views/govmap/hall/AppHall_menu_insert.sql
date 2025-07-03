-- 注意：该页面对应的前台目录为views/govmap文件夹下
-- 如果你想更改到其他目录，请修改sql中component字段对应的值


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external)
VALUES ('2022111712125310470', NULL, '办事大厅', '/govmap/hall/appHallList', 'govmap/hall/AppHallList', NULL, NULL, 0, NULL, '1', 0.00, 0, NULL, 1, 1, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2022-11-17 00:12:47', NULL, NULL, 0);

-- 权限控制sql
-- 新增
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022111712125310471', '2022111712125310470', '添加办事大厅', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:app_hall:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-11-17 00:12:47', NULL, NULL, 0, 0, '1', 0);
-- 编辑
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022111712125310472', '2022111712125310470', '编辑办事大厅', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:app_hall:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-11-17 00:12:47', NULL, NULL, 0, 0, '1', 0);
-- 删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022111712125310473', '2022111712125310470', '删除办事大厅', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:app_hall:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-11-17 00:12:47', NULL, NULL, 0, 0, '1', 0);
-- 批量删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022111712125310474', '2022111712125310470', '批量删除办事大厅', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:app_hall:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-11-17 00:12:47', NULL, NULL, 0, 0, '1', 0);
-- 导出excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022111712125310475', '2022111712125310470', '导出excel_办事大厅', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:app_hall:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-11-17 00:12:47', NULL, NULL, 0, 0, '1', 0);
-- 导入excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022111712125310476', '2022111712125310470', '导入excel_办事大厅', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:app_hall:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-11-17 00:12:47', NULL, NULL, 0, 0, '1', 0);
