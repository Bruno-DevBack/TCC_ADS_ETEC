import api from './api';
import { Banco } from '@/types';

export const listarBancos = () => api.get<Banco[]>('/bancos');
export const cadastrarBanco = (banco: Banco) => api.post('/bancos', banco);
export const buscarBanco = (id: string) => api.get(`/bancos/${id}`);
export const atualizarBanco = (id: string, data: Partial<Banco>) => api.patch(`/bancos/${id}`, data);
export const removerBanco = (id: string) => api.delete(`/bancos/${id}`);
