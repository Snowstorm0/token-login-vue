import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    username: '代码的路'
  },
  getters: {
  },
  mutations: {
    setUserId(state, userId){
      state.userId = userId;
      localStorage.setItem("userId",userId);  //存储userId
    },
    setToken(state, token){
      state.token = token;
      localStorage.setItem("token",token);  //存储token
    },
    resetState(state){
      state.userId = '';
      state.token = '';
      localStorage.clear();        //清除token
  }

  
  },
  actions: {
  },
  modules: {
  }
})


