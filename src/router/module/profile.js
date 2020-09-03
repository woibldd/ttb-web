/**
 * User: zlccy/18768427422@163.com
 * Date: 2019-06-21 11:21
 */
import utils from '@/modules/utils'
const isMobile = utils.isMobile()
export const profileRouter = [
  {
    path: '/profile',
    name: 'profile',
    meta: {
      auth: true,
      nav: true,
      footer: true,
      class: 'dark',
      mobileNav: isMobile
    },
    redirect: 'profile/info', 
    // component: (isMobile && process.env.MODE === 'beta') ? MobileProfile : Profile
    component: () => import(/* webpackChunkName: "Profile" */ '@/pages/Profile'),
    children: [
      {
        path: 'invite',
        name: 'invite',
        component: () => import(/* webpackChunkName: "Invite" */ '@/pages/Invite')
      },
      {
        path: 'info',
        name: 'ProfileInfo',
        component: () => import(/* webpackChunkName: "ProfileInfo" */ '@/pages/ProfileInfo')
      },
      {
        path: 'MessageSettings',
        name: 'MessageSettings',
        component: () => import(/* webpackChunkName: "home" */ '@/pages/Profile/MessageSettings.vue')
      }, {
        path: '/fee-set',
        name: 'ServiceFeeSet',
        component: () => import(/* webpackChunkName: ServiceFeeSet */ '@/pages/Profile/ServiceFeeSet')
      },
      {
        path: 'api',
        name: 'ProfileApi',
        component: () => import(/* webpackChunkName: "ProfileApi" */ '@/pages/ProfileApi')
      },
      {
        path: 'security',
        name: 'ProfileSafety',
        component: () => import(/* webpackChunkName: "ProfileSafety" */ '@/pages/ProfileSafety'),
        redirect: 'security/summary',
        children: [
          {
            path: 'summary',
            name: 'Safety',
            component: () => import(/* webpackChunkName: "SecuritySummary" */ '@/pages/SecuritySummary')
          },
          {
            path: 'phone',
            name: 'PhoneBind',
            component: () => import(/* webpackChunkName: "PhoneBind" */ '@/pages/PhoneBind')
          },
          {
            path: 'email',
            name: 'EmailBind',
            component: () => import(/* webpackChunkName: "EmailBind" */ '@/pages/eBind')
          },
          {
            path: 'change_password',
            name: 'ModPwd',
            component: () => import(/* webpackChunkName: "ModPwd" */ '@/pages/ModPwd')
          },
          {
            path: '2fa',
            name: 'GoogleBind',
            component: () => import(/* webpackChunkName: "GoogleTitle" */ '@/pages/GoogleTitle')
          }
        ]
      },
      {
        path: 'kyc',
        name: 'Kyc',
        component: () => import(/* webpackChunkName: "Kyc" */ '@/pages/Profile/Kyc/index'),
        redirect: 'kyc/kyc_step1',
        children: [
          {
            path: 'kyc_step1',
            name: 'KycStep1',
            component: () => import(/* webpackChunkName: "SafeVerified" */ '@/pages/Profile/Kyc/kyc_step1')
          },
          {
            path: 'kyc_step2',
            name: 'KycStep2',
            component: () => import(/* webpackChunkName: "Authen" */ '@/pages/Profile/Kyc/kyc_step2')
          },
          {
            path: 'kyc_step3',
            name: 'KycStep3',
            component: () => import(/* webpackChunkName: "Authen" */ '@/pages/Profile/Kyc/kyc3')
          }
        ]
      }
    ]
  }
]
