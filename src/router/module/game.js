/**
 * User: zlccy/18768427422@163.com
 * Date: 2019-06-21 11:34
 */
import utils from '@/modules/utils'
import Bid from '@/pages/Bid/index.vue'
import BidDetail from '@/pages/views/Bid/detail.vue'
const isMobile = utils.isMobile()
// 合约大赛
const CompetitionH5 = () => import(/* webpackChunkName: "CompetitionH5" */ '@/pages/h5/competition')
const Competition = () => import(/* webpackChunkName: "Competition" */ '@/pages/ContractCompetition.vue')
const CompetitionApp = () => import(/* webpackChunkName: "CompetitionApp" */ '@/pages/h5/competition/indexApp.vue')
export const gameRouter = [
  {
    path: '/play',
    name: 'play',
    meta: {
      nav: false,
      footer: false,
      class: 'dark'
    },
    component: isMobile ? CompetitionH5 : Competition
  },
  {
    path: '/play-h5',
    name: 'play-h5',
    meta: {
      nav: false,
      footer: false,
      class: 'dark'
    },
    component: CompetitionApp
  },
  {
    path: '/bid',
    name: 'Bid',
    component: Bid,
    meta: {
      require: false
    }
  },
  {
    path: '/bidDetail',
    name: 'BidDetail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: BidDetail
  }
]
