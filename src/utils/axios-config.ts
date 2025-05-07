import axios from 'axios';

export const customAxiosInstance = axios.create({
  baseURL: 'https://localhost:7214/api',
});
// https://localhost:7214/api
// https://edgex.liara.run/api