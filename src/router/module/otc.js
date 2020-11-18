

export const otcRouter = [
  {
    path: '/notc',
    name: 'notc',
    component: () => import('@/views/otc-new'),
    meta: {
      nav: true,
      footer: false,
      class: 'dark'
    },
    redirect: {name: 'quick'},
    children: [
      {
        path: 'quick-trade',
        name: 'quick',
        component: () => import('@/views/otc-new/components/quick')
      },
      {
        path: 'trade',
        name: 'trade'
      },
    ]
  }
]