import axios from 'axios';
export const baseUrl = 'http://rickandmortyapi.com/api';

axios.defaults.baseURL = baseUrl;
const axiosConfig = axios;

export default axiosConfig;
