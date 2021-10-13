
export const newFundRouter = [
  {
    path: '/nfund',
    name: 'new-fund',
    component: () => import ('@/views/fund/index'),
    redirect: {name: 'new-my'},
    meta: {
      auth: true,
      footer: true,
      nav:true,
      class:'dark'
    },
    children: [
      {
        path: 'withdraw/:currency?',
        name: 'new-withdraw',
        component: () => import('@/views/fund/components/withdraw/Withdraw.vue')
      },
      {
        path: 'deposit/:currency?',
        name: 'new-deposit',
        component: () => import('@/views/fund/components/deposit/deposit.vue')
      },
      {
        path: 'address/:currency?',
        name: 'new-address',
        component: () => import('@/views/fund/components/address/address.vue')
      },
      {
        path: 'transfer',
        name: 'new-transfer',
        component: () => import('@/views/fund/components/transfer/transfer.vue')
      },
      {
        path:'my',
        name: 'new-my',
        component: () => import('@/views/fund/components/my'),
        redirect: {name: 'new-assetsAccount'},
        children: [
          {
            path: 'assets',
            name: 'new-assetsAccount',
            component: () => import('@/views/fund/components/my/assets'),
          },
          {
            path: 'otc',
            name: 'new-otcAccount',
            component: () => import('@/views/fund/components/my/otc')
          },
          {
            path: 'trading',
            name: 'new-tradingAccount',
            component: () => import('@/views/fund/components/my/trading')
          },
          {
            path: 'future',
            name: 'new-futureAccount',
            component: () => import('@/views/fund/components/my/future')
          },
          {
            path: 'unit',
            name: 'new-unitAccount',
            component: () => import('@/views/fund/components/my/unit')
          },
          {
            path: 'mix',
            name: 'new-mixAccount',
            component: () => import('@/views/fund/components/my/mix'),
          },
          {
            path: 'blend',
            name: 'new-blendAccount',
            component: () => import('@/views/fund/components/my/blend')
          }

        ]
      }
    ]
  }
]