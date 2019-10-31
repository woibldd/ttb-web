import request from '@/utils/request'

export const insertCoinApply = data => request({
  url: '/future/activity/currencyApply/insert',
  method: 'post',
  data
})
export const getPolicy = () => request({
  url: 'user/kyc/oss/policy_currency_apply',
  method: 'post'
})
export const whiteBookActionUrl = process.env.VUE_APP_BASE_API_I + '/future/activity/currencyApply/upload'

