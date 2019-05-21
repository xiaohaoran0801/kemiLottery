import Vue from "vue"
Vue.mixin({
    data(){
        return{
            response: JSON.parse(localStorage.getItem("response")),
            oneList:[],     
            systemList:[],     
            lotteryList:[],    
        }
    },
    methods: {
        pushView(item) {
            var name = item.permissionName
            this.$router.push({name:name,query:item.query,params:item.params})
        },
        post(url, params) {
            return this.$http.post(url, params)
                .then((resp) => {
                    this.$message({
                        type: resp.data.success ? "success" : "info",
                        message: resp.data.message,
                    });
                })
        },
        operatorConfirm(message, action) {
            return this.$confirm('确定' + message + '么?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                return action();
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消' + message
                });
            });
        },
        permissionCategory(){
            var permissions = permissions || this.response.permissions;
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
    }
})