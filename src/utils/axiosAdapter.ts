import axios from 'axios';

const axiosAdapter = axios.create({
  baseURL: import.meta.env.VITE_REACT_backend_endpoint,
  timeout: 5000,
});

export const staticDataAxios = axios.create({
  baseURL: import.meta.env.STATIC_DATA_ENDPOINT,
  timeout: 5000,
});

export default axiosAdapter;
