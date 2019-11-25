import request from '@/utils/request'

// export const checkEmail = email => request({
//   url: '/user/email/check',
//   method: 'post',
//   data: { email, region: 86 }
// })
export const loginByEmail2 = (email, code) => request({
  url: '/user/login/email2',
  method: 'post',
  data: { code, email }
})

export const loginByPhone2 = (phone, code) => request({
  url: '/user/login/phone2',
  method: 'post',
  data: { code, phone }
})

export const loginByEmail = data => request({
  url: '/user/login/email',
  method: 'post',
  data
})
export const loginByPhone = data => request({
  url: '/user/login/phone',
  method: 'post',
  data
})

export const getEmailCode = email => request({
  url: '/user/login/email/code',
  method: 'post',
  data: {
    email
  }
})
export const getPhoneCode = phone => request({
  url: '/user/login/phone/code',
  method: 'post',
  data: {
    phone,
    region: 86
  }
})

export const loginout = () => request({
  url: '/user/logout',
  method: 'post'
})

export const getHistorys = () => request({
  url: '/user/login/history',
  method: 'post'
})
export const getSession = () => request({
  url: '/user/session',
  method: 'post'
})
// account/wallet/list
export const activity = data => request({
  url: '/future/activity/message/list',
  method: 'post',
  data
})
export const getCollect1 = data => request({
  url: '/future/activity/message/getCollect',
  method: 'post',
  data
})
export const collectActivity = data => request({
  url: '/future/activity/message/collect',
  method: 'post',
  data
})
export const symbolList = (data) => request({
  url: '/account/currency/rates',
  method: 'post',
  data
})
export const getList = (data) => request({
  url: '/future/activity/news/getList',
  method: 'post',
  data
})

