import request from '@/utils/request'

export function getStoreList(data) {
  return request({
    url: '/mango/shop_list',
    method: 'post',
    data
  })
}

export function addStore(data) {
  return request({
    url: '/mango/shop_add',
    method: 'post',
    data
  })
}

export function editStore(data) {
  return request({
    url: '/mango/shop_edit',
    method: 'post',
    data
  })
}

export function deleteStore(data) {
  return request({
    url: '/mango/shop_del',
    method: 'post',
    data
  })
}
