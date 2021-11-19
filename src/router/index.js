import Vue from 'vue'
import Router from 'vue-router'
import { state, actions } from '@/modules/store'
import utils from '@/modules/utils'
import { accountRouter } from './module/account'
import { activityRouter } from './module/activity'
import { capitalRouter } from './module/assets'
import { feeRouter } from './module/fee'
import { materialRouter } from './module/material'
import { profileRouter } from './module/profile'
import { tradeRouter } from './module/trade'
import { fundRouter } from './module/fund'
import { otherRouter } from './module/other'
import { ipfsRouter } from './module/ipfs'
import { otcRouter } from './module/otc'
import { gameRouter } from './module/game'
import { otcHlRouter } from './module/otcHl'
import { newFundRouter } from './module/new-fund'
import Bid from '@/pages/Bid/index.vue'
import BidDetail from '@/pages/Bid/detail.vue'
import BidTable from '@/pages/Bid/table.vue'
import Superzis from '@/pages/Superzis/index.vue'
import ByAmount from '@/pages/Superzis/sell.vue'
import layout from '@/pages/layout/index'
import knowledgeBase from './module/knowledgeBase'

import _ from 'lodash'


// import HelloWorld from '@/components/HelloWorld'
let loaded = false
// Vue.use(Router)
// 测试上传是否正常
const isMobile = utils.isMobile()

const HomeNew = () => import(/* webpackChunkName: "home" */ '@/pages/home_new.vue')
const HomeNew2 = () => import(/* webpackChunkName: "home" */ '@/pages/home_new2.vue')
// const MobileHome = () => import(/* webpackChunkName: "mobilehome" */ '@/pages/Mobile/Home3.vue')
const Test1 = () => import(/* webpackChunkName: "Test1" */ '@/pages/test1.vue')
// const Test2 = () => import(/* webpackChunkName: "Test2" */ '@/pages/test2.vue')
// const Trading = () => import(/* webpackChunkName: "Trading" */ '@/pages/Trading')
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
const relay = () => import(/* webpackChunkName: "relay" */ '@/pages/active/relay')
const creation = () => import(/* webpackChunkName: "creation" */ '@/pages/active/creation')
const PhoneBind = () => import(/* webpackChunkName: "PhoneBind" */ '@/pages/PhoneBind')
const SecuritySummary = () => import(/* webpackChunkName: "SecuritySummary" */ '@/pages/SecuritySummary')
const eBind = () => import(/* webpackChunkName: "EmailBind" */ '@/pages/eBind')
const ModPwd = () => import(/* webpackChunkName: "ModPwd" */ '@/pages/ModPwd')
const GoogleTitle = () => import(/* webpackChunkName: "GoogleTitle" */ '@/pages/GoogleTitle')
const lever = () => import(/* webpackChunkName: "lever" */ '@/pages/lever')
// const ProfileAuthen = () => import(/* webpackChunkName: "ProfileAuthen" */ '@/pages/ProfileAuthen')

const Fee = () => import(/* webpackChunkName: "Fee" */ '@/pages/Fee')
// const ContractFee = () => import(/* webpackChunkName: "ContractFee" */ '@/components/Fee/contractFee')
const TradingFee = () => import(/* webpackChunkName: "tradingFee" */ '@/components/Fee/tradingFee')
// const MobileProfile = () => import(/* webpackChunkName: "MobileProfile" */ '@/pages/MobileProfile')

const Fund = () => import(/* webpackChunkName: "Fund" */ '@/pages/Fund')
const Withdraw = () => import(/* webpackChunkName: "FundWithdraw" */ '@/components/Fund/Withdraw/Withdraw.vue')
const Deposit = () => import(/* webpackChunkName: "FundDeposit" */ '@/components/Fund/deposit/deposit.vue')
const MyFund = () => import(/* webpackChunkName: "Myfund" */ '@/components/Fund/My/my-template.vue')
const FundAddress = () => import(/* webpackChunkName: "FundAddress" */ '@/components/Fund/Address/address.vue')
const FundHistory = () => import(/* webpackChunkName: "FundHistory" */ '@/components/Fund/history/history.vue')
const MyOrder = () => import(/* webpackChunkName: "FundHistory" */ '@/components/Fund/order')

const MyFundAssets = () => import(/* webpackChunkName: "Myfund" */ '@/components/Fund/My/my.vue')
const MyFundContract = () => import(/* webpackChunkName: "Myfund" */ '@/components/Fund/contract')
const ContractIndex = () => import(/* webpackChunkName: "Myfund" */ '@/components/Fund/contract/contract.vue')
const ContractHistory = () => import(/* webpackChunkName: "Myfund" */ '@/components/Fund/contract/history')
const AssetsHistory = () => import(/* webpackChunkName: "Myfund" */ '@/components/Fund/contract/assets-history')
const Transfer = () => import(/* webpackChunkName: "FundAddress" */ '@/components/Fund/Transfer/transfer.vue')
const TransferModal = () => import(/* webpackChunkName: "FundAddress" */ '@/components/Fund/contract/transfer-modal.vue')
 

// 合约历史资料
const ContractMaterial = () => import(/* webpackChunkName: "ContractMaterial" */ '@/pages/material')
const MaterialFeeHistory = () => import(/* webpackChunkName: "ContractMaterial" */ '@/components/Material/fee-history')
const EnsuranceFund = () => import(/* webpackChunkName: "ContractMaterial" */ '@/components/Material/ensurance')
const TradeIndex = () => import(/* webpackChunkName: "ContractMaterial" */ '@/components/Material/trade-index')

// h5相关页面
const h5login = () => import(/* webpackChunkName: "h5login" */ '@/pages/h5/sign-up')
const h5index = () => import(/* webpackChunkName: "h5index" */ '@/pages/h5/home')

// 合约大赛 
// 活动页面
const ActivityIndex = () => import(/* webpackChunkName: "ActivityIndex" */ '@/pages/active/index.vue')
const LockWarehouse = () => import(/* webpackChunkName: "LockWarehouse" */ '@/pages/active/LockWarehouse.vue')
const InviteMineActivity = () => import(/* webpackChunkName: "InviteMineActivity" */ '@/pages/active/invite-mine')

const KycRelay = () => import(/* webpackChunkName: "KycRelay" */ '@/pages/active/kycRelay.vue')
const ExchangeRank = () => import(/* webpackChunkName: "ExchangeRank" */ '@/pages/active/ExchangeRank')
const Lottery = () => import(/* webpackChunkName: "lottery" */ '@/pages/active/lottery')
const RushBuy = () => import(/* webpackChunkName: "home" */ '@/pages/RushBuy.vue')
const BuyNbzz = () => import(/* webpackChunkName: "home" */ '@/pages/BuyNbzz.vue')

// const Guide = () => import(/* webpackChunkName: "home" */ '@/pages/guide.vue')
const MessageSettings = () => import(/* webpackChunkName: "home" */ '@/pages/Profile/MessageSettings.vue')
const Collection = () => import(/* webpackChunkName: "home" */ '@/pages/Profile/collection.vue')
const ServiceFeeSet = () => import(/* webpackChunkName: ServiceFeeSet */ '@/pages/Profile/ServiceFeeSet')

// OTC
const OTC = () => import(/* webpackChunkName: "OTC" */ '@/pages/OTC')
const Trade = () => import(/* webpackChunkName: "Trade" */ '@/components/OTC/Trade.vue')
const textTrade = () => import(/* webpackChunkName: "Hir" */ '@/pages/StepTable/index.vue')

// 下载
const Download = () => import(/* webpackChunkName: "Download" */ '@/pages/download/download.vue')
import {defaultTilte} from './default'
async function beforeEach(to, from, next) {
  if(to.path === "/industry") {
    document.title = '合约交易所排名-比特币价格今日行情-比特币实时行情走势'
    document.querySelector('meta[name="keywords"]').setAttribute('content', '比特币交易所,合约交易所,合约交易所排名,比特币走势,比特币实时行情')
    document.querySelector('meta[name="description"]').setAttribute('content', 'IXX是全球首家数字资产交易共同体，总部在新加坡，其致力于实现交易所生态的区块链理想国，打造人人的交易所，我为人人，人人为我，所有参与交易所的贡献者均可共享交易所的发展成果。')
  }
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
  if (to.meta.require) {
    if (window.localStorage.getItem('X-TOKEN')) {
      next()
    } else {
      next({
        name: 'login'
      })
    }
  }
  // to.query.redirect && next({ path: to.query.redirect }) || next()
  next()
  // next()
} 
function beforeResolve(to, from, next) {
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
function onError(err) {
  utils.log(err)
  state.loading = false
  // utils.alert(utils.$app.$i18n.t('page_error'))
  console.log(err)
  utils.alert(err)
}

export const routes = [ 
  ...accountRouter,
  ...activityRouter,
  ...feeRouter,
  ...materialRouter,
  ...profileRouter,
  ...tradeRouter,
  ...capitalRouter,
  ...fundRouter,
  ...otherRouter,
  ...ipfsRouter,
  ...knowledgeBase,
  ...otcRouter,
  ...gameRouter,
  ...otcHlRouter,
  ...newFundRouter,
  {
    path: '/',
    name: 'home',
    meta: {
      nav: false,
      class: 'dark',
      auth: false
    },
    component: isMobile ? h5index : HomeNew2
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
    path: '/download',
    name: 'Download',
    meta: {
      auth: false,
      nav: true,
      footer: true,
      class: 'dark'
    },
    component: Download
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
  // {
  //   path: '/trading/:pair?',
  //   name: 'trading',
  //   meta: {
  //     auth: false,
  //     footer: true,
  //     nav: false
  //   },
  //   component: Trading
  // }, 
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
  // {
  //   path: '/Guide',
  //   name: 'Guide',
  //   meta: {
  //     zendeskWidget: true,
  //     auth: false,
  //     footer: true,
  //     class: 'dark',
  //     nav: true
  //   },
  //   component: Guide
  // },
  {
    path: '/RushBuy',
    name: 'RushBuy',
    meta: {
      auth: false,
      nav: true,
      footer: false,
      class: 'absolute'
    },
    component: RushBuy
  },
  {
    path: '/BuyNbzz', name: 'BuyNbzz', component: BuyNbzz,
    meta: {auth: false, nav: true, footer: false, class: 'absolute'}
  },
  // {
  //   path: 'MessageSettings',
  //   name: 'MessageSettings',
  //   component: MessageSettings
  // },
  // {
  //   path: 'collection',
  //   name: 'collection',
  //   component: Collection
  // },
  {
    path: '/test',
    name: 'test',
    meta: {
      auth: false,
      nav: true,
      footer: true,
      class: 'dark'
    },
    component: Test1
  }, {
    path: '/fee-set',
    // name: 'ServiceFeeSet',
    component: ServiceFeeSet
  },
  // {
  //   path: 'TransferModal',
  //   name: 'transferModal',
  //   component: TransferModal
  // }, 
  {
    path: '/snowball',
    redirect:'/snowball/bazaar',
    name:'snowball',
    meta: {
      nav: true,
      footer: true,
      class: 'dark'
    },
    component: layout,
    children:[
      {
        path: '/snowball/bazaar',
        name: 'Bid',
        // meta: {
        //   nav: true,
        //   footer: true,
        //   class: 'dark'
        // },
        component: Bid,
      },
      // {
      //   path: '/snowball/playBTC',
      //   name: 'playBTC',
      //   // meta: {
      //   //   nav: true,
      //   //   footer: true,
      //   //   class: 'dark'
      //   // },
      //   component: () => import('@/pages/Bid/playBTC')
      // },
    ]
  },
  {
    path: '/share_option',
    name:'share_option',
    meta: {
      nav: true,
      footer: false,
      class: 'custom-dark'
    },
    component:  () => import('@/views/share_option')
  },
  {
    path: '/proposer',
    name:'proposer',
    meta: {
      nav: true,
      footer: false,
      class: 'custom-dark'
    },
    component:  () => import('@/views/proposer')
  },
  {
    path: '/snowballDetail',
    name: 'BidDetail',
    meta: {
      require: true,
      nav: true,
      footer: true,
      class: 'dark'
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: BidDetail
  },
  {
    path: '/bidtable',
    name: 'bidtable',
    meta: {
      nav: true,
      footer: true,
      class: 'dark'
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: BidTable
  },
  {
    path: '/Superzis',
    name: 'Superzis',
    meta: {
      nav: true,
      footer: true,
      class: 'dark'
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Superzis
  },
  {
    path: '/byamount',
    name: 'byamount',
    meta: {
      nav: true,
      footer: true,
      class: 'dark'
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: ByAmount
  },
  // {
  //   path: '/unit',
  //   name:'unit',
  //   meta: {
  //     nav: true,
  //     footer: false,
  //     class: 'dark', 
  //     zendeskWidget: false
  //   },
  //   component:  () => import('@/views/currency-unit')
  // },
  {
    path: '/unit',
    name:'unit',
    meta: {
      nav: true,
      footer: false,
      class: 'dark', 
      zendeskWidget: false
    },
    component:  () => import('@/views/currency-unit1')
  },
  // {
  //   path: '/mix',
  //   name:'mix',
  //   meta: {
  //     nav: true,
  //     footer: false,
  //     class: 'dark', 
  //     zendeskWidget: false
  //   },
  //   component:  () => import('@/views/contract-mix')
  // },
  {
    path: '/mix',
    name:'mix',
    meta: {
      nav: true,
      footer: false,
      class: 'dark', 
      zendeskWidget: false
    },
    component:  () => import('@/views/contract-mix1')
  },
  // {
  //   path: '/future',
  //   name:'future',
  //   meta: {
  //     nav: true,
  //     footer: false,
  //     class: 'dark', 
  //     zendeskWidget: false
  //   },
  //   component:  () => import('@/views/contract-btc')
  // },
  {
    path: '/future',
    name:'future',
    meta: {
      nav: true,
      footer: false,
      class: 'dark', 
      zendeskWidget: false
    },
    component:  () => import('@/views/contract-btc1')
  }, 
  {
    path: '/trading/:pair?',
    name: 'trading',
    meta: {
      class: 'dark', 
      auth: false,
      footer: true,
      nav: true
    },
    component:  () => import('@/views/trading1')
  }, 
  {
    path: '/markets',
    name: 'markets',
    meta: {
      class: 'dark',
      footer: true,
      // nav:true
    },
    component: () => import('@/views/markets')
  }
]

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

const router = new Router({
  mode: process.env.NODE_ENV === 'development' ? 'history' : 'history',
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
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
