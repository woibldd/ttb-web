import axios from 'axios'
import qs from 'querystring'

let _env_ = qs.parse(location.search.replace('?', ''))._env_

const api = axios.create({
  baseURL: _env_ || process.env.BASE_API, // api的base_url
  timeout: 30000, // request timeout
  withCredentials: true
})

// request interceptor
api.interceptors.request.use(config => {
  // Do something before request is sent
  // if (store.getters.token) {
  //   config.headers['X-Token'] = getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  // }
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
