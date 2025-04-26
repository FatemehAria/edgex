import axios from 'axios';

export const customAxiosInstance = axios.create({
  baseURL: 'https://edgex.liara.run/api',
});
// https://localhost:7214/api