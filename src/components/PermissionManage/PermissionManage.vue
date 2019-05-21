<template>
    <div id="PermissionManage">
         <el-collapse v-model="activeNames" @change="handleChange" id="navBar">
            <el-collapse-item v-for="(item,index) in oneList"
            :title="item.permissionDesc"
            :key="index"
            :name="item.permissionDesc"
            >
            <ul>
                <li v-for="(ele,key) in data"
                    :key="key"
                >
                <span>{{ele.permissionDesc}}</span>
                <el-button type="danger">删除</el-button>
                </li>
            </ul>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script>
export default {
    data(){
        return{
            activeNames:[],
            data:[],
        }
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
    },
    mounted(){
        this.permissionCategory()
    }
}
</script>
<style lang="scss" scoped>
    #PermissionManage{
        width: 100%;
        height: 100%;
        padding: 30px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        .el-collapse{
            width: 90%;
            ul{
                list-style: none;
                li{
                    height: 48px;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                }
            }
        }
    }
</style>
