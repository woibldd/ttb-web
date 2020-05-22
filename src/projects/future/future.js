import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import utils from '@/modules/utils'
import { actions } from '@/modules/store'

import 'normalize.css'
import 'flex.css'
import 'hover.css'
import theme from '@/modules/dynamic-theme'

// import ElementUI from 'element-ui'

// import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.scss' // global css
import '@/styles/index.scss' // 老版的全局样式
import '@/components/common/ix-scroll-load'

import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import twLocale from 'element-ui/lib/locale/lang/zh-TW'
import koLocale from 'element-ui/lib/locale/lang/ko' 

import './icons' // icon
import './permission'

import VTooltip from 'v-tooltip'
import VModal from '@/components/VModal'
import router from './router'
import mixins from './mixins'
import VueI18n from 'vue-i18n'

import en from './lang/en'
import ko from './lang/ko'
import zhCN from './lang/zh-CN'
import zhHK from './lang/zh-HK'

Vue.mixin(mixins)

Vue.config.productionTip = false

Vue.use(VueI18n)
Vue.use(VTooltip, {})
Vue.component('v-modal', VModal)
theme.set()

utils.$i18n = new VueI18n({
  locale: localStorage.getItem('locale') || 'zh-CN', // 语言标识
  silentFallbackWarn: true,
  messages: {
    'en': { ...en, ...enLocale },
    'ko': { ...ko, ...koLocale },
    'zh-CN': { ...zhCN, ...zhLocale },
    'zh-HK': { ...zhHK, ...twLocale }
  }
})

actions.setLocale()
// Vue.use(ElementUI, {
//   i18n: (key, value) => i18n.t(key, value)
// })

// Vue.use(ElementUI)
Vue.prototype.$eventBus = new Vue({})

new Vue({
  router,
  store,
  i18n: utils.$i18n,
  data: { modelVisible: false },
  render: h => h(App)
}).$mount('#app')
