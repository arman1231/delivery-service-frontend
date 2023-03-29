import axios from 'axios'
import {} from '../..'
const BASE_URL = 'http://localhost:8081/auth'

const api = axios.create({
    baseURL: BASE_URL
})

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

export default api