import request from '@/utils/request'

export function getAdminList(data) {
  return request({
    url: '/mango/admin_list',
    method: 'post',
    data
  })
}

export function addAdmin(data) {
  return request({
    url: '/mango/admin_add',
    method: 'post',
    data
  })
}

export function editAdmin(data) {
  return request({
    url: '/mango/admin_edit',
    method: 'post',
    data
  })
}

export function deleteAdmin(data) {
  return request({
    url: '/mango/admin_del',
    method: 'post',
    data
  })
}

export function batchAdmin(data) {
  return request({
    url: '/mango/goods_batch',
    method: 'post',
    data
  })
}
