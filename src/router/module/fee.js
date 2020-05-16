/**
 * User: zlccy/18768427422@163.com
 * Date: 2019-06-21 11:36
 */
import utils from '@/modules/utils'
const isMobile = utils.isMobile()
const Fee = () => import(/* webpackChunkName: "Fee" */ '@/pages/Fee')
const ContractFee = () => import(/* webpackChunkName: "ContractFee" */ '@/components/Fee/contractFee')
const TradingFee = () => import(/* webpackChunkName: "tradingFee" */ '@/components/Fee/tradingFee') 
const UnitContractFee = () => import(/* webpackChunkName: "tradingFee" */ '@/components/Fee/unitContractFee')
const MixContractFee = () => import(/* webpackChunkName: "tradingFee" */ '@/components/Fee/mixContractFee')
export const feeRouter = [
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
        component: TradingFee
      },
      {
        path: 'contractFee',
        name: 'ContractFee',
        component: ContractFee
      },
      {
        path: 'unitContractFee',
        name: 'UnitContractFee',
        component: UnitContractFee
      },
      {
        path: 'mixContractFee',
        name: 'MixContractFee',
        component: MixContractFee
      }
    ]
  }
]
