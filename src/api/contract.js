
import request from '@/utils/request'
const I = process.env.VUE_APP_BASE_API_I
// const Q = process.env.VUE_APP_BASE_API_Q
export const getFutureDictionaryList = query => request({
  url: I + '/contract/symbol/list',
  method: 'post',
  params: query
})
export const getFutureListByKey = (key, query) => request({
  url: `https://q.ixex.pro/v1/deal/FUTURE_${key}USD`,
  method: 'get',
  params: query
})

// getQuoteOrderbook({ pair, accuracy, offset, size }) {
//   return quote(`orderbook/${pair}`, { offset, accuracy, size })
// },
