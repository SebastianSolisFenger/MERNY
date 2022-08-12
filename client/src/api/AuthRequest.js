// axios is use to make requests to the server side
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

// logIN function to send the login request to the server side
export const logIn = (formData) => API.post('/auth/login', formData);
export const signUp = (formData) => API.post('/auth/register', formData);
