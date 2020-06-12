import request from '../utils/request'
export const getPropertyAccountList = (data) => request({
  url: '/account/wallet/list',
  method: 'post',
  data
})

// 划转记录 POST /account/balance/finance/list
export const getFinanceList = (data = { page: 1, size: 10 }) => request({
  url: '/account/balance/finance/list',
  method: 'post',
  data
})
// 获取充值记录 POST /account/deposit/list
export const getDepositList = (data = { page: 1, size: 10 }) => request({
  url: '/account/deposit/list',
  method: 'post',
  data
})
// 获取提现记录 POST /account/withdraw/list
export const getWithdrawList = (data = { page: 1, size: 10 }) => request({
  url: '/account/withdraw/list',
  method: 'post',
  data
})
// 获取奖励分配 POST /account/candy/list

export const getCandyList = (data = { page: 1, size: 10 }) => request({
  url: '/account/candy/list',
  method: 'post',
  data
})
// 获取奖励分配 POST /mine/invite/list
export const getInviteList = (data = { page: 1, size: 10 }) => request({
  url: '/mine/invite/list',
  method: 'post',
  data
})
// 划转 POST /future/account/transfer
/* amount: "111"
currency: "BTC"
from: 1
to: 2
type: 1 */
export const transferAccount = (data = { page: 1, size: 10 }) => request({
  url: '/future/account/transfer',
  method: 'post',
  data
})
// 资金划转新接口
export const transferSelf = (data) => request({
  url: 'account/balance/transfer/self',
  method: 'post',
  data
})

// 法币账户 POST /otc/account/balance/list
export const getlegalTenderBalanceList = (data = { page: 1, size: 10 }) => request({
  url: '/otc/account/balance/list',
  method: 'post',
  data
})
// 币币账户 POST /account/balance/list
export const getCoinsBalanceList = (data = { page: 1, size: 10 }) => request({
  url: '/account/balance/list',
  method: 'post',
  data
})
// 币币账户历史记录 POST /account/balance/list
export const getCoinsBalanceHistoryList = (data = { page: 1, size: 10 }) => request({
  url: '/fee/transaction/history',
  method: 'post',
  data
})
// 合约账户 POST /future/account/balance/list
export const getFutureBalanceList = (data = { page: 1, size: 10 }) => request({
  url: '/future/account/balance/list',
  method: 'post',
  data
})
// 合约账户交易历史 POST /contract/orderhistory
export const getFutureBalanceHistoryList = (data = { page: 1, size: 10 }) => request({
  url: '/contract/orderhistory',
  method: 'post',
  data
})
// 合约账户财务记录 POST /future/account/fund/history
export const getFutureRecordList = (data = { page: 1, size: 10 }) => request({
  url: '/future/account/fund/history',
  method: 'post',
  data
})
// 币本位账户 POST /future/account/balance/list
export const getUnitBalanceList = (data = { page: 1, size: 10 }) => request({
  url: '/unit/account/balance/list',
  method: 'post',
  data
})
// 币本位账户交易历史 POST /contract/orderhistory
export const getUnitBalanceHistoryList = (data = { page: 1, size: 10 }) => request({
  url: '/unit/orderhistory',
  method: 'post',
  data
})
// 币本位账户财务记录 POST /future/account/fund/history
export const getUnitRecordList = (data = { page: 1, size: 10 }) => request({
  url: '/unit/account/fund/history',
  method: 'post',
  data
})
// // 急速账户 POST /future/account/balance/list
// export const getShareBalanceList = (data = { currencys: [] }) => request({
//   url: '/opt/account/balance',
//   method: 'post',
//   data
// })
// 提币币种列表 POST /account/currency/list
export const getCurrencyList = (data) => request({
  url: '/account/currency/list',
  method: 'post',
  data
})
// 获取充币地址 POST /account/address/query
// - 参数
//   - chain
//   - currency
// - 返回值
//   - code(200表示正常读取data内容，非200则表示失败读取message失败信息)
//   - data(user_id/chain/currency/address)
//   - message
export const getCurrencyAddress = data => request({
  url: '/account/address/query',
  method: 'post',
  data
})
// 法币账单 POST /otc/account/balancefills
/* type 收款方式id
currency
begin_stamp
end_stamp
page
size */
export const getOtcHistory = (data) => request({
  url: '/otc/account/balancefills',
  method: 'post',
  data
})
// 法币账单 POST /otc/account/balancefills
/* type 收款方式id
currency
begin_stamp
end_stamp
page
size */
export const getCoinsHistory = (data) => request({
  url: '/otc/account/balancefills',
  method: 'post',
  data
})
// 法币账单 POST /otc/account/balancefills
/* type 收款方式id
currency
begin_stamp
end_stamp
page
size */
export const getFutureHistory = (data) => request({
  url: '/contract/orderhistory',
  method: 'post',
  data
})
// 法币账单 POST /otc/account/balancefills
/* type 收款方式id
currency
begin_stamp
end_stamp
page
size */
export const getShareHistory = (data) => request({
  url: '/otc/account/balancefills',
  method: 'post',
  data
})
