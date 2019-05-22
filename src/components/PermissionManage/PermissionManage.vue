<template>
    <div id="PermissionManage">
        <template>
            <el-tabs tab-position="left" style="height: 200px;background:white;border-radius: 5px">
                <el-tab-pane :label="item.permissionDesc"
                v-for="(item,index) in allPermission"
                :key='index'
                >
                    <ul>
                        <li v-for="(ele,key) in item.children"
                            :key="key"
                        >
                            {{ele.permissionDesc}}
                            <el-button type="danger" @click="deletePermission(ele)">删除</el-button>
                        </li>
                    </ul>
                </el-tab-pane>
            </el-tabs>
        </template>
        <div id="addBTN">
            <el-button type="primary" @click="handleClose">
                <i class="el-icon-plus"></i>
                新增
            </el-button>
        </div>
        <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
            <el-form label-width="80px" 
            :model="permissionInfo" 
            ref="permissionInfo" 
            :rules="rules">
                <el-form-item label="权限名称" prop="permissionName">
                    <el-input v-model="permissionInfo.permissionName"></el-input>
                </el-form-item>
                <el-form-item label="权限描述" prop="permissionDesc">
                    <el-input v-model="permissionInfo.permissionDesc"></el-input>
                </el-form-item>
                <el-form-item label="权限等级" prop="permissionLeve">
                    <el-input v-model="permissionInfo.permissionLeve" type="number"></el-input>
                </el-form-item>
                <el-form-item label="父级权限" prop="parentid">
                    <el-input v-model="permissionInfo.parentid" type="number"></el-input>
                </el-form-item>
                <el-form-item label="排列序号" prop="sortNum">
                    <el-input v-model="permissionInfo.sortNum" type="number"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addNewPermission">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    data(){
        return{
            activeNames:[],
            data:[],
            permissionInfo:{
                parentid:0,
                sortNum:0,
                permissionLeve:1,
            },
            rules:{
                permissionName:[
                    {required:true,message:"权限名称不能为空",trigger:'blur'}
                ],
                permissionDesc:[
                    {required:true,message:"权限描述不能为空",trigger:'blur'}
                ],
                parentid:[
                    {required:true,message:"父级权限不能为空",trigger:'blur'}
                ],
                sortNum:[
                    {required:true,message:"排列序号不能为空",trigger:'blur'}
                ],
                permissionLeve:[
                    {required:true,message:"权限等级不能为空",trigger:'blur'},
                ]
            }
        }
    },
    computed:{
        ...mapGetters(['allPermission'])
    },
    methods:{
        handleChange(ev){
            for(var i=0;i<ev.length;i++){
                if(ev[i]==="系统管理"){
                    this.data = this.systemList;
                }else if(ev[i]==='彩票管理'){
                    this.data = this.lotteryList;
                }else{
                    this.data = []
                }
            }
        },
        deletePermission(ele){
            // var action = ()=>{
            //     this.post(this.$apis.deletePermission,{})
            // }
        },
        handleClose(){
            this.dialogVisible = !this.dialogVisible
        },
        addNewPermission(){
            this.$refs['permissionInfo'].validate((valid) => {
                if (valid) {
                    this.post(this.$apis.addNewPersmission,this.permissionInfo)
                    .then(()=>{
                        this.permissionInfo = {}
                        this.handleClose();
                        this.$message.success('新增权限成功');
                    })
                }else{
                    return false;
                }
            });
        }
    },
    mounted(){
        this.$store.dispatch('loadAllPermission')
        // this.permissionCategory()
        console.log(this.allPermission)
    }
}
</script>
<style lang="scss" scoped>
    #PermissionManage{
        width: 100%;
        height: 100%;
        padding: 30px;
        box-sizing: border-box;
        ul{
            list-style: none;
            li{
                height: 48px;
                display: flex;
                justify-content: space-around;
                align-items: center;
            }
        }
        #addBTN{
            width: 95%;
            display: flex;
            justify-content: flex-start;
            padding: 20px;
            box-sizing: border-box;
            button{
                margin-left: 15px
            }
        }
    }
</style>
