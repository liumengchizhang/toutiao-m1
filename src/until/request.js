import axios from 'axios'
import store from '@/store'
import JSONbig from 'json-bigint'
const request = axios.create({
  baseURL: 'http://geek.itheima.net/',
  transformResponse: [
    function(data) {
      // Do whatever you want to transform the data
      try {
        return JSONbig.parse(data)
      } catch (error) {
        return data
      }
    }
  ]
})
const { user } = store.state
request.interceptors.request.use(
  function(config) {
    if (user && user.token) {
      config.headers.Authorization = 'Bearer ' + user.token
    }
    return config
  },
  function(error) {
    console.log('1122221')
    return Promise.reject(error)
  }
)

export default request
