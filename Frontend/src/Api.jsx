import axios from 'axios';

const API = axios.create({
    baseURL: 'https://crypto-predictor-riel.onrender.com',
});

// Add a request interceptor for the JWT token
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const register = (userData) => API.post('/register', userData);
export const login = (userData) => API.post('/login', userData);
export const getCoins = () => API.get('/api/coins');
export const predict = (data) => API.post('/api/predict', data);
