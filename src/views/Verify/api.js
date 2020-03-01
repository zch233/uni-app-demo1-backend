import request from '@/utils/request'

export function getVerifyList(data) {
  return request({
    url: '/mango/shop_coupon',
    method: 'post',
    data
  })
}

export function useVerify(data) {
  return request({
    url: '/mango/shop_check',
    method: 'post',
    data
  })
}
