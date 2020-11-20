import axios from 'axios'
import conf from '../conf'

const $axios = axios.create({
  baseURL: conf.apiBase,
  method: 'post',
  validateStatus: () => true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
  }
})

$axios.interceptors.request.use((config) => {
  conf.offlineFunctions.forEach((item) => {
    if ((config.url).indexOf('/' + item) === 0) {
      // config.baseURL = '/offline'
      config.baseURL = '/demodata'
    }
  })
  if (conf.apiBase === '/demodata' && config.baseURL === '/api') {
    // config.baseURL = '/demodata'
  }

  if (conf.apiBase === '/offline' && config.baseURL === '/api') {
    config.baseURL = '/offline'
  }

  if (config.baseURL === '/offline') {
    config.url += '.json'
    config.method = 'get'
  }

  if (config.baseURL === '/api' && process.env.VUE_APP_NAME === 'portal') {
    config.baseURL += '/userapi'
  }

  return config
}, error => Promise.reject(error))

$axios.interceptors.response.use(res => res, (error) => {
  const { response } = error
  if (response) {
    Promise.reject(error)
  }
})

// $axios.interceptors.response.use(res => res, error => Promise.reject(error))
$axios.$baseURL = '/api'
export default $axios
