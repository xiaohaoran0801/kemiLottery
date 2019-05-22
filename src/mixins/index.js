import Vue from "vue"
Vue.mixin({
    data(){
        return{
            response: JSON.parse(localStorage.getItem("response")),
            list:[],      
            dialogVisible:false, 
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
            var permissions = this.response.permissions
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
    }
})