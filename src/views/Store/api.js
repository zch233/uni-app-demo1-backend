import request from '@/utils/request'

export function getStoreOrderList(data) {
  return request({
    url: '/mango/shop_order',
    method: 'post',
    data
  })
}

export function signOrder(data) {
  return request({
    url: '/mango/shop_take',
    method: 'post',
    data
  })
}

export function sendOrder(data) {
  return request({
    url: '/mango/shop_express',
    method: 'post',
    data
  })
}
