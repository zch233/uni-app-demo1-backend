import { getRouter } from '@/api/user'
import { constantRoutes } from '@/router'
import { routerMap } from '@/router/routerMap'

function sortRouter(router) {
  const result = []
  router.map(item => {
    const children = []
    const fatherRouterInfo = item.authAction
    item.sublevelMenus.map(child => {
      const childRouterInfo = child.authAction
      const singleRouter = routerMap[childRouterInfo.code]
      children.push({
        path: childRouterInfo.actionUrl,
        component: singleRouter.component,
        name: childRouterInfo.code,
        meta: { title: childRouterInfo.name, icon: singleRouter.icon, noCache: false }
      })
    })
    result.push({
      path: fatherRouterInfo.actionUrl,
      component: routerMap.Layout,
      name: fatherRouterInfo.code,
      redirect: fatherRouterInfo.actionUrl + item.sublevelMenus[0].authAction.actionUrl,
      meta: { title: fatherRouterInfo.name, icon: 'example', noCache: false },
      children
    })
  })
  result.push({ path: '*', redirect: '/404', hidden: true })
  return result
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    console.log(constantRoutes, 1111)
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise((resolve, reject) => {
      commit('SET_ROUTES', [])
      resolve([])
      // getRouter().then(({ result }) => {
      //   const accessedRoutes = sortRouter(result || [])
      //   commit('SET_ROUTES', accessedRoutes)
      //   resolve(accessedRoutes)
      // }).catch(error => {
      //   reject(error)
      // })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
