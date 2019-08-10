/**
 * User: zlccy/18768427422@163.com
 * Date: 2019-06-21 11:27
 */
export const materialRouter = [
  {
    path: '/material',
    name: 'Material',
    component: () => import(/* webpackChunkName: "ContractMaterial" */ '@/pages/material'),
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
        component: () => import(/* webpackChunkName: "ContractMaterial" */ '@/components/Material/fee-history')
      },
      {
        path: 'ensurance-fund',
        name: 'EnsuranceFund',
        component: () => import(/* webpackChunkName: "ContractMaterial" */ '@/components/Material/ensurance')
      },
      {
        path: 'trade-index/:pair?',
        name: 'TradeIndex',
        component: () => import(/* webpackChunkName: "ContractMaterial" */ '@/components/Material/trade-index')
      }
    ]
  }
]
