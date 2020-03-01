import request from '@/utils/request'

export function getRoleList(data) {
  return request({
    url: '/mango/role_list',
    method: 'post',
    data
  })
}

export function getRightList(data) {
  return request({
    url: '/mango/right_list',
    method: 'post',
    data
  })
}

export function addRole(data) {
  return request({
    url: '/mango/role_add',
    method: 'post',
    data
  })
}

export function editRole(data) {
  return request({
    url: '/mango/role_edit',
    method: 'post',
    data
  })
}

export function deleteRole(data) {
  return request({
    url: '/mango/role_del',
    method: 'post',
    data
  })
}

export function batchRole(data) {
  return request({
    url: '/mango/goods_batch',
    method: 'post',
    data
  })
}
