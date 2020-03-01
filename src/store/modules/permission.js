import { getRoleList } from '@/views/AuthManage/Role/api.js'
import { constantRoutes } from '@/router'
import { routerMap } from '@/router/routerMap'

function sortRouter(router) {
  const result = []
  router.map(item => {
    result.push(routerMap[item])
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
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise((resolve, reject) => {
      getRoleList({ id: roles }).then(({ data }) => {
        const accessedRoutes = sortRouter(data[0].right_arr.map(v => v.route))
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
