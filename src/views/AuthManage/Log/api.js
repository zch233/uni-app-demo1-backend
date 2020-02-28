import request from '@/utils/request'

export function getLogList(data) {
  return request({
    url: '/mango/admin_log',
    method: 'post',
    data
  })
}
