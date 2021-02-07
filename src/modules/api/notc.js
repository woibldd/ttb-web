import {getCache, request} from './api-base'
// import api from './../request'

export default {
  foreignAddress(params) {
    return request('otc/foreign/address', params)
  },  
  foreignSymbol(params) {
    return request('otc/account/currency/symbol', params)
  }, 
  simpleQuote(params) { 
    return request('simple/quote', {param:JSON.stringify(params)} )
  },
  simplePayment(params) {  
    return request('simple/data',  {param:JSON.stringify(params)})
  },
}