import axios from 'axios';

const BASE_URL = 'http://localhost:8080/user';

export const signup = (formData) => {
  return axios.post(`${BASE_URL}/create`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const login = (params) => {
  return axios.get(`${BASE_URL}/login`, { params });
};
