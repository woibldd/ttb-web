import utils from '@/modules/utils';

const isMobile = utils.isMobile();

export default [
  {
    path: '/knowledgeBase', name: 'knowledgeBase',
    meta: {nav: isMobile ? false : true, class: 'dark'},
    redirect: '/knowledgeBase/index',
    component: () => import('@/pages/knowledgeBase/temp'),
    children: [
      {
        path: 'index', name: 'knowledgeBaseIndex',
        component: () => import('@/pages/knowledgeBase/index'),
      },
      {
        path: 'details', name: 'helpDetails',
        component: () => import('@/pages/knowledgeBase/details'),
      },
      {
        path: 'details2', name: 'helpDetails2',
        component: () => import('@/pages/knowledgeBase/details2'),
      },
      {
        path: 'searchResult', name: 'searchResult',
        component: () => import('@/pages/knowledgeBase/searchResult'),
      }
    ]
  }
]
