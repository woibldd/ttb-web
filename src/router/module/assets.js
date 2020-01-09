/**
 * User: zlccy/18768427422@163.com
 * Date: 2019-06-12 10:05
 */
export const capitalRouter = [
  {
    path: '/fund',
    name: 'fund',
    component: () => import(/* webpackChunkName: "Fund" */ '@/pages/Fund'),
    redirect: {name: 'capital'},
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
        component: () => import(/* webpackChunkName: "FundAddress" */ '@/components/Fund/Transfer/transfer.vue')
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
              },
              {
                path: 'winloss-history',
                name: 'WinLossHistory',
                component: () => import(/* webpackChunkName: "Myfund" */ '@/components/Fund/contract/winloss-history')
              },
            ]
          },
          {
            path: 'assets',
            name: 'myAssets',
            component: () => import(/* webpackChunkName: "Myfund" */ '@/components/Fund/My/my.vue'),
            children: [
              {
                path: 'history/:from',
                name: 'assetsHistory',
                alias: 'deposit/:currency/history',
                component: () => import(/* webpackChunkName: "FundHistory" */ '@/components/Fund/history/history.vue')
              }
            ]
          }
        ]
      },
      {
        path: 'contractUnit',
        name: 'contractUnit',
        redirect: 'contractUnit/index',
        component: () => import(/* webpackChunkName: "FundAddress" */ '@/components/Fund/contractUnit/index.vue'),
        children: [
          {
            path: 'index/:currency?',
            name: 'contractUnitIndex',
            component: () => import(/* webpackChunkName: "Myfund" */ '@/components/Fund/contractUnit/contract.vue')
          },
          {
            path: 'history',
            name: 'contractUnitHistory',
            component: () => import(/* webpackChunkName: "Myfund" */ '@/components/Fund/contractUnit/history')
          },
          {
            path: 'assets-history',
            name: 'contractUnitHistory',
            component: () => import(/* webpackChunkName: "Myfund" */ '@/components/Fund/contractUnit/assets-history')
          },
          {
            path: 'winloss-history',
            name: 'contractUnitHistory',
            component: () => import(/* webpackChunkName: "Myfund" */ '@/components/Fund/contractUnit/winloss-history')
          }
        ]
      },
      {
        path: 'address/:currency?',
        name: 'address',
        component: () => import(/* webpackChunkName: "FundAddress" */ '@/components/Fund/Address/address.vue')
      },
      {
        path: 'capital',
        name: 'capital',
        component: () => import(/* webpackChunkName: "FundAddress" */ '@/pages/Capital/index.vue')
      },
      {
        path: 'bTrade',
        name: 'bTrade',
        component: () => import(/* webpackChunkName: "FundAddress" */ '@/pages/Capital/Trading.vue')
      },
      {
        path: 'fTrade',
        name: 'fTrade',
        component: () => import(/* webpackChunkName: "FundAddress" */ '@/pages/Capital/fTrading.vue')
      },
      {
        path: 'share',
        name: 'share',
        component: () => import(/* webpackChunkName: "FundAddress" */ '@/pages/Capital/share_history.vue')
      }
      // {
      //   path: 'hyTrade',
      //   name: 'hyTrade',
      //   redirect: 'hyTrade/index',
      //   component: () => import(/* webpackChunkName: "Myfund" */ '@/components/Fund/contract/contract.vue'),
      //   children: [
      //     {
      //       path: 'index/:currency?',
      //       name: 'contractIndex',
      //       component: () => import(/* webpackChunkName: "Myfund" */ '@/components/Fund/contract/contract.vue')
      //     }
      //   ]
      // }
    ]
  }
]
