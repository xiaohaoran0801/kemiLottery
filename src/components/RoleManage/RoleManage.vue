<template>
  <div id="RoleManage">
      <div id="allRoles">
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
                        <el-button type="primary" size="mini" @click="handleClose2(item)">编辑角色</el-button>
                        <el-button type="danger" size="mini" @click="deleteRole(item._id)">删除角色</el-button>
                    </td>
                    <!-- <el-dialog
                        title="提示"
                        :visible.sync="show"
                        width="30%"
                        :before-close="handleClose2">
                        <div>
                            <el-form label-width="80px" :model="editRoleInfo">
                                <el-form-item label="角色权限">
                                    <template>
                                        <el-checkbox 
                                            v-model="checkedAll" 
                                            @change="handleCheckAllChange">
                                            全选
                                        </el-checkbox>
                                        <div style="margin: 15px 0;"></div>
                                        <el-checkbox-group v-model="permissions" 
                                        @change="handleCheckedPermissionChange">
                                            <el-checkbox v-for="(item,index) in allPermission" 
                                                :label="item.permissionDesc" :key="index">
                                                {{item.permissionDesc}}
                                            </el-checkbox>
                                        </el-checkbox-group>
                                    </template>
                                </el-form-item>
                            </el-form>
                        </div>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="handleClose2">取 消</el-button>
                            <el-button type="primary" @click="editRole">确 定</el-button>
                        </span>
                    </el-dialog> -->
                </tr>
            </table>
        </template>
        <div id="addBTN">
            <el-button type='primary' size='mini' @click="handleClose">
              <i class="el-icon-plus"></i>
              新增用户
            </el-button>
            <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
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
                                <el-checkbox 
                                    v-model="checkedAll" 
                                    @change="handleCheckAllChange">
                                    全选
                                </el-checkbox>
                                <div style="margin: 15px 0;"></div>
                                <el-checkbox-group v-model="permissions" 
                                @change="handleCheckedPermissionChange">
                                    <el-checkbox v-for="(item,index) in allPermission" 
                                        :label="item.permissionDesc" :key="index">
                                        {{item.permissionDesc}}
                                    </el-checkbox>
                                </el-checkbox-group>
                            </template>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addNewRole">确 定</el-button>
                </span>
            </el-dialog>
        </div>
      </div>
  </div>
</template>
<script>
import {mapGetters} from "vuex";
export default {
  data() {
    return {
      dialogVisible:false,
      show:false,
      checkedAll:false,
      allPermission: [],
      permissions:[], 
      roleInfo:{},
      editRoleInfo:{},
    };
  },
    computed:{
        ...mapGetters(['allRoles'])
    },
  methods:{
      editRole(){
          this.handleClose2();
          this.post(this.$apis.updateRoleInfo,{_id:this.editRoleInfo._id,permissions:this.editRoleInfo.permissions})
          .then(()=>{
             this.$store.dispatch('loadAllRole')
          })
      },
      deleteRole(id){
          var action = ()=>{
              this.post(this.$apis.deleteRole,{_id:id})
              .then(()=>{
                  this.$store.dispatch('loadAllRole')
              })
          }
          this.operatorConfirm("删除角色",action)
      },
      addNewRole(){
          this.roleInfo = {}
          this.handleClose();
          this.post(this.$apis.addNewRole,this.roleInfo)
          .then(()=>{
             this.$store.dispatch('loadAllRole')
          })
      },
      handleClose(){
          this.dialogVisible = !this.dialogVisible
      },
      handleClose2(item){
          this.editRoleInfo = item
          console.log(this.editRoleInfo)
          this.show = !this.show
      },
        handleCheckAllChange(){
            if(this.checkedAll){
                this.roleInfo.permissions = this.editRoleInfo.permissions =this.allPermission;
                this.permissions = true;
            }else{
                this.permissions = [];
                this.roleInfo.permissions = this.editRoleInfo.permissions  = [];
            }
        },
        handleCheckedPermissionChange(value){
            let checkedCount = value.length;
            this.roleInfo.permissions = this.editRoleInfo.permissions = this.permissions;
            if(this.allPermission.length==checkedCount){
                this.checkedAll = true;
            }else{
                this.checkedAll = false;
            }
        }
  },
  mounted() {
    this.$store.dispatch('loadAllRole')
    this.$http.get(this.$apis.showAllPermission).then(resp => {
        resp = resp.data;
        for(let i=0;i<resp.allPermission.length;i++){
            if(resp.allPermission[i].sortNum===0){
                this.allPermission.push(resp.allPermission[i])
            }
        }
    });
  }
};
</script>
<style lang="scss" scoped>
    #RoleManage{
        width: 100%;
        height: 100%;
    }
    #allRoles{
        width: 100%;
        padding: 50px 0;
        box-sizing: border-box;
    }
    #addBTN{
        width: 95%;
        padding: 30px;
        box-sizing: border-box;
        display: flex;
        justify-content: flex-end;
    }
    table {
        width: 90%;
        border-collapse: collapse;
        margin: 0 auto;
        text-align: center;
        background: white;
        tr{
            height: 50px;
        }
        td,th {
            border: 1px solid #cad9ea;
            color: #666;
            height: 30px;
        }
    }
</style>
