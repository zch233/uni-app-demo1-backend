import request from '@/utils/request'

export function getFinanceList(data) {
  return request({
    url: '/mango/finance_list',
    method: 'post',
    data
  })
}

