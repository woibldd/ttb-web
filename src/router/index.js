import Vue from 'vue'
import Router from 'vue-router'
import { state, actions } from '@/modules/store'
import utils from '@/modules/utils'
import Account from '@/pages/Account'
import _ from 'lodash'
// import HelloWorld from '@/components/HelloWorld'
let loaded = false
Vue.use(Router)

const isMobile = utils.isMobile()

const home = () => import(/* webpackChunkName: "home" */ '@/pages/home.vue')
// const Test1 = () => import(/* webpackChunkName: "Test1" */ '@/pages/test1.vue')
const Test2 = () => import(/* webpackChunkName: "Test2" */ '@/pages/test2.vue')
const Trading = () => import(/* webpackChunkName: "Trading" */ '@/pages/Trading')
const Profile = () => import(/* webpackChunkName: "Profile" */ '@/pages/Profile')
const Invite = () => import(/* webpackChunkName: "Invite" */ '@/pages/Invite')
const Register = () => import(/* webpackChunkName: "Register" */ '@/pages/Register')
const Login = () => import(/* webpackChunkName: "Login" */ '@/pages/Login')
// const MobileProfile = () => import(/* webpackChunkName: "MobileProfile" */ '@/pages/MobileProfile')

async function beforeEach (to, from, next) {
  state.loading = true
  const auth = utils.getRouteMeta(to, 'auth')
  utils.log('to:', to.name, auth)
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
  next()
}

function beforeResolve (to, from, next) {
  if (to.name !== '404' || (from.name && from.name !== '404')) {
    document.body.className = document.body.className.replace(/\bv-route-([-a-zA-Z0-9]+)\b/g, '')
    let className = 'v-route'
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

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        auth: false
      },
      component: home
    }, {
      path: '/test2',
      name: 'Test2',
      component: Test2
    }, {
      path: '/trading',
      name: 'trading',
      meta: {
        zendeskWidget: false,
        auth: false,
        footer: false,
        nav: false
      },
      component: Trading
    }, {
      path: '/profile',
      name: 'profile',
      meta: {
        auth: false,
        nav: !isMobile,
        mobileNav: isMobile
      },
      // component: (isMobile && process.env.MODE === 'beta') ? MobileProfile : Profile
      component: Profile,
      children: [{
        path: 'invite',
        name: 'invite',
        component: Invite
      }]
    }, {
      path: '/user',
      name: 'account',
      meta: {
        auth: false,
        nav: false
      },
      component: Account,
      children: [{
        path: 'login',
        name: 'login',
        component: Login,
        redirect: 'login/email'
      }, {
        path: 'login/:by',
        name: 'loginBy',
        component: Login,
        props: true
      }, {
        path: 'register',
        name: 'register',
        component: Register,
        redirect: 'register/email'
      }, {
        path: 'register/:by',
        name: 'registerBy',
        component: Register,
        props: true
      }]
    }

  ]
})

router.beforeResolve(beforeResolve)
router.beforeEach(beforeEach)
router.onError(onError)

export default router
