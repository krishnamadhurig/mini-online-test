import api from './api';

export const list = () => api.get('/questions').then((r) => r.data);
export const create = (question) => api.post('/questions', question).then((r) => r.data);
export const remove = (id) => api.delete(`/questions/${id}`).then((r) => r.data);