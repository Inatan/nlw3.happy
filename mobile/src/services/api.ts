import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.25.75:3333', // caso simulador só localhost se não ip que o expo mostra
});

export default api;