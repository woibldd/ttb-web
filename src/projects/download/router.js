import Vue from 'vue'
import Router from 'vue-router'
const Index = () => import(/* webpackChunkName: "project-index" */ './index.vue')
const IOSTurorial = () => import(/* webpackChunkName: "project-index" */ './ios-tutorial.vue')

Vue.use(Router)
let router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/tutorial',
      component: IOSTurorial,
      name: 'IOSTurorial'
    }

  ]
})

export default router
