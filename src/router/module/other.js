/**
 * User: zlccy/18768427422@163.com
 * Date: 2019-06-21 11:38
 */
import utils from '@/modules/utils'
const isMobile = utils.isMobile()
// const guide = () => import(/* webpackChunkName: "h5index" */ '@/pages/h5/index')
const h5index = () => import(/* webpackChunkName: "h5index" */ '@/pages/h5/index')
const HomeNew = () => import(/* webpackChunkName: "home" */ '@/pages/home_new.vue')
export const otherRouter = [
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
    component: () => import(/* webpackChunkName: "h5login" */ '@/pages/h5/sign-up')
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
    path: '/myorder-new',
    name: 'MyOrderNew',
    component: () => import(/* webpackChunkName: "MyOrderNew" */ '@/pages/MyOrderNew'),
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
        component: () => import(/* webpackChunkName: "MyOrderNew" */ '@/components/MyOrderNew/bibi')
      }
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
  }
]
