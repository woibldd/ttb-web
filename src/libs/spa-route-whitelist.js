
import {routes} from '@/router/index'
let staticRoutes = routes.slice(0)
function formatData (routes) {
  routes.map(r => {
    delete r.component
    delete r.meta
    delete r.redirect

    if (r.children) {
      r.children = formatData(r.children)
    }
    return r
  })
  return routes
}
staticRoutes = formatData(staticRoutes)
export default staticRoutes
