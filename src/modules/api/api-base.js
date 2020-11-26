
import api from './../request'
import { quotaApi } from './../request'
import config from '@/libs/config'
import utils from '@/modules/utils'
const cache = {}
 
export async function fetch(url, body, options, method = 'post') {
  try {
    let res
    if (method === 'get') {
      res = await api.get(url, { params: body }, options)
    } else {
      res = await api.post(url, body, options)
    }
    const data = res // .json()
    if (data.code === 401 && state.userInfo) {
      // Session 失效
      actions.setUserInfo(null)
      if (utils.getRouteMeta(utils.$app.$route, 'auth')) {
        actions.setLoginBack(utils.$app.$route)
        utils.$app.$router.push({
          name: 'login'
        })
        return data
      }
    }
    if (data.code == 200) {
      data.code = 0
    }
    
    // if (data.status == 200) {
    //   data.status = 0
    // }
    if (data.code && !data.message) {
      data.message = 'Error ' + data.code
    }
    return data
  } catch (err) {
    utils.logE(err)
    if (err.url && err.status === 0) {
      return {
        code: -1,
        message: utils.$app && utils.$app.$i18n.t('err_timeout'),
        data: null
      }
    }
    return {
      code: -2,
      message: utils.$app && utils.$app.$i18n.t('err_network'),
      data: null
    }
  }
}

export async function fetchQuota(url, body, options, method = 'post') {
  try {
    let res
    if (method === 'get') {
      res = await quotaApi.get(url, { params: body }, options)
    } else {
      res = await quotaApi.post(url, body, options)
    }
    const data = await res // .json()
    if (data.code === 401 && state.userInfo) {
      // Session 失效
      actions.setUserInfo(null)
      if (utils.getRouteMeta(utils.$app.$route, 'auth')) {
        actions.setLoginBack(utils.$app.$route)
        utils.$app.$router.push({
          name: 'login'
        })
        return data
      }
    }

    if (data.code == 200) {
      data.code = 0
    }
    if (data.code && !data.message) {
      data.message = 'Error ' + data.code
    }
    return data.data
  } catch (err) {
    utils.logE(err)
    if (err.url && err.status === 0) {
      return {
        code: -1,
        message: utils.$app && utils.$app.$i18n.t('err_timeout'),
        data: null
      }
    }
    return {
      code: -2,
      message: utils.$app && utils.$app.$i18n.t('err_network'),
      data: null
    }
  }
}

export function request(url, body, options) { 
  return fetch(url, body, options)
}

export function quote(url, body, options) {
  return fetchQuota(config.quoteUrl + url, body, options, 'get')
} 

export function getCache(key, promiseGetter, ttl = 0) {
  if (!cache[key] || (cache[key].expired && cache[key].expired < new Date())) {
    cache[key] = {
      promise: promiseGetter(),
      expired: ttl ? +new Date() + ttl : 0
    }
  }
  cache[key].promise.then((res) => {
    if (res.code < 0) {
      rmCache(key)
    }
  })
  return cache[key].promise
}
 


function rmCache(key) { 
  delete cache[key]
}