import request from '@/utils/request'

export function getProductList(data) {
  return request({
    url: '/mango/goods_list',
    method: 'post',
    data
  })
}

export function addProduct(data) {
  return request({
    url: '/mango/goods_add',
    method: 'post',
    data
  })
}

export function editProduct(data) {
  return request({
    url: '/mango/goods_edit',
    method: 'post',
    data
  })
}

export function deleteProduct(data) {
  return request({
    url: '/mango/goods_del',
    method: 'post',
    data
  })
}

export function batchProduct(data) {
  return request({
    url: '/mango/goods_batch',
    method: 'post',
    data
  })
}
