export const ipfsRouter = [
  {
    path: '/ipfs',
    name: 'ipfs',
    meta: {
      nav: true,
      footer: true,
      class: 'dark'
    },
    component: () => import('@/views/ipfs/index.vue')
  },
  {
    path: '/ipfs-detail',
    name: 'ipfs-detail',
    meta: {
      nav: true,
      footer: true,
      class: 'dark'
    },
    component: () => import('@/views/ipfs/details')
  }, 
]