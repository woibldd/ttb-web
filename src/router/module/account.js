/**
 * User: zlccy/18768427422@163.com
 * Date: 2019-06-21 10:49
 */
export const accountRouter = [
  {
    path: '/user',
    name: 'account',
    meta: {
      auth: false,
      nav: true,
      class: 'login'
    },
    component: () => import(/* webpackChunkName: "home" */ '@/pages/Account'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "Login" */ '@/pages/Login'),
        redirect: 'login/email'
      },
      {
        path: 'login/:by',
        name: 'loginBy',
        component: () => import(/* webpackChunkName: "Login" */ '@/pages/Login'),
        props: true
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "Register" */ '@/pages/Register'),
        redirect: 'register/email'
      },
      {
        path: 'register/:by',
        name: 'registerBy',
        component: () => import(/* webpackChunkName: "Register" */ '@/pages/Register'),
        props: true
      },
      {
        path: 'recover',
        name: 'recover',
        component: () => import(/* webpackChunkName: "Register" */ '@/pages/user/recover/recover.vue'),
        redirect: 'recover/email',
        props: true
      },
      {
        path: 'recover/:by?',
        name: 'recoverBy',
        component: () => import(/* webpackChunkName: "Register" */ '@/pages/user/recover/recover.vue'),
        props: true
      },
      {
        path: 'nc',
        name: 'nc',
        component: () => import(/* webpackChunkName: "Register" */ '@/pages/nc'),
        props: true
      }
    ]
  }
]
