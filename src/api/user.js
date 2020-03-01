import request from '@/utils/request'
import { getToken } from '@/utils/auth'

export function login(data) {
  return request({
    url: '/mango/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/mango/logout',
    method: 'post'
  })
}

export function uploadImg(base64Data) {
  function dataURLtoBlob (dataurl) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }
  function blobToFile (theBlob, fileName){
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
  }
  const blob = dataURLtoBlob(base64Data);
  const image = blobToFile(blob, Date.now())
  const data = new FormData()
  data.append('image', image)
  data.append('access_token', getToken())
  return request({
    url: '/upload',
    method: 'post',
    data
  })
}
