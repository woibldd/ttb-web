import App from './App'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import theme from '@/modules/dynamic-theme'
import { actions } from '@/modules/store'
import eventHub from '@/modules/eventHub'
import router from './router'
import utils from '@/modules/utils'
import en from '@/libs/languages/zh-CN.json'
import VLoading from '@/components/VLoading'

Vue.use(VueI18n)
theme.set()

utils.$i18n = new VueI18n({
  fallbackLocale: 'zh-CN',
  locale: 'zh-CN',
  silentTranslationWarn: true, // process.env.NODE_ENV === 'production',
  messages: {
    'zh-CN': actions.replaceName(en)
  }
})

// 设置默认语言中文
utils.setCookie('lang', 'zh-CN', 1000)
Vue.prototype.$eh = eventHub
Vue.component('v-loading', VLoading)

new Vue({
  el: '#app',
  router,
  i18n: utils.$i18n,
  components: { App },
  template: '<App/>'
})
