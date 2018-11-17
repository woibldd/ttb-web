import axios from 'axios'
import qs from 'querystring'
import { actions} from './store'

let _env_ = qs.parse(location.search.replace('?', ''))._env_

const api = axios.create({
  baseURL: _env_ || process.env.BASE_API, // api的base_url
  timeout: 30000, // request timeout
  withCredentials: true
})
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
  config.headers['from'] = 'ixx'
  return config
}, error => {
  // Do something with request error
  // console.log(error) // for debug
  Promise.reject(error)
})

api.interceptors.response.use(response => {
  return response.data
})

export default api
