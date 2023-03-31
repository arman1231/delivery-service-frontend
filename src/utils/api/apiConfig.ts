import axios from 'axios'
const BASE_URL = 'http://localhost:8081/auth'

const api = axios.create({
    baseURL: BASE_URL
})

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    config.headers['Content-Type'] = "application/json"
    config.headers['Content-Encoding'] = "charset=utf-8"
    config.headers.Accept = '*/333*';

    return config
})

export default api