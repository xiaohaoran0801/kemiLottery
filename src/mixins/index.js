import Vue from "vue"
Vue.mixin({
    data(){
        return{
                 
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
    }
})