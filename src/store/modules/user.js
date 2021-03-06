import { login, logout } from '@/api/user'
import { getToken, setToken, removeToken, getName, setName, removeName, getRoleId, setRoleId, removeRoleId, getShopId, setShopId, removeShopId } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: getName(),
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    role_id: getRoleId(),
    shop_id: getShopId(),
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLEID: (state, role_id) => {
    state.role_id = role_id
  },
  SET_SHOPID: (state, shop_id) => {
    state.shop_id = shop_id
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ user_login: username.trim(), user_password: password }).then(data => {
        commit('SET_TOKEN', data.access_token)
        commit('SET_NAME', data.user_login)
        commit('SET_ROLEID', data.role_id)
        commit('SET_SHOPID', data.shop_id)
        setToken(data.access_token)
        setName(data.user_login)
        setRoleId(data.role_id)
        setShopId(data.shop_id)
        resolve(data.role_id)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        removeName() // must remove  token  first
        removeRoleId() // must remove  token  first
        removeShopId() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      removeName() // must remove  token  first
      removeRoleId() // must remove  token  first
      removeShopId() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

