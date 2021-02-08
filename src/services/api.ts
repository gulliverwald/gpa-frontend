import axios from 'axios';

const api = axios.create({
  baseURL: 'https://gpa-backend-api.herokuapp.com',
});

export default api;
