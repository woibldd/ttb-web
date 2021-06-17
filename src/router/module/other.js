/**
 * User: zlccy/18768427422@163.com
 * Date: 2019-06-21 11:38
 */
import utils from '@/modules/utils'
const isMobile = utils.isMobile()
// const guide = () => import(/* webpackChunkName: "h5index" */ '@/pages/h5/index')
// const h5index = () => import(/* webpackChunkName: "h5index" */ '@/pages/h5/index')
// const HomeNew = () => import(/* webpackChunkName: "home" */ '@/pages/home_new.vue')
const h5submitNext = () => import('@/pages/plan/h5/submitNext')
const submitNext = () => import('@/pages/plan/submitNext')
const h5planSubmit = () => import('@/pages/plan/h5/submit')
const planSubmit = () => import('@/pages/plan/submit')
const h5plan = () => import('@/pages/plan/h5/index')
const appplan = () => import('@/pages/plan/app/index')
const appsubmitNext = () => import('@/pages/plan/app/submitNext')
const appplanSubmit = () => import('@/pages/plan/app/submit')
const plan = () => import('@/pages/plan/index')
const h5treaty = () => import('@/pages/plan/h5/treaty')
const treaty = () => import('@/pages/plan/treaty')
const bonus = () => import(/*  */ '@/pages/Bonus.vue')
const overseas = () => import(/*  */ '@/views/new-downLoad/index.vue')
const overseasTip = () => import(/*  */ '@/views/new-downLoad/tip.vue')
export const otherRouter = [
  {
    path: '/industryDetail',
    name: 'industryDetail',
    meta: {
      auth: false,
      nav: true,
      footer: true,
      class: 'dark',
    },
    component: () => import('@/pages/Industry/detial')
  },
  // {
  //   path: '/collect',
  //   name: 'collect',
  //   meta: {
  //     auth: true,
  //     nav: true,
  //     footer: true,
  //     class: 'dark',
  //   },
  //   component: () => import('@/pages/Industry/industry')
  // },
  {
    path: '/blog',
    name: 'blog',
    redirect:{ name: 'industry'}
  },
  {
    path: '/industry',
    name: 'industry',
    meta: {
      auth: false,
      nav: true,
      footer: true,
      class: 'dark'
    },
    component: () => import('@/pages/Industry/index')
  },
  {
    path: '/affiliate-app',
    name: 'affiliate-app',
    meta: {
      auth: false,
      nav: false,
      footer: false,
    },
    component: appplan
  },
  {
    path: '/planSubmit-app',
    name: 'planSubmit-app',
    meta: {
      auth: false,
      nav: false,
      footer: false,
    },
    component: appplanSubmit
  },
  {
    path: '/planSuccess-app',
    name: 'planSuccess-app',
    meta: {
      auth: false,
      nav: false,
      footer: false,
    },
    component: appsubmitNext
  },
  // {
  //   path: '/',
  //   name: 'home',
  //   meta: {
  //     nav: true,
  //     class: 'dark',
  //     auth: false
  //   },
  //   component: isMobile ? h5index : HomeNew
  // },
  // {
  //   path: '/h5',
  //   name: 'hlogin',
  //   meta: {
  //     auth: false,
  //     nav: false,
  //     footer: false,
  //     zendeskWidget: false
  //   },
  //   component: () => import(/* webpackChunkName: "h5login" */ '@/pages/h5/sign-up')
  // },
  // {
  //   path: '/h5-index',
  //   name: 'h5index',
  //   meta: {
  //     auth: false,
  //     nav: false,
  //     footer: false,
  //     zendeskWidget: false
  //   },
  //   component: h5index
  // },
  {
    path: '/activity/creation',
    name: 'creation',
    component: () => import(/* webpackChunkName: "creation" */ '@/pages/active/creation')
  },
  {
    path: '/activity/relay',
    name: 'relay',
    component: () => import(/* webpackChunkName: "relay" */ '@/pages/active/relay')
  },
  {
    path: '/lever',
    name: 'lever',
    component: () => import(/* webpackChunkName: "lever" */ '@/pages/lever')
  },
  {
    path: '/activity/lock',
    name: 'LockWarehouse',
    component: () => import(/* webpackChunkName: "LockWarehouse" */ '@/pages/active/LockWarehouse.vue')
  },
  {
    path: '/Guide',
    name: 'Guide',
    meta: {
      zendeskWidget: true,
      auth: false,
      footer: true,
      class: 'dark',
      nav: true
    },
    component: () => import(/* webpackChunkName: "home" */ '@/pages/Guide.vue')
  },
  {
    path: '/activity/invite-mine',
    name: 'InviteMineActivity',
    component: () => import(/* webpackChunkName: "InviteMineActivity" */ '@/pages/active/invite-mine')
  },
  {
    path: '/PrivacyPolicy',
    name: 'PrivacyPolicy',
    component: () => import(/* webpackChunkName: "PrivacyPolicy" */ '@/pages/PrivacyPolicy')
  },
  {
    path: '/PrivacyAgreement',
    name: 'PrivacyAgreement',
    component: () => import(/* webpackChunkName: "PrivacyPolicy" */ '@/pages/PrivacyAgreement')
  },
  {
    path: '/services',
    name: 'terms',
    component: () => import(/* webpackChunkName: "terms" */ '@/pages/terms')
  },
  {
    path: '/trading/:pair?',
    name: 'trading',
    meta: {
      auth: false,
      footer: true,
      nav: false
    },
    component: () => import(/* webpackChunkName: "Trading" */ '@/pages/Trading')
  // }, {
  //   path: '/tradingx/:pair?',
  //   name: 'tradingx',
  //   meta: {
  //     auth: false,
  //     footer: true,
  //     nav: false
  //   },
  //   component: () => import(/* webpackChunkName: "Trading" */ '@/views/Trading')
  // }, {
  //   path: '/mixx',
  //   name: 'mixx',
  //   meta: {
  //     auth: false,
  //     footer: true,
  //     nav: false
  //   },
  //   component: () => import(/* webpackChunkName: "Trading" */ '@/views/contract-mix1')
  // }, {
  //   path: '/blendx',
  //   name: 'blendx',
  //   meta: {
  //     auth: false,
  //     footer: true,
  //     nav: false
  //   },
  //   component: () => import(/* webpackChunkName: "Trading" */ '@/views/contract-blend')
  }, {
    path: '/RushBuy',
    name: 'RushBuy',
    meta: {
      auth: false,
      nav: true,
      footer: false,
      class: 'absolute'
    },
    component: () => import(/* webpackChunkName: "home" */ '@/pages/RushBuy.vue')
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
    component: () => import(/* webpackChunkName: "FundHistory" */ '@/components/Fund/order')
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
    component: () => import(/* webpackChunkName: "Download" */ '@/pages/download/download.vue')
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
    component: () => import(/* webpackChunkName: "Test1" */ '@/pages/test1.vue')
  },
  {
    path: '/affiliate',
    name: 'affiliate',
    meta: {
      auth: false,
      footer: true,
      nav: true,
      class: 'dark'
    },
    component: isMobile ? h5plan : plan
  },
  {
    path: '/h5-plan',
    name: 'h5plan',
    meta: {
      auth: false,
      nav: false,
      footer: false
    },
    component: h5plan
  },
  {
    path: '/plan',
    name: 'plan',
    meta: {
      auth: false,
      nav: false,
      footer: false
    },
    component: plan
  },
  {
    path: '/planSubmit',
    name: 'planSubmit',
    meta: {
      auth: false,
      footer: false,
      nav: false
    },
    component: isMobile ? h5planSubmit : planSubmit
  },
  {
    path: '/h5planSubmit',
    name: 'h5planSubmit',
    meta: {
      auth: false,
      nav: false,
      footer: false
    },
    component: h5planSubmit
  },
  {
    path: '/plan-submit',
    name: 'planSubmit',
    meta: {
      auth: false,
      nav: false,
      footer: false
    },
    component: planSubmit
  },
  {
    path: '/planSuccess',
    name: 'planSuccess',
    meta: {
      auth: true,
      footer: false,
      nav: false
    },
    component: isMobile ? h5submitNext : submitNext
  },
  {
    path: '/h5submitNext',
    name: 'h5submitNext',
    meta: {
      auth: false,
      nav: false,
      footer: false
    },
    component: h5submitNext
  },
  {
    path: '/submitNext',
    name: 'submitNext',
    meta: {
      auth: false,
      nav: false,
      footer: false
    },
    component: submitNext
  },
  {
    path: '/treaty',
    name: 'treaty',
    meta: {
      auth: false,
      footer: true,
      nav: true,
      class: 'dark'
    },
    component: isMobile ? h5treaty : treaty
  },
  {
    path: '/h5treaty',
    name: 'h5treaty',
    meta: {
      auth: true,
      footer: false,
      nav: false
    },
    component: h5treaty
  },
  {
    path: '/treaty',
    name: 'treaty',
    meta: {
      auth: true,
      footer: false,
      nav: false
    },
    component: treaty
  },
  {
    path: '/bonus',
    name: 'bonus',
    component: isMobile ?  () =>  import(/*  */ '@/pages/h5/bonus/index.vue') :  () =>  import(/*  */ '@/pages/Bonus.vue'),
    meta: {
      nav: isMobile ? false : true,
      footer:  isMobile ? false : true,
      class: 'dark'
    }
  },
  {
    path: '/bonus-app',
    name: 'bonus-app',
    component: () =>  import(/*  */ '@/pages/h5/bonus/app-bonus.vue'),
    meta: {
      nav: false,
      footer:  false
    }
  },
  {
    path: '/overseas',
    name: 'overseas',
    component: overseas,
    meta: {
      nav: false,
      footer:  false
    }
  },
  {
    path: '/overseas-next',
    name: 'overseas-next',
    component: overseasTip,
    meta: {
      nav: false,
      footer:  false
    }
  },
  {
    path: '/h5bonus',
    name: 'h5bonus',
    component: () =>  import(/*  */ '@/pages/h5/bonus/index.vue'),
    meta: {
      nav: false,
      footer:  false,
      class: 'dark'
    }
  }
]
