import api from './api';

export const atualizarDashboard = (data: any) => api.post('/dashboard', data);
export const buscarDashboardPorUsuario = (usuario_id: string) => api.get(`/dashboard/usuario/${usuario_id}`);
