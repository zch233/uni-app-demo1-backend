import request from '@/utils/request'

export function getVipList(data) {
  return request({
    url: '/mango/user_list',
    method: 'post',
    data
  })
}

export function deleteVip(data) {
  return request({
    url: '/mango/goods_del',
    method: 'post',
    data
  })
}
