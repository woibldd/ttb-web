import Vue from 'vue'
import Router from 'vue-router'
import utils from '@/modules/utils'
import { state, actions } from '@/modules/store'
import _ from 'lodash'
import routeWhiteList from '@/libs/spa-route-whitelist'
const Index = () => import(/* webpackChunkName: "contract-index" */ './contract.vue')
let loaded = false
const whiteList = ['spa_contract']

Vue.use(Router)
let router = new Router({
  mode: 'hash',
  base: 'contract.html',
  routes: [
    {
      path: '/',
      name: 'spa_contract',
      component: Index,
      meta: {
        nav: true,
        class: 'dark'
      }
    }
  ].concat(routeWhiteList)
})
async function beforeEach (to, from, next) {
  if (whiteList.indexOf(to.name) === -1) {
    let mathedRouter = to.matched
    if (mathedRouter && mathedRouter.length) {
      location.href = to.fullPath || mathedRouter[mathedRouter.length - 1].path.replace(/[\/]?[:]\w+[?]?/g, '')
      return
    }
  }
  state.loading = true
  if (state.userStatus === -1) {
    actions.updateSession()
  }
  next()
}

function beforeResolve (to, from, next) {
  if (to.name !== '404' || (from.name && from.name !== '404')) {
    document.body.className = document.body.className.replace(/\brouter-([-a-zA-Z0-9]+)\b/g, '')
    let className = 'router'
    _.each(to.matched, (match) => {
      className += ('-' + match.name)
      document.body.classList.add(className)
    })
  }

  if (!loaded) {
    loaded = true
    utils.preloadEnd()
  }

  state.loading = false
  next()
}
function onError (err) {
  utils.log(err)
  state.loading = false
  utils.alert(utils.$app.$i18n.t('page_error'))
}
router.beforeResolve(beforeResolve)
router.beforeEach(beforeEach)
router.onError(onError)
export default router
