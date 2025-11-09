// /client/src/utils/api.jsx

import axios from 'axios';

const API_URL = 'https://server-campus-hive.vercel.app/api/v1' ||  'http://localhost:5000/api/v1'; 

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// --- API Functions ---
export const auth = {
  login: (credentials) => api.post('/auth/login', credentials),
  signup: (userData) => api.post('/auth/signup', userData),
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
};

export const projects = {
  getAll: (params) => api.get('/projects', { params }),
  getById: (id) => api.get(`/projects/${id}`),
  create: (projectData) => api.post('/projects', projectData),
  join: (projectId) => api.post(`/projects/${projectId}/join`),
  bookmark: (projectId) => api.post(`/projects/${projectId}/bookmark`),
};

export const events = {
  getAll: () => api.get('/events'),
  getById: (id) => api.get(`/events/${id}`),
};

export const messages = {
    getHistory: (roomId) => api.get(`/chats/${roomId}/messages`),
};

export default api;