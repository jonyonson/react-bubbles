import axios from 'axios';

export function axiosWithAuth() {
  return axios.create({
    headers: {
      Authorization: localStorage.getItem('token'),
    },
    baseURL: 'http://localhost:5000',
  });
}
