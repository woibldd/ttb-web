import Vue from 'vue'
import Router from 'vue-router'
const Index = () => import(/* webpackChunkName: "project-index" */ './index.vue')

Vue.use(Router)
let router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/:source?',
      name: 'index',
      component: Index
    }
  ]
})

export default router
