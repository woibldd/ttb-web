

export const otcHlRouter = [
  {
    path: '/hlotc',
    name: 'hlotc',
    component: () => import('@/views/otc-hl'), 
    meta: {
      nav: true,
      footer: false,
      class: 'dark',
      require: true
    },
    redirect: {name: 'hlquick'},
    children: [
      {
        path: 'quick',
        name: 'hlquick',
        component: () => import('@/views/otc-hl/components/quick'),
        meta: {
          require: true
        }
      },
      {
        path: 'quick-offer',
        name: 'hlquick-offer',
        component: () => import('@/views/otc-hl/components/quick-offer')
      },
      {
        path: 'trade',
        name: 'hltrade',
        component: () => import('@/views/otc-hl/components/trade')
      },
      {
        path: 'order',
        name: 'hlquick-order',
        component: () => import('@/views/otc-hl/components/order')
      },
      {
        path: 'bill',
        name: 'hlquick-bill',
        component: () => import('@/views/otc-hl/components/bill')
      },
      {
        path: 'collection',
        name: 'hlquick-collection',
        component: () => import('@/views/otc-hl/components/collection')
      }
    ]
  }
]