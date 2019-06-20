import Vue from 'vue'
import Router from 'vue-router'
import { state, actions } from '@/modules/store'
import utils from '@/modules/utils'
import Account from '@/pages/Account'
import { capitalRouter } from './module/assets'
import _ from 'lodash'
// import HelloWorld from '@/components/HelloWorld'
let loaded = false
Vue.use(Router)
// 测试上传是否正常
const isMobile = utils.isMobile()

const HomeNew = () => import(/* webpackChunkName: "home" */ '@/pages/home_new.vue')
// const MobileHome = () => import(/* webpackChunkName: "mobilehome" */ '@/pages/Mobile/Home3.vue')
const Test1 = () => import(/* webpackChunkName: "Test1" */ '@/pages/test1.vue')
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
const ContractFee = () => import(/* webpackChunkName: "ContractFee" */ '@/components/Fee/contractFee')
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

// 我的订单
const MyOrderNew = () => import(/* webpackChunkName: "MyOrderNew" */ '@/pages/MyOrderNew')
const OrderBiBi = () => import(/* webpackChunkName: "MyOrderNew" */ '@/components/MyOrderNew/bibi')

// 合约历史资料
const ContractMaterial = () => import(/* webpackChunkName: "ContractMaterial" */ '@/pages/material')
const MaterialFeeHistory = () => import(/* webpackChunkName: "ContractMaterial" */ '@/components/Material/fee-history')
const EnsuranceFund = () => import(/* webpackChunkName: "ContractMaterial" */ '@/components/Material/ensurance')
const TradeIndex = () => import(/* webpackChunkName: "ContractMaterial" */ '@/components/Material/trade-index')

// h5相关页面
const h5login = () => import(/* webpackChunkName: "h5login" */ '@/pages/h5/sign-up')
const h5index = () => import(/* webpackChunkName: "h5index" */ '@/pages/h5/index')


//合约大赛 
// 活动页面
const ActivityIndex = () => import(/* webpackChunkName: "ActivityIndex" */ '@/pages/active/index.vue')
const LockWarehouse = () => import(/* webpackChunkName: "LockWarehouse" */ '@/pages/active/LockWarehouse.vue')
const InviteMineActivity = () => import(/* webpackChunkName: "InviteMineActivity" */ '@/pages/active/invite-mine')

const KycRelay = () => import(/* webpackChunkName: "KycRelay" */ '@/pages/active/kycRelay.vue')
const ExchangeRank = () => import(/* webpackChunkName: "ExchangeRank" */ '@/pages/active/ExchangeRank')
const Lottery = () => import(/* webpackChunkName: "lottery" */ '@/pages/active/lottery')
const RushBuy = () => import(/* webpackChunkName: "home" */ '@/pages/RushBuy.vue') 

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
  {
    path: '/trading/:pair?',
    name: 'trading',
    meta: { 
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
        path: 'Transfer',
        name: 'transfer',
        component: Transfer
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
        redirect: 'my/assets',
        children: [
          {
            path: 'contract',
            name: 'contract',
            redirect: 'contract/index',
            component: MyFundContract,
            children: [
              {
                path: 'index/:currency?',
                name: 'contractIndex',
                component: ContractIndex
              },
              {
                path: 'history',
                name: 'ContractHistory',
                component: ContractHistory
              },
              {
                path: 'assets-history',
                name: 'AssetsHistory',
                component: AssetsHistory
              }
            ]
          },
          {
            path: 'assets',
            name: 'myAssets',
            component: MyFundAssets,
            children: [
              {
                path: 'history/:from',
                name: 'assetsHistory',
                alias: 'deposit/:currency/history',
                component: FundHistory
              }
            ]
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
  ...capitalRouter,
  {
    path: '/material',
    name: 'Material',
    component: ContractMaterial,
    redirect: 'material/fee-history',
    meta: {
      auth: false,
      footer: true,
      nav: true,
      class: 'dark'
    },
    children: [
      {
        path: 'fee-history',
        name: 'MaterialFeeHistory',
        component: MaterialFeeHistory
      },
      {
        path: 'ensurance-fund',
        name: 'EnsuranceFund',
        component: EnsuranceFund
      },
      {
        path: 'trade-index/:pair?',
        name: 'TradeIndex',
        component: TradeIndex
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
    component: RushBuy,
  },
  {
    path: 'MessageSettings',
    name: 'MessageSettings',
    component: MessageSettings
  },
  {
    path: 'collection',
    name: 'collection',
    component: Collection
  },
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
  },{
    path: '/fee-set',
    name: 'ServiceFeeSet',
    component: ServiceFeeSet
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
    component: Fee,
    redirect: '/fee/tradingFee',
    children: [
      {
        path: 'tradingFee',
        name: 'TradingFee',
        component: TradingFee,
      },
      {
        path: 'contractFee',
        name: 'ContractFee',
        component: ContractFee,
      }
    ]
  },{
    path: 'TransferModal',
    name: 'transferModal',
    component: TransferModal
  },
  {
    path: '/myorder-new',
    name: 'MyOrderNew',
    component: MyOrderNew,
    redirect: {name: 'OrderBiBi'},
    meta: {
      auth: false,
      nav: true,
      footer: true,
      class: 'dark'
    },
    children: [
      {
        path: 'pairs',
        name: 'OrderBiBi',
        component: OrderBiBi
      }
    ]
  },  
   {
    path: '/OTC',
    name: 'OTC',
    redirect: '/OTC/Trade',
    meta: {
      nav: true,
      footer: true,
      class: 'dark'
    },
    component: OTC,
    children: [
        {
            path: 'FrenchBill',
            name: 'FrenchBill',
            component: () => import(/* webpackChunkName: "FundAddress" */ '@/pages/Capital/FrenchBill.vue')
          },
      {
        path: 'trade',
        name: 'trade',
        component: Trade
      },
      {
        path: 'Transfer',
        name: 'Transfer',
        component: Transfer,
        meta: {
          require: true
        }
      },
      {
        path: 'collection',
        name: 'collection',
        component: Collection,
        meta: {
          require: true
        }
      },
      {
        path: 'Hir',
        name: 'Hir',
        component: textTrade ,
        meta: {
          require: true
        }
      },
      { 
        path: 'contractFee',
        name: 'ContractFee',
        component: ContractFee, 
      }
    ]
  },
]


let router = new Router({
  mode: process.env.NODE_ENV === 'development' ? 'history' : 'history',
  routes: routes,
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
