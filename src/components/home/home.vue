<template>
  <div id="home">
    <div id="leftBar">
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
                                @click="pushView(ele)"
                            >{{ele.permissionDesc}}</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-col>
        </div>
    </div>
    <div id="rightContent">
        <div id="topBar">
            <el-button type="danger" @click="logout">注销</el-button>
        </div>
        <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        data:[],
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ name: "login" });
    },
    handleOpen(key, keyPath) {
        
    },
    handleClose(key,keyPath){
    
    }
  },
  created() {
      var permissions = permissions || this.response.permissions;
        var length = permissions.length
        for(let i=0;i<length;i++){
            var parentId = permissions[i].parentid
            if(parentId===0){
                permissions[i].children = [];
                this.list.push(permissions[i]);
            }else{
                for(var j=0;j<this.list.length;j++){
                    var id = this.list[j]._id
                    if(parentId === id){
                        this.list[j].children.push(permissions[i])
                    }
                }
            }
        }
  }
};
</script>
<style lang="scss" scoped>
    #home {
        width: 100%;
        height: 100%;
        background: url('../../assets/bg.jpg') no-repeat;
        background-size: over;
    }
    #topBar {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 20px;
        box-sizing: border-box;
    }
    #leftBar {
        width: 20%;
        min-width: 260px;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        background: rgb(53, 54, 54);
    }
    #rightContent{
        width: 80%;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 270px;
        padding: 30px;
        box-sizing: border-box;
    }
    .content{
        width: 100%;
        padding-top: 30px;
        box-sizing: border-box;
        #leftNav{
            width: 100%;
        }
    }
</style>
