<template>
    <div class="content">
        <el-col id="leftNav">
            <el-menu
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#353636"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-submenu 
                v-for="(item,index) in list" 
                :index="item.permissionDesc" 
                :key="index">
                    <template slot="title">
                        <i class="el-icon-s-unfold"></i>
                        <span>{{item.permissionDesc}}</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item 
                            v-for="(ele,key) in item.children"
                            :index="ele.permissionDesc"
                            :key="key"
                            @click="pushView({name:ele.permissionName})"
                        >{{ele.permissionDesc}}</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-col>
    </div>
</template>
<script>
export default {
    methods:{
        handleOpen(key, keyPath) {
        
        },
        handleClose(key,keyPath){
        
        }
    },
    mounted(){
        var permissions = JSON.parse(localStorage.getItem('response')).permissions
        var length = permissions.length
        var list = [];
        for(let i=0;i<length;i++){
            var parentId = permissions[i].parentid
            if(parentId===0){
                permissions[i].children = [];
                list.push(permissions[i]);
            }else{
                for(var j=0;j<list.length;j++){
                    var id = list[j]._id
                    if(parentId === id){
                        list[j].children.push(permissions[i])
                    }
                }
            }
        }
        this.list = list;
    }
}
</script>
<style lang="scss" scoped>

</style>
