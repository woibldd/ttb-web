// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'
import utils from './modules/utils'

Vue.config.productionTip = false
Vue.use(VueI18n)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n: utils.$i18n,
  components: { App },
  template: '<App/>'
})
