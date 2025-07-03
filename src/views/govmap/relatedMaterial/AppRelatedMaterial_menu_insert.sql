-- 注意：该页面对应的前台目录为views/govmap文件夹下
-- 如果你想更改到其他目录，请修改sql中component字段对应的值


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external) 
VALUES ('2022120505299250570', NULL, '相关材料', '/govmap/appRelatedMaterialList', 'govmap/AppRelatedMaterialList', NULL, NULL, 0, NULL, '1', 0.00, 0, NULL, 1, 1, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2022-12-05 17:29:57', NULL, NULL, 0);

-- 权限控制sql
-- 新增
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022120505299260571', '2022120505299250570', '添加相关材料', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:app_related_material:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-12-05 17:29:57', NULL, NULL, 0, 0, '1', 0);
-- 编辑
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022120505299260572', '2022120505299250570', '编辑相关材料', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:app_related_material:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-12-05 17:29:57', NULL, NULL, 0, 0, '1', 0);
-- 删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022120505299260573', '2022120505299250570', '删除相关材料', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:app_related_material:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-12-05 17:29:57', NULL, NULL, 0, 0, '1', 0);
-- 批量删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022120505299260574', '2022120505299250570', '批量删除相关材料', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:app_related_material:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-12-05 17:29:57', NULL, NULL, 0, 0, '1', 0);
-- 导出excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022120505299260575', '2022120505299250570', '导出excel_相关材料', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:app_related_material:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-12-05 17:29:57', NULL, NULL, 0, 0, '1', 0);
-- 导入excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2022120505299260576', '2022120505299250570', '导入excel_相关材料', NULL, NULL, 0, NULL, NULL, 2, 'org.jeecg.modules.demo:app_related_material:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2022-12-05 17:29:57', NULL, NULL, 0, 0, '1', 0);