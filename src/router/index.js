/**
 * !!! 出现在topbar上的路由要同步到contract/router.js中，否则单页奖无法跳转
 * 没找到更好的办法
 */

import Vue from 'vue'
import Router from 'vue-router'
import {state, actions} from '@/modules/store'
import utils from '@/modules/utils'
import Account from '@/pages/Account'
import _ from 'lodash'
import { capitalRouter } from './module/assets'
import {tradeRouter } from './module/trade'
import { fundRouter } from './module/fund'
import { accountRouter } from './module/account'
import { profileRouter } from './module/profile'
import { materialRouter } from './module/material'
import { activityRouter } from './module/activity'
import { gameRouter } from './module/game'
import { feeRouter } from './module/fee'
import { otherRouter } from './module/other'
import { Input } from 'element-ui'
let loaded = false
Vue.use(Router)
// 测试站
const isTestnet = location.hostname.indexOf('ixex.pro') >= 0

async function beforeEach (to, from, next) {
  state.loading = true
  const auth = utils.getRouteMeta(to, 'auth')
  if (state.utm_source) {
    let query = Object.assign(to.query)
    if (!query.utm_source) {
      query.utm_source = state.utm_source
      return next({
        path: to.path,
        query: query
      })
    }
  }
  // utils.log('to:', to.name, 'from:', from.name)
  if (auth) {
    await actions.updateSession()
    if (!state.userStatus) {
      actions.setLoginBack(to)
      return next({
        name: 'login'
      })
    }
  }
  if (state.userStatus === -1) {
    actions.updateSession()
  }
  if (to.meta.require) {
    if (window.localStorage.getItem('X-TOKEN')) {
      next()
    } else {
      next({
        name: 'login',
        query: {redirect: to.fullPath}
      })
    }
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

export const routes = [
  ...tradeRouter,
  ...activityRouter,
  ...profileRouter,
  ...accountRouter,
  ...fundRouter,
  ...capitalRouter,
  ...materialRouter,
  ...gameRouter,
  ...feeRouter,
  ...otherRouter
]

let router = new Router({
  mode: process.env.NODE_ENV === 'development' ? 'history' : 'history',
  routes: routes,
  scrollBehavior (to, from, savedPosition) {
    // if (to.name === 'trading') {
    return {x: 0, y: 0}
    // }
    // return null
  }
})

router.beforeResolve(beforeResolve)
router.beforeEach(beforeEach)
router.onError(onError)

export default router
