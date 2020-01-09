import Vue from 'vue'
import Router from 'vue-router'
import layout from '../layout/index'

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: layout,
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('../views/home/index')
        }
      ]
    },
    {
      path: '/legalTender',
      component: layout,
      name: 'legalTender',
      children: [
        {
          path: '/legalTender/index',
          component: () => import('../views/legalTender')
        }
      ]
    },
    {
      path: '/legalTender',
      // redirect: '/home',
      component: layout,
      name: 'legalTender',
      children: [
        {
          path: '/legalTender/index',
          component: () => import('../views/legalTender')
        }
      ]
    },
    {
      path: '/legalTender',
      // redirect: '/home',
      component: layout,
      name: 'legalTender',
      children: [
        {
          path: '/legalTender/index',
          component: () => import('../views/legalTender')
        }
      ]
    },
    {
      path: '/legalTender',
      redirect: '/legalTender/index',
      component: layout,
      name: 'legalTender',
      children: [
        {
          path: '/legalTender/index',
          component: () => import('../views/legalTender')
        }
      ]
    }

  ]
})
