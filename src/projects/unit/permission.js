import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getUser } from './utils/auth' // get token from cookie
import getPageTitle from './utils/get-page-title'
// import { getSession } from './api/user'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/user/login', '/user/register', '/user/forget'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.matched[0].meta && to.matched[0].meta.title)

  // determine whether the user has logged in
  const user = getUser()
  if (user) {
    if (to.path === '/user/login') {
      // if is logged in, redirect to the home page
      next({ path: '/user/index' })
      NProgress.done()
    } else {
      if (!store.state.userData) {
        const userData = JSON.parse(user)
        store.commit('SET_USERDATA', userData)
        // getSession().then(res => {
        //   console.log(res)
        // })
        // store.dispatch('getShareAccountList', userData.id).then(res => next())
        // const res = await getShareAccountList(userData.id).catch(res => removeUser())
        // userData.mapShareAccount = res.data
      }
      // to.query.redirect && next({ path: to.query.redirect }) || next()
      next()
      // if (!store.state.userData)store.commit('SET_USERDATA', JSON.parse(user))

      // determine whether the user has obtained his permission roles through getInfo
      // const hasRoles = store.getters.roles && store.getters.roles.length > 0
      // if (hasRoles) {
      //   next()
      // } else {
      //   try {
      //     // get user info
      //     // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
      //     const { roles } = await store.dispatch('user/getInfo')

      //     // generate accessible routes map based on roles
      //     const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

      //     // dynamically add accessible routes
      //     router.addRoutes(accessRoutes)

      //     // hack method to ensure that addRoutes is complete
      //     // set the replace: true, so the navigation will not leave a history record
      //     next({ ...to, replace: true })
      //   } catch (error) {
      //     // remove token and go to login page to re-login
      //     await store.dispatch('user/resetToken')
      //     Message.error(error || 'Has Error')
      //     next(`/login?redirect=${to.path}`)
      //     NProgress.done()
      //   }
      // }
    }
  } else {
    /* has no token */
    // && to.path.meta && to.path.meta.needSign
    // const user = await getSession()

    if (whiteList.includes(to.path) || !to.matched[0].meta || !to.matched[0].meta.needSign) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/user/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  window._axiosPromiseArr && window._axiosPromiseArr.forEach((item, index) => {
    if (!item.noDelete) {
      item && item.cancel()
      delete window._axiosPromiseArr[index]
    }
  })
  NProgress.done()
})

if ('Promise' in window) {
  window.Promise.prototype.finally = function (callback) {
    let constructor = this.constructor
    return this.then(
      function (value) {
        return constructor.resolve(callback()).then(function () {
          return value
        })
      },
      function (reason) {
        return constructor.resolve(callback()).then(function () {
          throw reason
        })
      }
    )
  }
} else {
  window.Promise = function () {
    console.log('polifill')
  }
  window.Promise.prototype.finally = function () {
    console.log('polifill finally')
  }
}
(function () {
  if (document.scrollingElement) {
    return
  }
  let element = null
  function scrollingElement () {
    if (element) {
      return element
    } else if (document.body.scrollTop) {
      // speed up if scrollTop > 0
      return (element = document.body)
    }
    let iframe = document.createElement('iframe')
    iframe.style.height = '1px'
    document.documentElement.appendChild(iframe)
    let doc = iframe.contentWindow.document
    doc.write('<!DOCTYPE html><div style="height:9999em">x</div>')
    doc.close()
    let isCompliant = doc.documentElement.scrollHeight > doc.body.scrollHeight
    iframe.parentNode.removeChild(iframe)
    return (element = isCompliant ? document.documentElement : document.body)
  }
  Object.defineProperty(document, 'scrollingElement', {
    get: scrollingElement
  })
})()
