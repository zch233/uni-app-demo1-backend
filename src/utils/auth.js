import Cookies from 'js-cookie'

const TokenKey = 'access_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

const NameKey = 'name'

export function getName() {
  return Cookies.get(NameKey)
}

export function setName(name) {
  return Cookies.set(NameKey, name)
}

export function removeName() {
  return Cookies.remove(NameKey)
}

const RoleId = 'role_id'

export function getRoleId() {
  return Cookies.get(RoleId)
}

export function setRoleId(role_id) {
  return Cookies.set(RoleId, role_id)
}

export function removeRoleId() {
  return Cookies.remove(RoleId)
}
