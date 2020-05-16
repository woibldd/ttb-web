import App from './App'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import theme from '@/modules/dynamic-theme'
import { actions } from '@/modules/store'
import eventHub from '@/modules/eventHub'
import router from './router'
import utils from '@/modules/utils' 
import Icon from '@/components/Icon'

Vue.component('icon', Icon)
Vue.use(VueI18n)
theme.set()

utils.$i18n = new VueI18n({
  fallbackLocale: 'en',
  locale: 'en',
  silentTranslationWarn: true, // process.env.NODE_ENV === 'production',
  // messages: {
  //   en: actions.replaceName(en)
  // }
})

// svg
const request = require.context('./icon', true, /\.svg$/)
request.keys().forEach(request)
actions.setLocale()

Vue.prototype.$eh = eventHub

new Vue({
  el: '#app',
  router,
  i18n: utils.$i18n,
  components: { App },
  template: '<App/>'
})
