import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/utils/myaxios'
import apis from '@/apis/apis'

Vue.use(Vuex)
const loadAction = (commit,payload,mutationName)=>{
  axios.get(payload.api,{pageNo:payload.pageNo,pageSize:payload.pageSize})
  .then((resp)=>{
    resp = resp.data;
    commit(mutationName,resp)
  })
}
export default new Vuex.Store({
  state: {
    allRoles:[],
    allUsers:[],
    allPermission:[],
    allGames:[]
  },
  getters:{
    allRoles(state){
      return state.allRoles
    },
    allUsers(state){
      return state.allUsers
    },
    allPermission(state){
      return state.allPermission
    },
    allGames(state){
      return state.allGames
    },
  },
  mutations: {
    LOADALLROLE(state,payload){
      state.allRoles = payload.allRoles
    },
    LOADALLUSER(state,payload){
      state.allUsers = payload.allUsers
    },
    LOADALLPERMISSION(state,payload){
      var permissions = payload.allPermission
      var length = permissions.length
      var list = [];
      for(let i=0;i<length;i++){
          var parentId = permissions[i].parentid
          if(parentId===0){
              permissions[i].children = [];
              list.push(permissions[i]);
          }else{
              for(var j=0;j<list.length;j++){
                  var id = list[j]._id
                  if(parentId === id){
                      list[j].children.push(permissions[i])
                  }
              }
          }
      }
      payload.list = list
      state.allPermission = payload.list
    },
    LOADALLGAMES(state,payload){
      var games = payload.data[0].games
      state.allGames = games
    },
  },
  actions: {
    loadAllRole({commit},payload={}){
        payload.api = apis.findAllRoles
      loadAction(commit,payload,'LOADALLROLE')
    },
    loadAllUser({commit},payload={}){
        payload.api = apis.findAllUsers
      loadAction(commit,payload,'LOADALLUSER')
    },
    loadAllPermission({commit},payload={}){
        payload.api = apis.showAllPermission
      loadAction(commit,payload,'LOADALLPERMISSION')
    },
    loadAllGames({commit},payload={}){
        payload.api = apis.findAllGames
      loadAction(commit,payload,'LOADALLGAMES')
    },
  }
})
