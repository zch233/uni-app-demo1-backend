import request from '@/utils/request'

export function getNewsList(data) {
  return request({
    url: '/mango/content_list',
    method: 'post',
    data
  })
}

export function addNews(data) {
  return request({
    url: '/mango/content_add',
    method: 'post',
    data
  })
}

export function editNews(data) {
  return request({
    url: '/mango/content_edit',
    method: 'post',
    data
  })
}
