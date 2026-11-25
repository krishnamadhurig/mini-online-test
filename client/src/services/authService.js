import api from './api';

export const signup = (form) => api.post('/auth/signup', form).then((r) => r.data);
export const login = (form) => api.post('/auth/login', form).then((r) => r.data);
export const me = () => api.get('/auth/me').then((r) => r.data.user);