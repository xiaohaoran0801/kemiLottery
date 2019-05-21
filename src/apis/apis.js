import Vue from 'vue'

var apis = {
    signin:'/signin',
    findAllRoles:'/system/role/findAllRoles',
    addNewRole:'/system/role/addNewRole',
    updateRoleInfo:'/system/role/updateRoleInfo',
    deleteRole:'/system/role/deleteRole',
    findRoleInfoById:'/system/role/findRoleInfoById',
    findAllUsers:'/system/user/findAllUsers',
    findUserInfoById:'/system/user/findUserInfoById',
    updateUserInfo:'/system/user/updateUserInfo',
    addNewUser:'/system/user/addNewUser',
    deleteUser:'/system/user/deleteUser',
    deletePermission:'/system/permission/deletePermission',
    addNewPersmission:'/system/permission/addNewPersmission',
    showAllPermission:'/system/permission/showAllPermission',
    findPermissionById:'/system/permission/findPermissionById',
    findAllGames:'/gameManage/games/findAllGames',
    addNewGame:'/gameManage/games/addNewGame',
    findByGameName:'/gameManage/games/findByGameName',
}
Vue.prototype.$apis = apis;
export default apis;