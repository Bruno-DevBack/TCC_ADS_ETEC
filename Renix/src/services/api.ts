import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: 'http://localhost:3333/api', // Corrigido: remove /api para bater nas rotas corretas
});

// Adiciona o token JWT a cada requisição, se disponível
api.interceptors.request.use((config) => {
    let token = localStorage.getItem('token')
        || sessionStorage.getItem('token')
        || Cookies.get('token');
    if (token) {
        if (!config.headers) {
            config.headers = {};
        }
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;