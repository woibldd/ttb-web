import Vue from 'vue'
import Router from 'vue-router'
import utils from '@/modules/utils'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const isMobile = utils.isMobile()

const Test1 = () => import(/* webpackChunkName: "Test1" */ '@/pages/test1.vue')
const Test2 = () => import(/* webpackChunkName: "Test2" */ '@/pages/test2.vue')
const Trading = () => import(/* webpackChunkName: "Trading" */ '@/pages/Trading')
const Profile = () => import(/* webpackChunkName: "Profile" */ '@/pages/Profile')
// const MobileProfile = () => import(/* webpackChunkName: "MobileProfile" */ '@/pages/MobileProfile')

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Test1',
      meta: {
        auth: false
      },
      component: Test1
    }, {
      path: '/test2',
      name: 'Test2',
      component: Test2
    }, {
      path: '/trading',
      name: 'trading',
      meta: {
        zendeskWidget: false,
        auth: false,
        footer: false,
        nav: false
      },
      component: Trading
    }, {
      path: '/profile',
      name: 'profile',
      meta: {
        auth: true,
        nav: !isMobile,
        mobileNav: isMobile
      },
      // component: (isMobile && process.env.MODE === 'beta') ? MobileProfile : Profile
      component: Profile
    }
  ]
})
