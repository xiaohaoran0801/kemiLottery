<template>
    <div id="ssq">
        <table ref="table">
            <tr style="background:rgb(240, 188, 188)">
                <th>期号</th>
                <th v-for="item in 33"
                    :key="item+'0'"
                >{{item>9?item:'0'+item}}</th>
                <th v-for="item in 16"
                    :key="item+'1'"
                >{{item>9?item:'0'+item}}</th>
            </tr>
            <tr v-for="(item,index) in data" :key="index">
                <td>{{item.period}}</td>
                <td v-for="(ele,key) in item.missNumber.general"
                    :key="key"
                    :class="[key+1>33?ele>0?'':'blue':ele>0?'':'red']"
                    :ref="[key+1>33?ele>0?'':'blue':'']"
                >{{ele>0?ele:key+1>33?key+1-33:key+1}}</td>
            </tr>
        </table>
        <canvas id="canvas" ref="canvas"></canvas>
        <el-pagination
            background
            layout="prev, pager, next"
            :page-size="pageSize"
            @current-change="changeData"
            :total="100">
        </el-pagination>
    </div>
</template>
<script>
export default {
    data(){
        return{
            data:[],
            pageSize:20,
        }
    },
    methods:{
        loadData(pageNo,pageSize){
            var name = this.$route.name
            this.$http.get(this.$apis.findByGameName,{gameName:name,pageNo:pageNo,pageSize:pageSize})
            .then((resp)=>{
                resp = resp.data.data
                this.data = resp.data
                this.canvas()
            })
        },
        changeData(ev){
            this.loadData(ev,20)
        },
        canvas(){
            this.$nextTick(()=>{
                var table = this.$refs['table'];
                var canvas = this.$refs['canvas'];
                var blueBalls = this.$refs['blue'];
                console.log([table])
                canvas.width = table.clientWidth;
                canvas.height = table.clientHeight;
                canvas.style.zIndex = 1000;
                
                var ctx = canvas.getContext('2d');
                var x = blueBalls[0].offsetLeft;
                var y = blueBalls[0].offsetTop;
                var height = blueBalls[0].clientHeight;
                var width = blueBalls[0].clientWidth;
                ctx.moveTo(x+width/2,y+height/2);
                for(var i=1;i<=blueBalls.length-1;i++){
                    ctx.lineTo(blueBalls[i].offsetLeft+width/2,blueBalls[i].offsetTop+height/2);
                }
                ctx.strokeStyle = "blue";
                ctx.lineWidth = 3;
                ctx.stroke();
            })    
        }
    },
    mounted(){
        this.loadData(1,20)
    }
}
</script>
<style lang="scss" scoped>
    #ssq{
        width: 100%;
    }
    table{
        background: white;
        width: 100%;
        overflow: hidden;
        border-collapse: collapse;
        th,td{
            width: 25px;
            height: 20px;
            font-size: 12px;
            text-align: center;
            border: 1px solid #abb6c2;
        }
        th:nth-child(1){
            width: 100px;
        }
    }
    .red {
        background: url("./ball18px.png");
        background-position-y: 125px;
        color: white;
    }
    .blue {
        background: url("./ball18px.png");
        background-position-y: 323px;
        color: white;
    }
    .el-pagination{
        position: absolute;
        bottom: 15px;
        left: 20px
    }
    #canvas{
        margin: 0 auto;
        position: absolute;
        top: 55px;
        left: 15px;
    }
</style>
