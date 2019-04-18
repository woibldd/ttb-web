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

const HomeNew = () => import(/* webpackChunkName: "home" */ '@/pages/home_new.vue')
// const MobileHome = () => import(/* webpackChunkName: "mobilehome" */ '@/pages/Mobile/Home3.vue')
// const Test1 = () => import(/* webpackChunkName: "Test1" */ '@/pages/test1.vue')
// const Test2 = () => import(/* webpackChunkName: "Test2" */ '@/pages/test2.vue')
const Trading = () => import(/* webpackChunkName: "Trading" */ '@/pages/Trading')
const Profile = () => import(/* webpackChunkName: "Profile" */ '@/pages/Profile')
const Invite = () => import(/* webpackChunkName: "Invite" */ '@/pages/Invite')
const ProfileInfo = () => import(/* webpackChunkName: "ProfileInfo" */ '@/pages/ProfileInfo')
const Kyc = () => import(/* webpackChunkName: "Kyc" */ '@/pages/Profile/Kyc/index')
const Kyc1 = () => import(/* webpackChunkName: "SafeVerified" */ '@/pages/Profile/Kyc/kyc1')
const Kyc2 = () => import(/* webpackChunkName: "Authen" */ '@/pages/Profile/Kyc/kyc2')
const Kyc3 = () => import(/* webpackChunkName: "Authen" */ '@/pages/Profile/Kyc/kyc3')
const Register = () => import(/* webpackChunkName: "Register" */ '@/pages/Register')
const Recover = () => import(/* webpackChunkName: "Register" */ '@/pages/user/recover/recover.vue')
const Login = () => import(/* webpackChunkName: "Login" */ '@/pages/Login')
const PrivacyPolicy = () => import(/* webpackChunkName: "PrivacyPolicy" */ '@/pages/PrivacyPolicy')
const terms = () => import(/* webpackChunkName: "terms" */ '@/pages/terms')
const ProfileSafety = () => import(/* webpackChunkName: "ProfileSafety" */ '@/pages/ProfileSafety')
const ProfileApi = () => import(/* webpackChunkName: "ProfileApi" */ '@/pages/ProfileApi')
const Fee = () => import(/* webpackChunkName: "Fee" */ '@/pages/Fee')
const relay = () => import(/* webpackChunkName: "relay" */ '@/pages/active/relay')
const creation = () => import(/* webpackChunkName: "creation" */ '@/pages/active/creation')
const PhoneBind = () => import(/* webpackChunkName: "PhoneBind" */ '@/pages/PhoneBind')
const SecuritySummary = () => import(/* webpackChunkName: "SecuritySummary" */ '@/pages/SecuritySummary')
const eBind = () => import(/* webpackChunkName: "EmailBind" */ '@/pages/eBind')
const ModPwd = () => import(/* webpackChunkName: "ModPwd" */ '@/pages/ModPwd')
const GoogleTitle = () => import(/* webpackChunkName: "GoogleTitle" */ '@/pages/GoogleTitle')
const lever = () => import(/* webpackChunkName: "lever" */ '@/pages/lever')
// const ProfileAuthen = () => import(/* webpackChunkName: "ProfileAuthen" */ '@/pages/ProfileAuthen')

// const MobileProfile = () => import(/* webpackChunkName: "MobileProfile" */ '@/pages/MobileProfile')

const Fund = () => import(/* webpackChunkName: "Fund" */ '@/pages/Fund')
const Withdraw = () => import(/* webpackChunkName: "FundWithdraw" */ '@/components/Fund/Withdraw/Withdraw.vue')
const Deposit = () => import(/* webpackChunkName: "FundDeposit" */ '@/components/Fund/deposit/deposit.vue')
const MyFund = () => import(/* webpackChunkName: "Myfund" */ '@/components/Fund/My/my.vue')
const FundAddress = () => import(/* webpackChunkName: "FundAddress" */ '@/components/Fund/Address/address.vue')
const FundHistory = () => import(/* webpackChunkName: "FundHistory" */ '@/components/Fund/history/history.vue')
const MyOrder = () => import(/* webpackChunkName: "FundHistory" */ '@/components/Fund/order')

// h5相关页面
const h5login = () => import(/* webpackChunkName: "h5login" */ '@/pages/h5/sign-up')
const h5index = () => import(/* webpackChunkName: "h5index" */ '@/pages/h5/index')

// 活动页面
const ActivityIndex = () => import(/* webpackChunkName: "ActivityIndex" */ '@/pages/active/index.vue')
const LockWarehouse = () => import(/* webpackChunkName: "LockWarehouse" */ '@/pages/active/LockWarehouse.vue')
const InviteMineActivity = () => import(/* webpackChunkName: "InviteMineActivity" */ '@/pages/active/invite-mine')

const KycRelay = () => import(/* webpackChunkName: "KycRelay" */ '@/pages/active/kycRelay.vue')
const ExchangeRank = () => import(/* webpackChunkName: "ExchangeRank" */ '@/pages/active/ExchangeRank')
const Lottery = () => import(/* webpackChunkName: "lottery" */ '@/pages/active/lottery')

async function beforeEach (to, from, next) {
  state.loading = true
  const auth = utils.getRouteMeta(to, 'auth')
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
  mode: process.env.NODE_ENV === 'development' ? 'history' : 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        nav: true,
        class: 'dark',
        auth: false
      },
      component: isMobile ? h5index : HomeNew
    },
    {
      path: '/h5',
      name: 'hlogin',
      meta: {
        auth: false,
        nav: false,
        footer: false,
        zendeskWidget: false
      },
      component: h5login
    },
    {
      path: '/h5-index',
      name: 'h5index',
      meta: {
        auth: false,
        nav: false,
        footer: false,
        zendeskWidget: false
      },
      component: h5index
    },
    {
      path: '/activity',
      name: 'activity',
      component: ActivityIndex,
      meta: {
        class: 'dark'
      },
      children: [
        {
          path: 'kyc_relay',
          name: 'kycRelay',
          component: KycRelay
        },
        {
          path: 'rank',
          name: 'exchangeRank',
          component: ExchangeRank
        },
        {
          path: 'livermore',
          name: 'lottery',
          component: Lottery}
      ]
    },
    {
      path: '/activity/creation',
      name: 'creation',
      component: creation
    },
    {
      path: '/activity/relay',
      name: 'relay',
      component: relay
    },
    {
      path: '/lever',
      name: 'lever',
      component: lever
    },
    {
      path: '/activity/lock',
      name: 'LockWarehouse',
      component: LockWarehouse
    },
    {
      path: '/activity/invite-mine',
      name: 'InviteMineActivity',
      component: InviteMineActivity
    },
    {
      path: '/PrivacyPolicy',
      name: 'PrivacyPolicy',
      component: PrivacyPolicy
    },
    {
      path: '/services',
      name: 'terms',
      component: terms
    },
    {
      path: '/trading/:pair?',
      name: 'trading',
      meta: {
        zendeskWidget: false,
        auth: false,
        footer: true,
        nav: false
      },
      component: Trading
    },
    {
      path: '/profile',
      name: 'profile',
      meta: {
        auth: true,
        nav: true,
        footer: true,
        class: 'dark',
        mobileNav: isMobile
      },
      redirect: 'profile/info',
      // redirect: 'profile/ProfileInfo',
      // redirect: 'profile/ProfileSafety',

      // component: (isMobile && process.env.MODE === 'beta') ? MobileProfile : Profile
      component: Profile,
      children: [
        {
          path: 'invite',
          name: 'invite',
          component: Invite
        },
        {
          path: 'info',
          name: 'ProfileInfo',
          component: ProfileInfo
        },
        {
          path: 'api',
          name: 'ProfileApi',
          component: ProfileApi
        },
        {
          path: 'security',
          name: 'ProfileSafety',
          component: ProfileSafety,
          redirect: 'security/summary',
          children: [
            {
              path: 'summary',
              name: 'Safety',
              component: SecuritySummary
            },
            {
              path: 'phone',
              name: 'PhoneBind',
              component: PhoneBind
            },
            {
              path: 'email',
              name: 'EmailBind',
              component: eBind
            },
            {
              path: 'change_password',
              name: 'ModPwd',
              component: ModPwd
            },
            {
              path: '2fa',
              name: 'GoogleBind',
              component: GoogleTitle
            }
          ]
        },
        {
          path: 'kyc',
          name: 'Kyc',
          component: Kyc,
          redirect: 'kyc/kyc_step1',
          children: [
            {
              path: 'kyc_step1',
              name: 'KycStep1',
              component: Kyc1
            },
            {
              path: 'kyc_step2',
              name: 'KycStep2',
              component: Kyc2
            },
            {
              path: 'kyc_step3',
              name: 'KycStep3',
              component: Kyc3
            }
          ]
        }
      ]
    },
    {
      path: '/user',
      name: 'account',
      meta: {
        auth: false,
        nav: true,
        class: 'login'
      },
      component: Account,
      children: [
        {
          path: 'login',
          name: 'login',
          component: Login,
          redirect: 'login/email'
        },
        {
          path: 'login/:by',
          name: 'loginBy',
          component: Login,
          props: true
        },
        {
          path: 'register',
          name: 'register',
          component: Register,
          redirect: 'register/email'
        },
        {
          path: 'register/:by',
          name: 'registerBy',
          component: Register,
          props: true
        },
        {
          path: 'recover',
          name: 'recover',
          component: Recover,
          redirect: 'recover/email',
          props: true
        },
        {
          path: 'recover/:by?',
          name: 'recoverBy',
          component: Recover,
          props: true
        }
      ]
    },
    {
      path: '/fund',
      name: 'fund',
      component: Fund,
      redirect: { name: 'my' },
      meta: {
        auth: true,
        footer: true,
        nav: true,
        class: 'dark'
      },
      children: [
        {
          path: 'withdraw/:currency?',
          name: 'withdraw',
          component: Withdraw
        },
        {
          path: 'deposit/:currency?',
          name: 'deposit',
          component: Deposit
        },
        {
          path: 'my',
          name: 'my',
          component: MyFund,
          children: [
            {
              path: 'history/:from',
              name: 'history',
              alias: 'deposit/:currency/history',
              component: FundHistory
            }
          ]
        },
        {
          path: 'address/:currency?',
          name: 'address',
          component: FundAddress
        }
      ]
    },
    {
      path: '/orders',
      name: 'orders',
      meta: {
        auth: false,
        nav: true,
        footer: true,
        class: 'dark'
      },
      component: MyOrder
    },
    {
      path: '/fee',
      name: 'Fee',
      meta: {
        auth: false,
        nav: true,
        footer: true,
        class: 'dark',
        mobileNav: isMobile
      },
      component: Fee
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    // if (to.name === 'trading') {
    return { x: 0, y: 0 }
    // }
    // return null
  }
})

router.beforeResolve(beforeResolve)
router.beforeEach(beforeEach)
router.onError(onError)

export default router
