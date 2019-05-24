<template>
  <div id="home">
    <div id="leftBar">
        <navBar />
    </div>
    <div id="rightContent">
        <div id="topBar">
            <el-button type="danger" @click="logout">注销</el-button>
        </div>
        <transition 
            mode="out-in"
            name="el-fade-in">
            <router-view></router-view>
        </transition>
    </div>
  </div>
</template>
<script>
import navBar from './navbar'
export default {
  components:{navBar}, 
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ name: "login" });
    },
  },
};
</script>
<style lang="scss" scoped>
    #home {
        width: 100%;
        height: 100%;
        background: url('../../assets/bg.jpg') no-repeat;
        background-size: 100%;
    }
    #topBar {
        width: 100%;
        height: 40px;
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
        padding: 15px;
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
