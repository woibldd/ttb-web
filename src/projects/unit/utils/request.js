import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getUser } from '../utils/auth'

// create an axios instance
// axios.defaults.withCredentials = true
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})
window._axiosPromiseArr = []
// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // if (!config.url.startsWith('http'))config.url = process.env.VUE_APP_BASE_API_I + config.url
    // const arr = config.url.split('/Q')
    // if (arr.length > 1)config.url = arr[arr.length - 1]
    const proxy_q = process.env.VUE_APP_PROXY_Q
    !config.url.includes(proxy_q) && (config.baseURL = process.env.VUE_APP_BASE_API)
    if (config.url.includes('q.ixex'))config.withCredentials = false
    const userDataStr = getUser()

    if (userDataStr) {
      const userData = JSON.parse(userDataStr)
      config.headers['token'] = userData.token
      // config.headers['SameSite'] = 'None'
      // config.headers['ix_session_id'] = store.state.userData.ix_session_id
    }
    // config.headers.Origin = 'https://staging.ixex.pro'

    config.headers['from'] = 'ixx'
    config.headers['lang'] = localStorage.getItem('locale') || 'zh-CN'

    config.cancelToken = new axios.CancelToken(cancel => {
      window._axiosPromiseArr.push({ cancel, noDelete: ['/user/session'].includes(config.url) })
    })
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200 && res.code !== 0) {
      if (res.code === 401) {
        Message({
          message: '登录信息失效,准备退出登录...',
          type: 'warning',
          duration: 3 * 1000
        })
        // setTimeout(() => {
        //   store.dispatch('loginout')
        // }, 3000)
      } else {
        if (res.message !== null) {
          Message({
            message: res.message || 'Server Error',
            type: 'error',
            duration: 5 * 1000
          })
        }
      }
      Message({
        message: res.message || 'Server Error',
        type: 'error',
        duration: 5 * 1000
      })
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      //   // to re-login
      //   MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
      //     confirmButtonText: 'Re-Login',
      //     cancelButtonText: 'Cancel',
      //     type: 'warning'
      //   }).then(() => {
      //     store.dispatch('user/resetToken').then(() => {
      //       location.reload()
      //     })
      //   })
      // }
      return Promise.reject(res.message)
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error, 1111) // for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    // window.location.href = `/#/404?redirect=${window.location.hash}`
    return Promise.reject(error)
  }
)

export default service
