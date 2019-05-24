<template>
    <div id="LotteryManage">
       <template>
           <div id="lotteryList" >
                <ul>
                    <li
                        v-for="(item,index) in allGames"
                        :key="index"
                    >
                        <div class="icon" @click="pushView({name:item.en})">
                            <img :src="baseUrl+item.icon2" alt="">
                        </div>
                        <span>{{item.cn}}</span>
                    </li>
                    <li>
                        <div class="addNew" @click="handleClose">
                            <i class="el-icon-plus"></i>
                        </div>
                        <span>新增玩法</span>
                    </li>
                </ul>
           </div>
       </template>
       <template>
           <el-dialog
                title="新增玩法"
                :visible.sync="dialogVisible"
                width="40%"
                :before-close="handleClose">
                <el-form :model="gameInfo"
                    label-width="90px"
                    ref="gameInfo"
                    :rules="rules"
                >
                    <el-form-item label="英文名" prop='en'>
                        <el-input v-model="gameInfo.en"></el-input>
                    </el-form-item>
                    <el-form-item label="中文名" prop='cn'>
                        <el-input v-model="gameInfo.cn"></el-input>
                    </el-form-item>
                    <el-form-item label="icon">
                        <el-upload
                            class="uploadIcon"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :before-upload="beforeAvatarUpload"
                        >
                            <img v-if="iconUrl" :src="iconUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <span style="margin-left:10px">只能上传大小为40*40的图片</span>
                    </el-form-item>
                    <el-form-item label="icon2">
                        <el-upload
                            class="uploadIcon2"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :before-upload="beforeAvatarUpload2"
                        >
                            <img v-if="iconUrl2" :src="iconUrl2" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <span style="margin-left:10px">只能上传大小为90*90的图片</span>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addNewGame">确 定</el-button>
                </span>
            </el-dialog>
       </template>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
import axios from 'axios'
export default {
    data(){
        return{
            baseUrl:'http://localhost:3000',
            iconUrl:'',
            iconUrl2:'',
            success:false,
            file:[],
            gameInfo:{
            },
            rules:{
               en:[
                   {required:true,message:'彩票英文名不能为空',trigger:'blur'}
               ],
               cn:[
                   {required:true,message:'彩票英文名不能为空',trigger:'blur'}
               ]
           }
        }
    },
    computed:{
        ...mapGetters(['allGames'])
    },
    methods: {
        handleClose(){
            this.dialogVisible = !this.dialogVisible
        },
        addNewGame(){
            this.$refs['gameInfo'].validate((valid)=>{
                if(valid){
                    let formData = new FormData();
                    formData.append("cn",this.gameInfo.cn);
                    formData.append("en",this.gameInfo.en);
                    for(let i=0;i<this.file.length;i++){
                        formData.append("file",this.file[i]);
                    }
                    let config = {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                    axios.post(this.$apis.addNewGame,formData,config).then(()=>{
                        this.handleClose();
                        this.$message.success('新增玩法成功');
                        this.$store.dispatch('loadAllGames')
                    })
                }else{
                    return false
                }
            })
        },
        beforeAvatarUpload(file) {
            this.judgment(40,40,file).then((resp)=>{
                if(resp){
                    this.iconUrl = URL.createObjectURL(resp);
                    var file1 = resp
                    this.file.push(file1)
                }
            })
        },
        beforeAvatarUpload2(file){ 
            this.judgment(90,90,file).then((resp)=>{
                if(resp){
                    this.iconUrl2 = URL.createObjectURL(resp);
                    var file2 = resp
                    this.file.push(file2)
                }
            })
        },
        judgment(width,height,file){
            return new Promise(function(resolve,reject){
                let _URL = window.URL || window.webkitURL;
                let img = new Image();
                img.src = _URL.createObjectURL(file);
                img.onload = function(){
                    if(img.width== width && img.height==height){
                        resolve(file)
                    }else{
                        reject(file)
                    }
                }
                
            }).then((resp)=>{
                return resp
            },(err)=>{
                this.$message.error('上传的图片宽高必须是'+width+"*"+height+'!');
            })
        },
    },
    created() {
      this.$store.dispatch('loadAllGames')
  }
}
</script>
<style lang="scss" scoped>
    #LotteryManage{
        width: 100%;
        height: 100%;
        padding: 20px;
        box-sizing: border-box;
        #lotteryList{
            width: 100%;
            height: 130px;
            color: white;
            display: flex;
            align-items: center;
            ul{
                width: 100%;
                height: 100%;
                list-style: none;
                display: flex;
                li{
                    height: 100%;
                    margin: 0 10px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    .icon,.addNew{
                        width: 90px;
                        height: 90px;
                        border-radius: 50%;
                        border: 2px dashed lightgray;
                        overflow: hidden;
                        img{
                            width: 100%
                        }
                    }
                    .addNew{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 40px;
                    }
                }
            }
        }
    }
    #icon1{
        display: block;
        width: 40px;
        height: 40px;
        background: none;
    }
    .uploadIcon,.uploadIcon2{
        width: 40px;
        height: 40px;
        border: 1px dashed lightgray;
        display: inline-block;
        .el-upload{
            margin-right: 5px;
        }
        .avatar-uploader-icon {
            font-size: 20px;
            color: #8c939d;
            width: 40px;
            height: 40px;
            line-height: 40px;
            text-align: center;
        }
        .avatar {
            width: 40px;
            height: 40px;
            display: block;
        }
    }
    .uploadIcon2{
        width: 90px;
        height: 90px;
        .avatar-uploader-icon {
            font-size: 40px;
            color: #8c939d;
            width: 90px;
            height: 90px;
            line-height: 90px;
            text-align: center;
        }
        .avatar {
            width: 90px;
            height: 90px;
            display: block;
        }
    }
</style>
