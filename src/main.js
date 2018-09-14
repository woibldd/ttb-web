// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Upgrading from './pages/Upgrading'
import router from './router'
import VueI18n from 'vue-i18n'
import utils from './modules/utils'
import theme from './modules/dynamic-theme'
import { actions } from './modules/store'
import './bootstrap'
import en from '@/libs/languages/en.json'
import eventHub from '@/modules/eventHub'
import VTooltip from 'v-tooltip'
import qs from 'querystring'

import 'element-ui/lib/theme-chalk/index.css'

import { Select, Option, Table} from 'element-ui'

Vue.config.productionTip = false
Vue.use(VueI18n)
Vue.use(VTooltip)

Vue.use(Select) // 引入element单个组件
Vue.use(Option)
Vue.use(Table)

const request = require.context('./assets/svg', true, /\.svg$/)
/* console.log('request', request)
console.log('request.keys', request.keys())
console.log('request.id', request.id)
console.log('request.resolve()', request.resolve('./store.svg'))
console.log('request.resolve', request.resolve) */
// require every module
request.keys().forEach(request)

theme.set()

utils.$i18n = new VueI18n({
  fallbackLocale: 'en',
  locale: 'en',
  silentTranslationWarn: true, // process.env.NODE_ENV === 'production',
  messages: {
    en: actions.replaceName(en)
  }
})

Vue.prototype.$eh = eventHub

actions.setLocale()

/* eslint-disable no-new */
const release = qs.parse(location.search.replace('?', '')).release
if (release || !window.grayline) {
  new Vue({
    el: '#app',
    router,
    i18n: utils.$i18n,
    components: { App },
    template: '<App/>'
  })
} else {
  new Vue({
    el: '#app',
    components: {App: Upgrading},
    template: '<App/>'
  })
}
