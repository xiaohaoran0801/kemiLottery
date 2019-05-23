<template>
    <div id="addNewGame">
        <li>
            <div class="addNew" @click="handleClose">
                <i class="el-icon-plus"></i>
            </div>
            <span>新增玩法</span>
        </li>
        <template>
           <el-dialog
                title="新增玩法"
                :visible.sync="dialogVisible"
                width="40%"
                :before-close="handleClose">
                <el-form :model="gameInfo"
                    label-width="90px"
                    ref="gameInfo"
                    :rules="rules"
                >
                    <el-form-item label="英文名" prop='en'>
                        <el-input v-model="gameInfo.en"></el-input>
                    </el-form-item>
                    <el-form-item label="中文名" prop='cn'>
                        <el-input v-model="gameInfo.cn"></el-input>
                    </el-form-item>
                    <el-form-item label="icon">
                        
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addNewGame">确 定</el-button>
                </span>
            </el-dialog>
       </template>
    </div>
</template>
<script>
export default {
    data(){
        return{
            gameInfo:{
                files:[]
            },
            rules:{
               en:[
                   {required:true,message:'彩票英文名不能为空',trigger:'blur'}
               ],
               cn:[
                   {required:true,message:'彩票英文名不能为空',trigger:'blur'}
               ]
           }
        }
    },
    methods: {
        handleClose(){
            this.dialogVisible = !this.dialogVisible
        },
        addNewGame(){
            this.post(this.$apis.addNewGame,this.gameInfo).then(()=>{
                
            })
        },

    },
}
</script>
<style lang="scss" scoped>

</style>
