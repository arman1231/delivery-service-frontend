import axios from 'axios'
const BASE_URL = 'http://localhost:8081/auth'

const api = axios.create({
    baseURL: BASE_URL
})
const token = localStorage.getItem('token') ? localStorage.getItem('token') : ''
api.interceptors.request.use((config) => {
     config.headers.Authorization = token
    return config
})

export default api