import axios from 'axios'
import { Loading, Notification } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})
let requestLoading
// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    requestLoading = Loading.service({
      lock: true,
      text: '加载中...',
      spinner: 'el-icon-loading',
      background: 'hsla(0,0%,100%,.9)'
    });
    if (store.getters.token && !(config.data instanceof FormData)) {
      config.data = {
        ...config.data,
        access_token: getToken()
      }
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    requestLoading.close()
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 'success') {
      Notification({
        title: '出错啦~',
        message: res.msg || 'Error',
        type: 'error'
      })
      if (res.code === 'token_error') {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
        return
      }
      throw Error(res.message || 'Error')
    } else {
      return res.data
    }
  },
  error => {
    Notification({
      title: '网络出错',
      message: error.message,
      type: 'error'
    })
    requestLoading.close()
    return Promise.reject(error)
  }
)

export default service
