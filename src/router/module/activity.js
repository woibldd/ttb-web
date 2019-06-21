/**
 * User: zlccy/18768427422@163.com
 * Date: 2019-06-21 11:30
 */
export const activityRouter = [
  {
    path: '/activity',
    name: 'activity',
    component: () => import(/* webpackChunkName: "ActivityIndex" */ '@/pages/active/index.vue'),
    meta: {
      class: 'dark'
    },
    children: [
      {
        path: 'kyc_relay',
        name: 'kycRelay',
        component: () => import(/* webpackChunkName: "KycRelay" */ '@/pages/active/kycRelay.vue')
      },
      {
        path: 'livermore',
        name: 'lottery',
        component: () => import(/* webpackChunkName: "lottery" */ '@/pages/active/lottery')
      }
    ]
  }
]
