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
    gameList:[],
  },
  getters:{
    allRoles(state){
      return state.allRoles
    },
    allUsers(state){
      return state.allUsers
    }
  },
  mutations: {
    LOADALLROLE(state,payload){
      state.allRoles = payload.allRoles
    },
    LOADALLUSER(state,payload){
      state.allUsers = payload.allUsers
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
  }
})
