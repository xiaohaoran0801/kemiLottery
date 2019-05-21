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
              <el-button type="primary" size="mini" @click="handleClose2(item)">编辑</el-button>
              <el-button type="danger" size="mini" @click="deleteRole(item._id)">删除</el-button>
            </td>
            <el-dialog
                        title="提示"
                        :visible.sync="show"
                        width="30%"
                        :before-close="handleClose2">
                        <div>
                            <el-form label-width="80px" :model="editRoleInfo">
                                <el-form-item label="角色名称">
                                    <el-input v-model="editRoleInfo.roleName"></el-input>
                                </el-form-item>
                                <el-form-item label="角色权限">
                                     <el-tree
                                    :props="props"
                                    :load="loadNode"
                                    lazy
                                    show-checkbox
                                    ref="treeTwo"
                                    default-expand-all
                                    ></el-tree>
                                </el-form-item>
                            </el-form>
                        </div>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="handleClose2">取 消</el-button>
                            <el-button type="primary" @click="editRole">确 定</el-button>
                        </span>
            </el-dialog>
          </tr>
        </table>
      </template>
      <div class="addBTN">
        <el-button type="primary" size="mini" @click="handleClose">
          <i class="el-icon-plus"></i>
          新增
        </el-button>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
          <div>
            <el-form label-width="80px" :model="roleInfo" :rules="rules" :refs="roleInfo">
              <el-form-item label="角色名称" prop="roleName">
                <el-input v-model="roleInfo.roleName"></el-input>
              </el-form-item>
              <el-form-item label="角色描述" prop="roleDesc">
                <el-input v-model="roleInfo.roleDesc"></el-input>
              </el-form-item>
              <el-form-item label="角色权限">
                <el-tree
                  :props="props"
                  :load="loadNode"
                  lazy
                  show-checkbox
                  ref="tree"
                  default-expand-all
                ></el-tree>
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
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      dialogVisible: false,
      show: false,
      allPermission: [],
      permissions:[],
      roleInfo: {},
      editRoleInfo: {},
      props: {
        label: "name",
        children: ""
      },
      rules:{
        roleName:[
            {required:true,message:"角色名称不能为空",trigger:'blur'}
        ],
        roleDesc:[
            {required:true,message:"角色描述不能为空",trigger:'blur'},
        ],
      }
    };
  },
  computed: {
    ...mapGetters(["allRoles"])
  },
  methods: {
    editRole() {
      var nameArr = this.$refs.treeTwo.getCheckedNodes();
      for (let i = 0; i < nameArr.length; i++) {
          var name = nameArr[i].name
        for(let j=0;j<this.allPermission.length;j++){
            if(this.allPermission[j].permissionDesc === name){
                this.permissions.push(this.allPermission[j])
            }
        }
      }
      this.editRoleInfo.permissions = this.permissions;
      this.post(this.$apis.updateRoleInfo, {
        id: this.editRoleInfo._id,
        permissions: this.editRoleInfo.permissions
      }).then(() => {
        this.permissions = [];
        this.$store.dispatch("loadAllRole");
      });
    },
    deleteRole(id) {
      var action = () => {
        this.post(this.$apis.deleteRole, { _id: id }).then(() => {
          this.$store.dispatch("loadAllRole");
        });
      };
      this.operatorConfirm("删除角色", action);
    },
    addNewRole() {
      var nameArr = this.$refs.tree.getCheckedNodes();
          for (let i = 0; i < nameArr.length; i++) {
              var name = nameArr[i].name
            for(let j=0;j<this.allPermission.length;j++){
                if(this.allPermission[j].permissionDesc === name){
                    this.permissions.push(this.allPermission[j])
                }
            }
      }
      this.roleInfo.permissions = this.permissions;
      this.handleClose();
          this.post(this.$apis.addNewRole, this.roleInfo).then(() => {
            this.permissions = [];
            this.$store.dispatch("loadAllRole");
          });
      this.$refs['roleInfo'].validate((valid)=>{
        if(valid){
          
        }else{
           console.log("验证失败")
        }
      })
    },
    handleClose() {
      this.dialogVisible = !this.dialogVisible;
    },
    handleClose2(item){
        this.editRoleInfo = item;
        this.show = !this.show;
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        let listOne = [];
        for (let i = 0; i < this.oneList.length; i++) {
          let obj = new Object();
          let name = this.oneList[i].permissionDesc;
          obj.name = name;
          listOne.push(obj);
        }
        return resolve(listOne);
      }
      if (node.level > 3) return resolve([]);

      var hasChild;
      var secondChild;
      if (node.data.name === "系统管理") {
        hasChild = true;
        secondChild = false;
      } else if (node.data.name === "彩票管理") {
        secondChild = true;
      } else {
        hasChild = false;
      }
      setTimeout(() => {
        var data;
        let listTwo = [];
        for (let i = 0; i < this.systemList.length; i++) {
          let obj = new Object();
          let name = this.systemList[i].permissionDesc;
          obj.name = name;
          listTwo.push(obj);
        }
        let listThree = [];
        for (let j = 0; j < this.lotteryList.length; j++) {
          let obj = new Object();
          let name = this.lotteryList[j].permissionDesc;
          obj.name = name;
          listThree.push(obj);
        }
        if (hasChild) {
          data = listTwo;
        } else if (secondChild) {
          data = listThree;
        } else {
          data = [];
        }

        resolve(data);
      }, 500);
    }
  },
  mounted() {
    this.$store.dispatch("loadAllRole");
    this.$http.get(this.$apis.showAllPermission).then(resp => {
      resp = resp.data;
      this.allPermission = resp.allPermission;
      var permissions = this.allPermission;
      this.permissionCategory()
    });
  }
};
</script>
<style lang="scss" scoped>
#RoleManage {
  width: 100%;
  height: 100%;
}
#allRoles {
  width: 100%;
  padding: 50px 0;
  box-sizing: border-box;
}
.addBTN {
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
  tr {
    height: 50px;
  }
  td,
  th {
    border: 1px solid #cad9ea;
    color: #666;
    height: 30px;
  }
}
</style>
