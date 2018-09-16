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

const Home = () => import(/* webpackChunkName: "home" */ '@/pages/home.vue')
const MobileHome = () => import(/* webpackChunkName: "mobilehome" */ '@/pages/Mobile/home.vue')
// const Test1 = () => import(/* webpackChunkName: "Test1" */ '@/pages/test1.vue')
const Test2 = () => import(/* webpackChunkName: "Test2" */ '@/pages/test2.vue')
const Trading = () => import(/* webpackChunkName: "Trading" */ '@/pages/Trading')
const Profile = () => import(/* webpackChunkName: "Profile" */ '@/pages/Profile')
const Invite = () => import(/* webpackChunkName: "Invite" */ '@/pages/Invite')
const ProfileInfo = () => import(/* webpackChunkName: "ProfileInfo" */ '@/pages/ProfileInfo')
const SafeVerified = () => import(/* webpackChunkName: "SafeVerified" */ '@/pages/SafeVerified')
const Register = () => import(/* webpackChunkName: "Register" */ '@/pages/Register')
const Recover = () => import(/* webpackChunkName: "Register" */ '@/pages/user/recover/recover.vue')
const Login = () => import(/* webpackChunkName: "Login" */ '@/pages/Login')
const PrivacyPolicy = () => import(/* webpackChunkName: "PrivacyPolicy" */ '@/pages/PrivacyPolicy')
const terms = () => import(/* webpackChunkName: "terms" */ '@/pages/terms')
const ProfileSafety = () => import(/* webpackChunkName: "ProfileSafety" */ '@/pages/ProfileSafety')
const PhoneBind = () => import(/* webpackChunkName: "PhoneBind" */ '@/pages/PhoneBind')
const SecuritySummary = () => import(/* webpackChunkName: "SecuritySummary" */ '@/pages/SecuritySummary')
const eBind = () => import(/* webpackChunkName: "EmailBind" */ '@/pages/eBind')
const ModPwd = () => import(/* webpackChunkName: "ModPwd" */ '@/pages/ModPwd')
const GoogleTitle = () => import(/* webpackChunkName: "GoogleTitle" */ '@/pages/GoogleTitle')
// const ProfileAuthen = () => import(/* webpackChunkName: "ProfileAuthen" */ '@/pages/ProfileAuthen')
const Authen = () => import(/* webpackChunkName: "Authen" */ '@/pages/Authen')
// const MobileProfile = () => import(/* webpackChunkName: "MobileProfile" */ '@/pages/MobileProfile')

const Fund = () => import(/* webpackChunkName: "CoinManage" */ '@/pages/Fund')
const Withdraw = () => import(/* webpackChunkName: "Withdraw" */ '@/components/Fund/Withdraw/Withdraw.vue')
const Deposit = () => import(/* webpackChunkName: "Deposit" */ '@/components/Fund/Deposit/deposit.vue')
const MyFund = () => import(/* webpackChunkName: "Deposit" */ '@/components/Fund/My/my.vue')
const FundAddress = () => import(/* webpackChunkName: "Deposit" */ '@/components/Fund/Address/address.vue')

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

let router = new Router({
  mode: process.env.NODE_ENV === 'development' ? 'hash' : 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        auth: false
      },
      component: isMobile ? MobileHome : Home
    }, {
      path: '/PrivacyPolicy',
      name: 'PrivacyPolicy',
      component: PrivacyPolicy
    }, {
      path: '/terms',
      name: 'terms',
      component: terms
    }, {
      path: '/test2',
      name: 'Test2',
      component: Test2
    }, {
      path: '/trading/:pair?',
      name: 'trading',
      meta: {
        zendeskWidget: false,
        auth: false,
        footer: true,
        nav: false
      },
      component: Trading
    }, {
      path: '/profile',
      name: 'profile',
      meta: {
        auth: false,
        nav: true,
        class: 'dark',
        mobileNav: isMobile
      },
      redirect: 'profile/invite',
      // redirect: 'profile/ProfileInfo',
      // redirect: 'profile/ProfileSafety',

      // component: (isMobile && process.env.MODE === 'beta') ? MobileProfile : Profile
      component: Profile,
      children: [{
        path: 'invite',
        name: 'invite',
        component: Invite
      }, {
        path: 'info',
        name: 'ProfileInfo',
        component: ProfileInfo
      }, {
        path: 'security',
        name: 'ProfileSafety',
        component: ProfileSafety,
        redirect: 'security/summary',
        children: [{
          path: 'summary',
          name: 'Safety',
          component: SecuritySummary
        }, {
          path: 'phone',
          name: 'PhoneBind',
          component: PhoneBind
        }, {
          path: 'email',
          name: 'EmailBind',
          component: eBind
        }, {
          path: 'change_password',
          name: 'ModPwd',
          component: ModPwd
        }, {
          path: '2fa',
          name: 'GoogleBind',
          component: GoogleTitle
        }]
      }, {
        path: 'kyc_step1',
        name: 'Kyc',
        component: SafeVerified
      }, {
        path: 'kyc_step2',
        name: 'KycStep2',
        component: Authen
      }]
    }, {
      path: '/user',
      name: 'account',
      meta: {
        auth: false,
        nav: true,
        class: 'login'
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
      }, {
        path: 'recover',
        name: 'recover',
        component: Recover,
        props: true
      }]
    }, {
      path: '/fund',
      name: 'fund',
      component: Fund,
      redirect: { name: 'deposit' },
      meta: {
        auth: false,
        footer: true,
        nav: true,
        class: 'dark'
      },
      children: [{
        path: 'withdraw',
        name: 'withdraw',
        component: Withdraw
      }, {
        path: 'deposit',
        name: 'deposit',
        component: Deposit
      }, {
        path: 'my',
        name: 'my',
        component: MyFund
      }, {
        path: 'address',
        name: 'address',
        component: FundAddress
      } ]
    }

  ]
})

router.beforeResolve(beforeResolve)
router.beforeEach(beforeEach)
router.onError(onError)

export default router
