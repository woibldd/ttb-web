/**
 * User: zlccy/18768427422@163.com
 * Date: 2019-06-21 10:49
 */
export const tradeRouter = [
  {
    path: '/OTC',
    name: 'OTC',
    redirect: '/OTC/Trade',
    meta: {
      require: true,
      nav: true,
      footer: true,
      class: 'dark'
    },
    // component: _import('pages/OTC'),
    component: () => import(/* webpackChunkName: "Fund" */ '@/pages/OTC'),
    children: [
      {
        path: 'trade',
        name: 'trade',
        component: () => import(/* webpackChunkName: "Fund" */ '@/components/OTC/Trade'),
      },
      {
        path: 'FrenchBill',
        name: 'FrenchBill',
        component: () => import(/* webpackChunkName: "Fund" */ '@/pages/Capital/FrenchBill'),
      },
      {
        path: 'Transfer',
        name: 'Transfer',
        component: () => import(/* webpackChunkName: "Fund" */ '@/components/Fund/Transfer/transfer'),
        meta: {
          require: true
        }
      },
      {
        path: 'collection',
        name: 'collection',
        component: () => import(/* webpackChunkName: "Fund" */ '@/pages/Profile/collection'),
        meta: {
          require: true
        }
      },
      {
        path: 'Hir',
        name: 'Hir',
        component: () => import(/* webpackChunkName: "Fund" */ '@/pages/StepTable/index'),
        meta: {
          require: true
        }
      },
      {
        path: 'contractFee',
        name: 'ContractFee',
        component: () => import(/* webpackChunkName: "ContractFee" */ '@/components/Fee/contractFee')
      }
    ]
  }
]
