import request from '@/utils/request'

export function getStoreOrderList(data) {
  return request({
    url: 'mango/shop_order',
    method: 'post',
    data
  })
}
