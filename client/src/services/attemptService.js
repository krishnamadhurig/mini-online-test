import api from './api';

export const history = () => api.get('/attempts').then((r) => r.data);
export const result = (id) => api.get(`/attempts/${id}`).then((r) => r.data);