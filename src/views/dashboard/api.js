import request from '@/utils/request'

export function getOrderLineData(data) {
  return request({
    url: '/mango/order_line',
    method: 'post',
    data
  })
}
