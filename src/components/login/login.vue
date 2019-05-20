<template>
    <div id="login"> 
       <div id="usersInfo">
            <h1>可 米 彩 票</h1>
            <el-form :model="userInfo" :rules="rules" status-icon ref="userInfo">
                <el-form-item placeholder="请输入用户名" prop="accountName" style="width:250px">
                    <el-input v-model="userInfo.accountName"></el-input>
                </el-form-item>
                <el-form-item placeholder="请输入密码" prop="password">
                    <el-input v-model="userInfo.password"></el-input>
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="login">登录</el-button>
       </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            userInfo:{},
            rules:{
                accountName:[
                    {required:true,message:"账号不能为空",trigger:'blur'}
                ],
                password:[
                    {required:true,message:"密码不能为空",trigger:'blur'},
                    {min:5,max:12,message:"密码应为5-12个字符",trigger:'blur'}
                ],
            }
        }
    },
    methods:{
        login(){
            console.log(this.$apis)
            this.$refs['userInfo'].validate((valid)=>{
                if(valid){
                    this.$http.post(this.$apis.signin,this.userInfo)
                    .then((resp)=>{
                        console.log(resp)
                        var token = resp.data.token
                        localStorage.setItem("token",token);
                        if(resp.data.success){
                            var query = this.$route.query
                            if(!query.redirect){
                                this.$router.push({path:"/home"})
                            }else{
                                this.$router.push({path:query.redirect})
                            }
                        }else{
                            this.$message.error('账号密码错误');
                        }
                    }).catch((err)=>{
                        console.log(err)
                    })
                }else{
                    console.log("验证失败")
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    #login{
        width: 100%;
        height: 100%;
        background: url('../../assets/loginBG.jpg') no-repeat;
        background-size:cover;
        #usersInfo{
            width: 20%;
            min-width: 300px;
            position: absolute;
            right: 0;
            top:0;
            bottom: 0;
            background: rgba($color: #000, $alpha: .6);
            color: #fff;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            h1{
                margin-bottom: 100px;
            }
            button{
                margin-top: 50px;
            }
        }
    }
</style>
