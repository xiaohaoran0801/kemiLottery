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
  },
  getters:{
    allRoles(state){
      return state.allRoles
    },
    allUsers(state){
      return state.allUsers
    },
    allPermission(state){
      return state .allPermission
    }
  },
  mutations: {
    LOADALLROLE(state,payload){
      state.allRoles = payload.allRoles
    },
    LOADALLUSER(state,payload){
      state.allUsers = payload.allUsers
    },
    LOADALLPERMISSION(state,payload){
      state.allPermission = payload.allPermission
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
  }
})
