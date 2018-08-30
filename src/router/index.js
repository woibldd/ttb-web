import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const Test1 = () => import(/* webpackChunkName: "Test1" */ '@/pages/test1.vue')
const Test2 = () => import(/* webpackChunkName: "Test2" */ '@/pages/test2.vue')

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Test1',
      component: Test1
    }, {
      path: '/test2',
      name: 'Test2',
      component: Test2
    }
  ]
})
