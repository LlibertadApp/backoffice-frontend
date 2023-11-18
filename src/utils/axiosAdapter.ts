import axios from 'axios';

const axiosAdapter = axios.create({
  baseURL: import.meta.env.VITE_REACT_backend_endpoint,
  timeout: 5000,
});

axiosAdapter.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('authToken');
  config.headers.Authorization = token;
  return config;
});

export const staticDataAxios = axios.create({
  baseURL: import.meta.env.VITE_REACT_static_data_endpoint,
  timeout: 5000,
});

export default axiosAdapter;
