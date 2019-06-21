/**
 * User: zlccy/18768427422@163.com
 * Date: 2019-06-21 11:34
 */
import utils from '@/modules/utils'
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
  }
]
