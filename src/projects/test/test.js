
import App from './App'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { actions } from '@/modules/store'
import eventHub from '@/modules/eventHub'
import router from './router'
import utils from '@/modules/utils'
import en from '@/libs/languages/en.json'

Vue.use(VueI18n)

utils.$i18n = new VueI18n({
  fallbackLocale: 'en',
  locale: 'en',
  silentTranslationWarn: true, // process.env.NODE_ENV === 'production',
  messages: {
    en: actions.replaceName(en)
  }
})

Vue.prototype.$eh = eventHub

new Vue({
  el: '#app',
  router,
  i18n: utils.$i18n,
  components: { App },
  template: '<App/>'
})
