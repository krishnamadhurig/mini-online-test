import api from './api';

export const start = () => api.post('/test/start').then((r) => r.data);

export const submit = (attemptId, answers, auto) =>
  api.post(`/test/${attemptId}/submit`, { answers, auto }).then((r) => r.data);