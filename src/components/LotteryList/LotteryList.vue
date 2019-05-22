<template>
    <div id="LotteryManage">
       <template>
           <div id="lotteryList" >
                <ul>
                    <li
                        v-for="(item,index) in allGames"
                        :key="index"
                    >
                        <div class="icon">
                            <img :src="item.icon2" alt="">
                        </div>
                        <span>{{item.cn}}</span>
                    </li>
                    <li>
                        <div class="addNew">
                            <i class="el-icon-plus"></i>
                        </div>
                        <span>新增玩法</span>
                    </li>
                </ul>
           </div>
       </template>
       
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    data(){
        return{
           
        }
    },
    computed:{
        ...mapGetters(['allGames'])
    },
    methods: {
      
     
    },
    created() {
      this.$store.dispatch('loadAllGames')
      console.log(this.allGames)
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
                        width: 80px;
                        height: 80px;
                        border-radius: 50%;
                        border: 2px dashed lightgray;
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
</style>
