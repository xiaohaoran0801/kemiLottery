import Vue from "vue"
Vue.mixin({
    methods:{
        pushView(item){
            var name = item.permissionName
            this.$router.push({name:name})
        }
    }
})