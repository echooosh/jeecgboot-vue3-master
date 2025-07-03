-- 注意：该页面对应的前台目录为views/govmap文件夹下
-- 如果你想更改到其他目录，请修改sql中component字段对应的值


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external)
VALUES ('2022111712122250400', NULL, '办事事项', '/govmap/item/appItemList', 'govmap/item/AppItemList', NULL, NULL, 0, NULL, '1', 0.00, 0, NULL, 1, 1, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2022-11-17 00:12:40', NULL, NULL, 0);

-- 权限控制sql
-- 新增
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022111712122250401', '2022111712122250400', '添加办事事项', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:app_item:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-11-17 00:12:40', NULL, NULL, 0, 0, '1', 0);
-- 编辑
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022111712122250402', '2022111712122250400', '编辑办事事项', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:app_item:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-11-17 00:12:40', NULL, NULL, 0, 0, '1', 0);
-- 删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022111712122250403', '2022111712122250400', '删除办事事项', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:app_item:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-11-17 00:12:40', NULL, NULL, 0, 0, '1', 0);
-- 批量删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022111712122250404', '2022111712122250400', '批量删除办事事项', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:app_item:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-11-17 00:12:40', NULL, NULL, 0, 0, '1', 0);
-- 导出excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022111712122250405', '2022111712122250400', '导出excel_办事事项', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:app_item:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-11-17 00:12:40', NULL, NULL, 0, 0, '1', 0);
-- 导入excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022111712122250406', '2022111712122250400', '导入excel_办事事项', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:app_item:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-11-17 00:12:40', NULL, NULL, 0, 0, '1', 0);
