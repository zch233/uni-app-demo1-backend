import request from '@/utils/request'

export function getCouponList(data) {
  return request({
    url: '/mango/coupon_list',
    method: 'post',
    data
  })
}

export function getCouponUserList(data) {
  return request({
    url: '/mango/coupon_user_list',
    method: 'post',
    data
  })
}

export function addCoupon(data) {
  return request({
    url: '/mango/coupon_add',
    method: 'post',
    data
  })
}

export function editCoupon(data) {
  return request({
    url: '/mango/coupon_edit',
    method: 'post',
    data
  })
}

export function deleteCoupon(data) {
  return request({
    url: '/mango/coupon_del',
    method: 'post',
    data
  })
}

export function issueCoupon(data) {
  return request({
    url: '/mango/coupon_user_grant',
    method: 'post',
    data
  })
}
