<template>
  <div id="accountManage">
    <div id="allUsers">
      <template>
        <table>
          <tr>
            <th>账号名</th>
            <th>角色列表</th>
            <th>操作</th>
          </tr>
          <tr v-for="(item,index) in allUsers" :key="index">
            <td>{{item.username}}</td>
            <td v-for="(ele,key) in item.roles" :key="key">
              <span>{{ele}}</span>
            </td>
            <td>
              <el-button type="primary" size="mini" @click="handleClose2(item)">编辑</el-button>
              <el-button type="danger" size="mini" @click="deleteUser(item._id)">删除</el-button>
            </td>
            <el-dialog
              title="提示"
              :visible.sync="show"
              width="30%"
              :before-close="handleClose2"
            >
              <div>
                <el-form label-width="80px" :model="userInfo">
                  <el-form-item label="用户名">
                    <el-input v-model="updataUserInfo.username"></el-input>
                  </el-form-item>
                  <el-form-item label="密码">
                    <el-input type="passwprd" v-model="updataUserInfo.password"></el-input>
                  </el-form-item>
                  <el-form-item label="用户角色">
                    <template>
                      <el-checkbox-group v-model="updataUserInfo.roles">
                        <el-checkbox
                          v-for="(item,index) in allRoles"
                          :key="index"
                          :label="item.roleName"
                        ></el-checkbox>
                      </el-checkbox-group>
                    </template>
                  </el-form-item>
                </el-form>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="show = false">取 消</el-button>
                <el-button type="primary" @click="updateUser">确 定</el-button>
              </span>
            </el-dialog>
          </tr>
        </table>
      </template>
      <div class="addBTN">
        <el-button type="primary" size="mini" @click="handleClose">
          <i class="el-icon-plus"></i>
          新增用户
        </el-button>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
          <div>
            <el-form label-width="80px" :model="userInfo">
              <el-form-item label="用户名">
                <el-input v-model="userInfo.username"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input type="passwprd" v-model="userInfo.password"></el-input>
              </el-form-item>
              <el-form-item label="用户角色">
                <template>
                  <el-checkbox-group v-model="userInfo.roles">
                    <el-checkbox
                      v-for="(item,index) in allRoles"
                      :key="index"
                      :label="item.roleName"
                    ></el-checkbox>
                  </el-checkbox-group>
                </template>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addNewUser">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
        show:false,
        userInfo: {
            roles: []
        },
        updataUserInfo:{
            roles:[]
        }
    };
  },
  computed: {
    ...mapGetters(["allUsers", "allRoles"])
  },
  methods: {
    handleClose() {
      this.dialogVisible = !this.dialogVisible;
    },
    handleClose2(item){
        this.show = !this.show
        this.userInfo = item
    },
    deleteUser(id) {
      var action = () => {
        this.post(this.$apis.deleteUser, { _id: id }).then(() => {
          this.$store.dispatch("loadAllUser");
        });
      };
      this.operatorConfirm("删除用户", action);
    },
    addNewUser() {
      this.handleClose();
      this.post(this.$apis.addNewUser, this.userInfo).then(() => {
        this.userInfo = {};
        this.$store.dispatch("loadAllUser");
      });
    },
    updateUser(){
        this.handleClose2();
        this.post(this.$apis.updateUser, this.userInfo).then(() => {
            this.userInfo = {};
            this.$store.dispatch("loadAllUser");
      });
    }
  },
  mounted() {
    this.$store.dispatch("loadAllUser");
    this.$store.dispatch("loadAllRole");
  }
};
</script>
<style lang="scss" scoped>
#accountManage {
  width: 100%;
  height: 100%;
}
#allUsers {
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