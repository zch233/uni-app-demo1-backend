import request from '@/utils/request'

export function getUserLineData(data) {
  return request({
    url: '/mango/user_line',
    method: 'post',
    data
  })
}
