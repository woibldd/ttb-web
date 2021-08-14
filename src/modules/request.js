import axios from 'axios'
import qs from 'querystring'
import { state, actions} from './store'
// let _env_ = qs.parse(location.search.replace('?', ''))._env_

// const api = axios.create({
//   baseURL: _env_ || process.env.BASE_API, // api的base_url
//   timeout: 30000, // request timeout
//   withCredentials: true
// })
let _env_ = ''
let _from = 'ixx'
if(process.env.NODE_ENV != 'development'){
  let val = location.host.split('.')
  _env_ = val.slice(val.length - 2, val.length).join('.')
  _env_ = `https://i.${_env_}/`
  // _env_ = `https://i.ixex.io/`
  // _env_ = `https://i.ixex.pro/`
}

const api = axios.create({
  baseURL: _env_ || process.env.BASE_API,
  timeout: 30000, // request timeout
  withCredentials: true
})
// console.log("_env_:" + _env_)
export const envApi = _env_
export const quotaApi = axios.create({
  baseURL: _env_ || process.env.BASE_API, // api的base_url
  timeout: 30000, // request timeout
  withCredentials: false
})

// request interceptor
api.interceptors.request.use(config => { 
  let token = actions.getToken() 
  if (token) {
    // 服务端准备好 就可以上token了
    config.headers['token'] = token
  }
  config.headers['from'] = _from
  // config.headers['from'] = 'ixx'
  // config.headers['lang'] = state.locale
  return config
}, error => {
  // Do something with request error 
  Promise.reject(error)
})

api.interceptors.response.use(response => {
  return response.data
})

export default api
