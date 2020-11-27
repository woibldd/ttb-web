import {getCache, request} from './api-base'
// import api from './../request'

// api.interceptors.request.use(config => { 
//   // config.headers['from'] = ''
//   // config.headers['lang'] = ''
//   config.headers['Authorization'] = 'ApiKey eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXJ0bmVyIjoiaXh4IiwiaXAiOlsiMS4yLjMuNCJdLCJzYW5kYm94Ijp0cnVlfQ.c2Omjl8HIWbr8WZRBKGjriQF7ryJikdicdcalPLAtwI'
//   return config
// }, error => {
//   // Do something with request error 
//   Promise.reject(error)
// })

// let baseUrl = 'https://sandbox.test-simplexcc.com/wallet/merchant/v2/'
// if (process.env.NODE_ENV != 'development') {
//   baseUrl = 'https://backend-wallet-api.simplexcc.com/wallet/merchant/v2/'
// }
export default {
  foreignAddress(params) {
    return request('otc/foreign/address', params)
  },  
  foreignSymbol(params) {
    return request('/otc/account/currency/symbol', params)
  }, 
  simpleQuote(params) {
    // params = { 
    //   "end_user_id": "940951",
    //   "digital_currency": "BTC",
    //   "fiat_currency": "USD",
    //   "requested_currency": "USD",
    //   "requested_amount": 100,
    //   "wallet_id": "ixx", 
    //   "payment_methods" : ["credit_card"] 
    // }
    // console.log('simpleQuote(params)')
    return request('simple/quote', {param:JSON.stringify(params)} )
  },
  simplePayment(params) {
    // params = { 
    //     "account_details": {
    //       "app_provider_id": "ixx",
    //       "app_version_id": "1.5.9",
    //       "app_end_user_id": "940951",
    //       "signup_login": {
    //         "ip": "47.74.187.186",
    //         "timestamp": "2020-11-13T14:42:24.832+08:00"
    //       }
    //     },
    //     "transaction_details": {
    //       "payment_details": {
    //         "quote_id": "d7f7e323-333f-4f6d-9f21-e47f5abb8e4b",
    //         "payment_id": "f5d552d3-8154-4efe-a7b1-c7cc18b3b5a4",
    //         "order_id": "f5d552d3-8154-4efe-a7b1-c7cc18b3b5a4",
    //         "destination_wallet": {
    //           "currency": "BTC",
    //           "address": "114ypEf2wDpW4sEsxANaTSk7eNusQWit7v",
    //           "tag": ""
    //         }
    //       },
    //       "original_http_ref_url": "https://ixxex.me/"
    //     }
    //   } 
    console.log(params)
    return request('simple/data',  {param:JSON.stringify(params)})
  },
  // quote(params) {
  //   params = {
  //     "end_user_id": "940951",
  //     "digital_currency": "BTC",
  //     "fiat_currency": "USD",
  //     "requested_currency": "USD",
  //     "requested_amount": 100,
  //     "wallet_id": "partner_name",
  //     "client_ip": "115.200.254.27",
  //     "payment_methods" : ["credit_card"] 
  //   }
  //   // return request(`${baseUrl}quote`, params, 'post')
  //   console.log('quote(params)')
  //   return api.post(`${baseUrl}quote`, params)
  // },
  // payment(params) {
  //   // {
  //   //   "account_details": {
  //   //     "app_provider_id": "ixx",
  //   //     "app_version_id": "1.5.9",
  //   //     "app_end_user_id": "940951",
  //   //     "signup_login": {
  //   //       "ip": "47.74.187.186",
  //   //       "timestamp": "2020-11-13T14:42:24.832+08:00"
  //   //     }
  //   //   },
  //   //   "transaction_details": {
  //   //     "payment_details": {
  //   //       "quote_id": "d7f7e323-333f-4f6d-9f21-e47f5abb8e4b",
  //   //       "payment_id": "f5d552d3-8154-4efe-a7b1-c7cc18b3b5a4",
  //   //       "order_id": "f5d552d3-8154-4efe-a7b1-c7cc18b3b5a4",
  //   //       "destination_wallet": {
  //   //         "currency": "BTC",
  //   //         "address": "114ypEf2wDpW4sEsxANaTSk7eNusQWit7v",
  //   //         "tag": ""
  //   //       }
  //   //     },
  //   //     "original_http_ref_url": "https://ixxex.me/"
  //   //   }
  //   // }
  //   return request(`${baseUrl}payments/partner/data`, params, '')
  // },
  // paymentsNew(params) {
  //   return request(`${baseUrl}payments/new`, params)
  // },
  // getEvents(params) {
  //   return request(`${baseUrl}events`, params, 'get')
  // },
  // deleteEvents(params) {
  //   return request(`${baseUrl}events/`, params, 'delete')
  // },


}