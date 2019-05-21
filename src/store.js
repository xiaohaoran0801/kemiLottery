import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/utils/myaxios'
import apis from '@/apis/apis'

Vue.use(Vuex)
const loadAction = (commit,payload,mutationName)=>{
  console.log(payload)
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
    }
  },
  mutations: {
    LOADALLROLE(state,payload){
      state.allRoles = payload.allRoles
    },
    LOADALLUSER(state,payload){
      state.allRoles = payload.allRoles
    },
  },
  actions: {
    loadAllRole({commit},payload={}){
        payload.api = apis.findAllRoles
      loadAction(commit,payload,'LOADALLROLE')
    },
    loadAllUser({commit},payload={}){
        payload.api = apis.findAllUsers
      loadAction(commit,payload,'LOADALLROLE')
    },
  }
})
