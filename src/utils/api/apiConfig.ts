import axios from 'axios'
const BASE_AUTH_URL = 'http://localhost:8081/auth'

const api = axios.create({
    baseURL: BASE_AUTH_URL
})
const token = localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : ''
api.interceptors.request.use((config) => {
     config.headers.Authorization = token;
    return config
})

const BASE_ORDERS_URL = 'http://localhost:3777/order'

const orders_api = axios.create({
  baseURL: BASE_ORDERS_URL
})
orders_api.interceptors.request.use((config) => {
  config.headers.Authorization = token;
  return config
})

export { api, orders_api }