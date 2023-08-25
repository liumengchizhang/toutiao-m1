import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/until/storage'

Vue.use(Vuex)
// 设置请求头
const TOKEN_KEY = 'TOUTIAO_USER'
// 将频道编辑框存储到本地
export default new Vuex.Store({
  state: {
    user: getItem(TOKEN_KEY),
    // 新闻频道
    channelList: []
  },
  getters: {
  },
  mutations: {
    getState(state, data) {
      // 到vuex容器中，保持灵活性
      state.user = data
      // 保存到本地，保证持久性
      setItem(TOKEN_KEY, state.user)
    },
    getChannelsList(state, data) {
      state.channelList = data
    }
  },
  actions: {
  },
  modules: {
  }
})
