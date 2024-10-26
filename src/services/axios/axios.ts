import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
});

export const axiosAuth = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

