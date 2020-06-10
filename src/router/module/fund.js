/**
 * User: zlccy/18768427422@163.com
 * Date: 2019-06-21 10:49
 */
export const fundRouter = [
  {
    path: '/fund',
    name: 'fund',
    component: () => import(/* webpackChunkName: "Fund" */ '@/pages/Fund'),
    redirect: {name: 'my'},
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
        component: () => import(/* webpackChunkName: "FundWithdraw" */ '@/components/Fund/Withdraw/Withdraw.vue')
      },
      {
        path: 'Transfer',
        name: 'transfer',
        component: () => import(/* webpackChunkName: "Fund" */ '@/components/Fund/Transfer/transfer')
      },
      {
        path: 'TransferModal',
        name: 'transferModal',
        component: () => import(/* webpackChunkName: "FundAddress" */ '@/components/Fund/contract/transfer-modal.vue')
      },
      {
        path: 'deposit/:currency?',
        name: 'deposit',
        component: () => import(/* webpackChunkName: "FundDeposit" */ '@/components/Fund/deposit/deposit.vue')
      },
      {
        path: 'my',
        name: 'my',
        component: () => import(/* webpackChunkName: "Myfund" */ '@/components/Fund/My/my-template.vue'),
        redirect: 'capital',
        children: [
          {
            path: 'contract',
            name: 'contract',
            redirect: 'contract/index',
            component: () => import(/* webpackChunkName: "Myfund" */ '@/components/Fund/contract'),
            children: [
              {
                path: 'index/:currency?',
                name: 'contractIndex',
                component: () => import(/* webpackChunkName: "Myfund" */ '@/components/Fund/contract/contract.vue')
              },
              {
                path: 'history',
                name: 'ContractHistory',
                component: () => import(/* webpackChunkName: "Myfund" */ '@/components/Fund/contract/history')
              },
              {
                path: 'assets-history',
                name: 'AssetsHistory',
                component: () => import(/* webpackChunkName: "Myfund" */ '@/components/Fund/contract/assets-history')
              }
            ]
          },
          // {
          //   path: 'assets',
          //   name: 'myAssets',
          //   component: () => import(/* webpackChunkName: "Myfund" */ '@/components/Fund/My/my.vue'),
          //   children: [
          //     {
          //       path: 'history/:from',
          //       name: 'assetsHistory',
          //       alias: 'deposit/:currency/history',
          //       component: () => import(/* webpackChunkName: "FundHistory" */ '@/components/Fund/history/history.vue')
          //     }
          //   ]
          // }
        ]
      },
      {
        path: 'address/:currency?',
        name: 'address',
        component: () => import(/* webpackChunkName: "FundAddress" */ '@/components/Fund/Address/address.vue')
      }
    ]
  }
]
