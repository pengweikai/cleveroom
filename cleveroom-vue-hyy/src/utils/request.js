import axios from 'axios'

  // 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:8089/',
  timeout: 1200000 // 请求超时时间,默认两分钟
})
// 请求拦截器
service.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    console.log('-----接口调用成功-----')
    return response.data
  },
  error => {
    console.log('-----接口调用失败-----')
    // this.$notify({
    //   type: 'info',
    //   title: '提示',
    //   message: '网络错误，请稍后再试',
    //   position: 'top-right'
    // })
    return Promise.reject(error)
  }
)
export default service
