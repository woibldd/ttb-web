import Vue from 'vue'
import Vuex from 'vuex'
import { getShareAccountList } from '@/api/share_option'
import { loginout } from '@/api/user'
import api from '@/modules/service'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    locale: 'zh-CN',
    userData: null,
    mapShareAccount: [],
    activeShareAccount: null
  },
  mutations: {
    CHANGE_LANG: (state, lang) => {
      state.locale = lang
    },
    SET_USERDATA: (state, userData) => {
      state.userData = userData
    },
    SET_MAPSHAREACCOUNT: (state, mapShareAccount) => {
      state.mapShareAccount = mapShareAccount
    },
    SET_ACTIVESHAREACCOUNT(state, activeShareAccount) {
      state.activeShareAccount = activeShareAccount
    }
  },
  actions: {
    async getShareAccountList({ commit, state }, { accountArr=[], isAssignment }={}) {
      if (!state.userData) return
      const currenyArr = accountArr.map(item => item.currency).join(',')
      const res = await getShareAccountList(state.userData.id, currenyArr)
      const dataArr = res.data.map(item => {
        const found = accountArr.find(subItem => subItem.currency === item.currency)
        return { ...found, ...item }
      }).sort((a, b) => a.currency === 'DEMO' && -1 || 1)
      commit('SET_MAPSHAREACCOUNT', dataArr)
      if (!isAssignment) {
        const currency = localStorage.getItem('ACTIVESHAREACCOUNT')
        const found = dataArr.find(item => currency === item.currency)
        commit('SET_ACTIVESHAREACCOUNT', found || dataArr[0])
      } else {
        const found = dataArr.find(item => state.activeShareAccount.currency === item.currency)
        commit('SET_ACTIVESHAREACCOUNT', found)
      }
      return dataArr
    },
    async loginout() {
      await loginout()
      await api.signout()
      location.reload()
      const userAccountObj = localStorage.getItem('userAccountObj')
      localStorage.clear()
      localStorage.setItem('userAccountObj', userAccountObj)
      this.$store.commit('SET_USERDATA', null)
    }
  }
})
