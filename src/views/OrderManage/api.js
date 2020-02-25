import request from '@/utils/request'

export function getOrderList(data) {
  return request({
    url: '/mango/order_list',
    method: 'post',
    data
  })
}

export function editOrder(data) {
  return request({
    url: '/mango/order_edit',
    method: 'post',
    data
  })
}
