import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/mango/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/mango/logout',
    method: 'post'
  })
}
