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
import * as Sentry from '@sentry/browser'
import 'babel-polyfill'
import './assets/scss/index.scss'
import './assets/scss/h5.scss'
import moment from 'moment'
import './styles/flex.css'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import './icons'
import locale from 'element-ui/lib/locale/lang/en'
console.log(locale);

Vue.use(VueI18n)
utils.$i18n = new VueI18n({
  fallbackLocale: 'en',
  locale: 'en',
  silentTranslationWarn: true, // process.env.NODE_ENV === 'production',
  messages: {
    en: actions.replaceName(en)
  }
})
import ElementUI from 'element-ui'
// import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI,{
  i18n: (key, value) => utils.$i18n.t(key, value)
})
// import {
//   Select,
//   Option,
//   Table,
//   Input,
//   Radio,
//   Form,
//   FormItem,
//   TableColumn,
//   Upload,
//   RadioGroup,
//   RadioButton,
//   Loading,
//   MessageBox,
//   Alert,
//   Dropdown,
//   DropdownMenu,
//   DropdownItem,
//   Tabs,
//   TabPane,
//   Button,
//   Steps,
//   Link,
//   Step,
//   Switch,
//   DatePicker,
//   Pagination,
//   InputNumber,
//   Dialog,
//   Message,
//   Autocomplete,
//   Timeline,
//   TimelineItem,
//   Progress,
//   Row,
//   Col,
//   Tooltip,
//   Popover,
//   Checkbox,
//   Carousel,
//   CarouselItem,
//   Cascader,
//   CascaderPanel,
//   Divider,
//   Card,
// } from 'element-ui'
if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://cb7ce83188954a2d89afa702d5d4fcdf@sentry.io/1291113',
    integrations: [new Sentry.Integrations.Vue({ Vue })]
  })
}

Vue.config.productionTip = false

// Vue.use(Radio)
// Vue.use(CarouselItem)
// Vue.use(VueI18n)
// Vue.use(VTooltip)
// Vue.use(Row)
// Vue.use(Link)
// Vue.use(Col)
// Vue.use(Select) // 引入element单个组件
// Vue.use(Option)
// Vue.use(Table, {
//   i18n: (key, value) => utils.$i18n.t(key, value)
// })
// Vue.use(TableColumn, {
//   i18n: (key, value) => utils.$i18n.t(key, value)
// })
// Vue.use(Form)
// Vue.use(FormItem)
// Vue.use(Input)
// Vue.use(Upload)
// Vue.use(Dropdown)
// Vue.use(DropdownMenu)
// Vue.use(DropdownItem)
// Vue.use(RadioGroup)
// Vue.use(RadioButton)
// Vue.use(Loading)
// Vue.use(Tabs)
// Vue.use(Tooltip)
// Vue.use(TabPane)
// Vue.use(Button)
// Vue.use(Steps)
// Vue.use(Step)
// Vue.use(Dialog)
// Vue.use(Switch)
// Vue.use(Alert)
// Vue.use(DatePicker)
// Vue.use(Pagination)
// Vue.use(InputNumber)
// Vue.use(Autocomplete)
// Vue.use(Timeline)
// Vue.use(TimelineItem)
// Vue.use(Progress)
// Vue.use(Checkbox)
// Vue.use(Popover)
// Vue.use(CascaderPanel)
// Vue.use(Cascader)
// Vue.use(Divider)
// Vue.use(Card)
const request = require.context('./assets/svg', true, /\.svg$/)
/* console.log('request', request)
console.log('request.keys', request.keys())
console.log('request.id', request.id)
console.log('request.resolve()', request.resolve('./store.svg'))
console.log('request.resolve', request.resolve) */
// require every module
request.keys().forEach(request)

theme.set()



Vue.prototype.$eh = eventHub
// Vue.prototype.$msgbox = MessageBox
// Vue.prototype.$confirm = MessageBox.confirm
// Vue.prototype.$message = Message
Vue.prototype.$moment = moment
Vue.prototype.$eventBus = new Vue({})

actions.setLocale()
import mixins from './mixins'
Vue.mixin(mixins)
/* eslint-disable no-new */
const release = qs.parse(location.search.replace('?', '')).release
if (release || !window.grayline) {
  new Vue({
    el: '#app',
    router,
    i18n: utils.$i18n,
    store,
    components: { App },
    template: '<App/>'
  })
} else {
  new Vue({
    el: '#app',
    components: { App: Upgrading },
    template: '<App/>'
  })
}

if (utils.isMobile()) {
  document.body.classList.add('mobile')
  if (utils.isIos()) {
    document.body.classList.add('ios')
  }
}

Vue.prototype.validSe = function (value) {
  value = value.replace(/[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g, '').replace(/\s/g, "");
  return value;
}
