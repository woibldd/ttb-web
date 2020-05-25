// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Upgrading from '@/pages/Upgrading'
import router from './router'
import VueI18n from 'vue-i18n'
import utils from '@/modules/utils'
import theme from '@/modules/dynamic-theme'
import { actions } from '@/modules/store'
import './bootstrap'
import en from '@/libs/languages/en.js'
import eventHub from '@/modules/eventHub'
import VTooltip from 'v-tooltip'
import qs from 'querystring'
// import * as Sentry from '@sentry/browser'
import 'babel-polyfill'
import ToastRegistry from '@/libs/toast/index'

// import 'element-ui/lib/theme-chalk/index.css'
import '../../styles/_reset_ele.scss'
import '../../styles/flex.css'

import {
  Select,
  Option,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Loading,
  MessageBox,
  Checkbox,
  Popover,
  Button,
} from 'element-ui'
// if (process.env.NODE_ENV === 'production') {
//   Sentry.init({
//     dsn: 'https://cb7ce83188954a2d89afa702d5d4fcdf@sentry.io/1291113',
//     integrations: [new Sentry.Integrations.Vue({ Vue })]
//   })
// }

Vue.config.productionTip = false
Vue.use(VueI18n)
Vue.use(VTooltip, {
  // defaultBoundariesElement: document.body
})

Vue.use(Select) // 引入element单个组件
Vue.use(Option)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Checkbox)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Loading)
Vue.use(ToastRegistry)
Vue.use(Popover)
Vue.use(Button) 

const request = require.context('../../assets/svg', true, /\.svg$/)
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
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$confirm = MessageBox.confirm

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

if (utils.isMobile()) {
  document.body.classList.add('mobile')
  if (utils.isIos()) {
    document.body.classList.add('ios')
  }
}
