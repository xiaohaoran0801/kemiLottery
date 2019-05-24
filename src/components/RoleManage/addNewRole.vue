<template>
     <div id="addBTN">
        <el-button type='primary' @click="handleClose">
            <i class="el-icon-plus"></i>
            新增
        </el-button>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <template>
                <el-form label-width="80px" 
                    :model="roleInfo" 
                    :rules="rules" 
                    ref="roleInfo">
                    <el-form-item label="角色名称" prop="roleName">
                        <el-input v-model="roleInfo.roleName"></el-input>
                    </el-form-item>
                    <el-form-item label="角色描述" prop="roleDesc">
                        <el-input v-model="roleInfo.roleDesc"></el-input>
                    </el-form-item>
                    <el-form-item label="角色权限">
                        <el-tree
                        :props="props"
                        :load="loadNode"
                        lazy
                        show-checkbox
                        ref="tree"
                        default-expand-all
                        ></el-tree>
                    </el-form-item>
                </el-form>
            </template>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addNewRole">确 定</el-button>
            </span>
        </el-dialog>
      </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    data(){
        return{
            permissions: [],
            tempList:[],
            roleInfo: {},
            props:{
                label: "name",
                children: ""
            },
            rules: {
                roleName: [
                    { required: true, message: "角色名称不能为空", trigger: "blur" }
                ],
                roleDesc: [
                    { required: true, message: "角色描述不能为空", trigger: "blur" }
                ]
            }
        }
    },
    computed:{
        ...mapGetters(['allPermission'])
    },
    methods:{
        handleClose(){
            this.dialogVisible = !this.dialogVisible
        },
        addNewRole() {
            this.$refs['roleInfo'].validate((valid) => {
                if (valid) {
                    var nameArr = this.$refs.tree.getCheckedNodes();
                    for (let i = 0; i < nameArr.length; i++) {
                        var name = nameArr[i].name;
                        for (let j = 0; j < this.allPermission.length; j++) {
                            if (this.allPermission[j].permissionDesc === name) {
                                this.permissions.push(this.allPermission[j]);
                            }
                        }
                    }
                    this.roleInfo.permissions = this.permissions;
                    this.handleClose();
                    this.post(this.$apis.addNewRole, this.roleInfo)
                    .then(() => {
                        this.permissions = [];
                        this.$store.dispatch("loadAllRole");
                    });
                }else{
                    return false;
                }
            });
        },
        loadNode(node, resolve) {
            if (node.level === 0) {
                let listOne = [];
                for (let i=0; i < this.allPermission.length; i++) {
                    let obj = new Object();
                    let name = this.allPermission[i].permissionDesc;
                    obj.name = name;
                    listOne.push(obj);
                }
                this.tempList = listOne
                return resolve(listOne);
            }
            if (node.level > 3) return resolve([]);
                var hasChild;
                var secondChild;
            if (node.data.name === "系统管理") {
                hasChild = true;
            } else if (node.data.name === "彩票管理") {
                secondChild = true;
            } else {
                hasChild = false;
            }
            setTimeout(() => {    
                var data;
                var listOne = this.tempList;
                let listTwo = [];
                let listThree = [];
                var systemList = this.allPermission[0].children
                var lotteryList = this.allPermission[1].children
                for (let i = 0; i < listOne.length; i++) {
                if(listOne[i].name==="系统管理"){
                    for(var j=0;j<systemList.length;j++){
                        let obj1 = new Object();
                        obj1.name = systemList[j].permissionDesc
                        listTwo.push(obj1)
                    }
                }else if(listOne[i].name==="彩票管理"){
                    for(var k=0;k<lotteryList.length;k++){
                            let obj2 = new Object();
                            obj2.name = lotteryList[k].permissionDesc
                            listThree.push(obj2)
                        }
                    }
                }
                if (hasChild) {
                    data = listTwo;
                } else if (secondChild) {
                    data = listThree;
                } else {
                    data = [];
                }
                resolve(data);
            }, 500);
        }
    },
    mounted(){
        this.$store.dispatch("loadAllPermission");
  }
}
</script>
<style lang="scss" scoped>
    #addBTN {
        width: 95%;
        padding: 30px;
        box-sizing: border-box;
        display: flex;
        justify-content: flex-end;
    }   
</style>
