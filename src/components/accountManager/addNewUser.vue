<template>
  <div id="addBTN">
    <el-button type="primary" size="mini" @click="handleClose">
      <i class="el-icon-plus"></i>
      新增用户
    </el-button>
    <el-dialog title="提示" 
    :visible.sync="dialogVisible" 
    width="30%" 
    :before-close="handleClose">
      <div>
        <el-form label-width="80px" :model="userInfo" ref="userInfo" :rules="rules">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="userInfo.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="userInfo.password"></el-input>
          </el-form-item>
          <el-form-item label="用户角色">
            <template>
              <el-checkbox-group v-model="userInfo.roles">
                <el-checkbox v-for="(item,index) in allRoles" :key="index" :label="item.roleName"></el-checkbox>
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
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    data(){
        return{
            userInfo: {
                roles: []
            },
            rules:{
                username:[
                    {required:true,message:'用户名不能为空',trigger:'blur'},
                ],
                password:[
                    {required:true,message:'密码不能为空',trigger:'blur'},
                    {min:6,max:12,message:'密码长度应为6~12个字符',trigger:'blur'},
                ],
            }
        }
    },
    computed:{
        ...mapGetters(['allRoles'])
    },
    methods:{
        handleClose() {
            this.dialogVisible = !this.dialogVisible;
        },
        addNewUser() {
            this.$refs['userInfo'].validate((valid)=>{
                if(valid){
                    this.handleClose();
                    this.post(this.$apis.addNewUser, this.userInfo).then(()=>{
                        this.userInfo = {};
                        this.$store.dispatch("loadAllUser");
                    });
                }else{
                    return false
                }
            })
        },
    },
    mounted() {
        this.$store.dispatch("loadAllRole");
    },
}
</script>
<style lang="scss" scoped>
#addBTN {
  width: 95%;
  padding: 30px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
}
</style>


