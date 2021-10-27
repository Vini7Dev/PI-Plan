import axios from 'axios';

// Iniciando o objeto de consumo da api backend
const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default api;
