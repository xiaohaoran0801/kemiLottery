<template>
  <div id="accountManage">
    <div id="alluser">
      <template>
        <table>
          <tr>
            <th>角色名称</th>
            <th>角色描述</th>
            <th>详情</th>
            <th>操作</th>
          </tr>
          <tr v-for="(item,index) in allRoles" :key="index">
            <td>{{item.roleName}}</td>
            <td>{{item.roleDesc}}</td>
            <td></td>
            <td>
              <el-button type="primary" size="mini" >编辑角色</el-button>
              <el-button type="danger" size="mini" @click="deleteUser(item._id)">删除角色</el-button>
            </td>
          </tr>
        </table>
      </template>
      <div id="addBTN">
        <el-button type="primary" size="mini" @click="handleClose">
          <i class="el-icon-plus"></i>
          新增用户
        </el-button>
        <!-- <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
          <div>
            <el-form label-width="80px" :model="roleInfo">
              <el-form-item label="角色名称">
                <el-input v-model="roleInfo.roleName"></el-input>
              </el-form-item>
              <el-form-item label="角色描述">
                <el-input v-model="roleInfo.roleDesc"></el-input>
              </el-form-item>
              <el-form-item label="角色权限">
                <template>
                  <el-checkbox v-model="checkedAll" @change="handleCheckAllChange">全选</el-checkbox>
                  <div style="margin: 15px 0;"></div>
                  <el-checkbox-group v-model="permissions" @change="handleCheckedPermissionChange">
                    <el-checkbox
                      v-for="(item,index) in allPermission"
                      :label="item.permissionDesc"
                      :key="index"
                    >{{item.permissionDesc}}</el-checkbox>
                  </el-checkbox-group>
                </template>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addNewRole">确 定</el-button>
          </span>
        </el-dialog> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    computed:{

    },
    methods:{
        handleClose(){

        },
        deleteUser(){
            
        }
    }
};
</script>
<style lang="scss" scoped>
</style>