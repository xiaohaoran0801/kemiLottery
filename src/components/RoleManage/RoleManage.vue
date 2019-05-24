<template>
  <div id="RoleManage">
    <div id="allRoles">
      <div id="roleList">
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
              <el-button type="primary" size="mini" @click="update(item)">编辑</el-button>
              <el-button type="danger" size="mini" @click="deleteRole(item._id)">删除</el-button>
            </td>
            <el-dialog title="提示" :visible.sync="show" width="30%" :before-close="handleClose2">
              <div>
                <el-form label-width="80px" 
                  :model="newRoleInfo" 
                  ref="newRoleInfo"
                  :rules="rules">
                  <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="newRoleInfo.roleName"></el-input>
                  </el-form-item>
                  <el-form-item label="角色权限">
                    <el-tree
                      :props="props2"
                      :load="loadNode2"
                      lazy
                      show-checkbox
                      ref="two"
                      default-expand-all
                    ></el-tree>
                  </el-form-item>
                </el-form>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose2">取 消</el-button>
                <el-button type="primary" @click="updateRoleInfo">确 定</el-button>
              </span>
            </el-dialog>
          </tr>
        </table>
      </div>
      <addNewRole/>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import addNewRole from "./addNewRole";
export default {
  components: { addNewRole },
  data() {
    return {
      permissions: [],
      show: false,
      newRoleInfo: {},
      props2: {
        label: "name",
        children: ""
      },
      rules: {
        roleName: [
          { required: true, message: "角色名称不能为空", trigger: "blur" }
        ],
      }
    };
  },
  computed: {
    ...mapGetters(["allRoles", "allPermission"])
  },
  methods: {
    updateRoleInfo() {
      var rs = this.$refs["newRoleInfo"]
      rs[0].validate(valid => {
        if (valid) {
          var result = this.$refs.two[0]
          var nameArr = result.getCheckedNodes();
          for (let i = 0; i < nameArr.length; i++) {
            var name = nameArr[i].name;
            for (let j = 0; j < this.allPermission.length; j++) {
              if (this.allPermission[j].permissionDesc === name) {
                this.permissions.push(this.allPermission[j]);
              }
            }
          }
          this.newRoleInfo.permissions = this.permissions;
          this.handleClose2();
          this.post(this.$apis.updateRoleInfo, this.newRoleInfo).then(() => {
            this.permissions = [];
            this.$message.success("更新角色信息成功")
            this.$store.dispatch("loadAllRole");
          });
        } else {
          return false;
        }
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
    update(item){
      this.newRoleInfo = item;
      this.show = !this.show;
    },
    handleClose2() {
      this.show = !this.show;
    },
    loadNode2(node, resolve) {
      if (node.level === 0) {
        let listOne = [];
        for (let i = 0; i < this.allPermission.length; i++) {
          let obj = new Object();
          let name = this.allPermission[i].permissionDesc;
          obj.name = name;
          listOne.push(obj);
        }
        this.tempList = listOne;
        return resolve(listOne);
      }
      if (node.level > 3) return resolve([]);
      var hasChild;
      var secondChild;
      if (node.data.name === "系统管理") {
        hasChild = true;
      } else if (node.data.name === "彩票管理") {
        secondChild = true;
      } else {
        hasChild = false;
      }
      setTimeout(() => {
        var data;
        var listOne = this.tempList;
        let listTwo = [];
        let listThree = [];
        var systemList = this.allPermission[0].children;
        var lotteryList = this.allPermission[1].children;
        for (let i = 0; i < listOne.length; i++) {
          if (listOne[i].name === "系统管理") {
            for (var j = 0; j < systemList.length; j++) {
              let obj1 = new Object();
              obj1.name = systemList[j].permissionDesc;
              listTwo.push(obj1);
            }
          } else if (listOne[i].name === "彩票管理") {
            for (var k = 0; k < lotteryList.length; k++) {
              let obj2 = new Object();
              obj2.name = lotteryList[k].permissionDesc;
              listThree.push(obj2);
            }
          }
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
    this.$store.dispatch("loadAllPermission");
  }
};
</script>
<style lang="scss" scoped>
#RoleManage {
  width: 100%;
}
#allRoles {
  width: 100%;
  padding: 50px 0;
  box-sizing: border-box;
}
#roleList{
  background: #fff;
  border-radius: 5px;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto;
  text-align: center;
  tr {
    height: 50px;
  }
  td,
  th {
    border-bottom: 1px solid #cad9ea;
    color: #666;
    height: 30px;
  }
}
</style>
