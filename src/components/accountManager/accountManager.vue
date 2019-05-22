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
              <el-button type="primary" size="mini" @click="update(item)">编辑</el-button>
              <el-button type="danger" size="mini" @click="deleteUser(item._id)">删除</el-button>
            </td>
            <el-dialog title="提示" :visible.sync="show" width="30%" :before-close="handleClose2">
              <div>
                <el-form
                  label-width="80px"
                  :model="updateUserInfo"
                  ref="updateUserInfo"
                  :rules="rules"
                >
                  <el-form-item label="用户名" prop="username">
                    <el-input v-model="updateUserInfo.username"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="updateUserInfo.password"></el-input>
                  </el-form-item>
                  <el-form-item label="用户角色">
                    <template>
                      <el-checkbox-group v-model="updateUserInfo.roles">
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
      <addNewUser/>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import addNewUser from "./addNewUser";
export default {
  components: { addNewUser },
  data() {
    return {
      show: false,
      updateUserInfo: {
        roles: []
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "密码长度应为6~12个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["allUsers", "allRoles"])
  },
  methods: {
    update(item) {
      this.userInfo = item;
      this.show = !this.show;
    },
    handleClose2() {
      this.show = !this.show;
    },
    deleteUser(id) {
      var action = () => {
        this.post(this.$apis.deleteUser, { _id: id }).then(() => {
          this.$store.dispatch("loadAllUser");
        });
      };
      this.operatorConfirm("删除用户", action);
    },
    updateUser() {
      var rs = this.$refs["updateUserInfo"]
      rs[1].validate(valid => {
        if (valid) {
          this.handleClose2();
          this.post(this.$apis.updateUserInfo, this.updateUserInfo).then(() => {
            this.updateUserInfo = {};
            this.$store.dispatch("loadAllUser");
          });
        } else {
          return false;
        }
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