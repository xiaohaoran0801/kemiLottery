<template>
  <div id="home">
    <div id="topBar">
      <el-button type="danger" @click="logout">注销</el-button>
    </div>
    <div id="leftBar">
        <div class="content">
            <el-collapse v-model="activeNames" @change="handleChange" id="navBar">
                <el-collapse-item v-for="(item,index) in oneList"
                :title="item.permissionDesc"
                :key="index"
                :name="item.permissionDesc"
                >
                <ul>
                    <li v-for="(ele,key) in data"
                        :key="key"
                        @click="pushView(ele)"
                    >
                    {{ele.permissionDesc}}
                    </li>
                </ul>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
    <div id="rightContent">
        <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        response: JSON.parse(localStorage.getItem("response")),
        oneList : [],
        systemList : [],
        lotteryList : [],
        data:[],
        activeNames: []
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ name: "login" });
    },
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
  created() {
    var permissions = this.response.permissions
    var length = permissions.length
    for(let i=0;i<length;i++){
        if(permissions[i].sortNum===0){
            this.oneList.push(permissions[i])
        }else if(permissions[i].sortNum===1){
            this.systemList.push(permissions[i])
        }else if(permissions[i].sortNum===2){
            this.lotteryList.push(permissions[i])
        }
    }
    
  }
};
</script>
<style lang="scss" scoped>
    #home {
        width: 100%;
        height: 100%;
        background: url('../../assets/bg.jpg')
    }
    #topBar {
        width: 100%;
        height: 7%;
        background: url("../../assets/navBar.jpg");
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
        top: 7%;
        left: 0;
        bottom: 0;
        background: rgba($color: rgb(95, 94, 94), $alpha: .4);
    }
    #rightContent{
        width: 80%;
        position: absolute;
        top: 7%;
        right: 0;
        bottom: 0;
    }
    .content{
        width: 100%;
        color: lightgray;
        margin-top: 50px;
    }
    .el-collapse{
        opacity: .6;
    }
    ul{
        width: 100%;
        list-style: none;
        li{
            width: 100%;
            height: 40px;
        }
    }
</style>
