import request from '@/utils/request'

export function getPayList(data) {
  return request({
    url: '/mango/coupon_data',
    method: 'post',
    data
  })
}

