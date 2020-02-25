import request from '@/utils/request'

export function getVipList(data) {
  return request({
    url: '/mango/user_list',
    method: 'post',
    data
  })
}

export function editVip(data) {
  return request({
    url: '/mango/user_edit',
    method: 'post',
    data
  })
}

export function userCount(data) {
  return request({
    url: '/mango/user_count',
    method: 'post',
    data
  })
}
