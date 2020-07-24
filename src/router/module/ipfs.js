export const ipfsRouter = [
  {
    path: '/mining-power',
    name: 'ipfs',
    meta: {
      nav: true,
      footer: true,
      class: 'dark'
    },
    component: () => import('@/views/ipfs/index.vue')
  },
  {
    path: '/mining-power-detail',
    name: 'ipfs-detail',
    meta: {
      nav: true,
      footer: true,
      class: 'dark'
    },
    component: () => import('@/views/ipfs/details')
  }, 
]