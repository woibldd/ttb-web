

export const otcRouter = [
  {
    path: '/notc',
    name: 'notc',
    component: () => import('@/views/otc-simple'), 
    meta: {
      nav: true,
      footer: false,
      class: 'dark',
      require: true
    },
    redirect: {name: 'quick'},
    children: [
      {
        path: 'quick',
        name: 'quick',
        component: () => import('@/views/otc-simple/components/quick'),
        meta: {
          require: true
        }
      },
      {
        path: 'quick-offer',
        name: 'quick-offer',
        component: () => import('@/views/otc-simple/components/quick-offer')
      },
      {
        path: 'trade',
        name: 'trade',
        component: () => import('@/views/otc-simple/components/trade')
      },
      {
        path: 'order',
        name: 'quick-order',
        component: () => import('@/views/otc-simple/components/order')
      },
      {
        path: 'bill',
        name: 'quick-bill',
        component: () => import('@/views/otc-simple/components/bill')
      },
      {
        path: 'collection',
        name: 'quick-collection',
        component: () => import('@/views/otc-simple/components/collection')
      }
    ]
  }
]