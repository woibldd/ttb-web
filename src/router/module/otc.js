

export const otcRouter = [
  {
    path: '/notc',
    name: 'notc',
    component: () => import('@/views/otc-new'), 
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
        component: () => import('@/views/otc-new/components/quick'),
        meta: {
          require: true
        }
      },
      {
        path: 'quick-offer',
        name: 'quick-offer',
        component: () => import('@/views/otc-new/components/quick-offer')
      },
      {
        path: 'trade',
        name: 'trade',
        component: () => import('@/views/otc-new/components/trade')
      },
    ]
  }
]