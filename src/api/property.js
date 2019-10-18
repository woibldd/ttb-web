import request from '@/utils/request'
export const getPropertyAccountList = () => request({
  url: '/account/wallet/list',
  method: 'post'
})
