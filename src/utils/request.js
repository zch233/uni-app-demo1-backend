import axios from 'axios'
import { Notification } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      config.data = {
        ...config.data,
        access_token1: getToken()
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
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 'success') {
      Notification({
        title: '接口出错',
        message: res.msg || 'Error',
        type: 'error'
      })
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
    return Promise.reject(error)
  }
)

export default service
