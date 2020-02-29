import request from '@/utils/request'

export function getImageConfig(data) {
  return request({
    url: '/mango/image_info',
    method: 'post',
    data
  })
}

export function editImageConfig(data) {
  return request({
    url: '/mango/image_edit',
    method: 'post',
    data
  })
}

export function getGlobalConfig(data) {
  return request({
    url: '/mango/global_get',
    method: 'post',
    data
  })
}

export function editGlobalConfig(data) {
  return request({
    url: '/mango/global_edit',
    method: 'post',
    data
  })
}
