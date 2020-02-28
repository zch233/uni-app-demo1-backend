import request from '@/utils/request'

export function getOrderList(data) {
  return request({
    url: '/mango/order_data',
    method: 'post',
    data
  })
}

