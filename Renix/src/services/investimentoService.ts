import api from './api';
import { Investimento } from '@/types';

export const criarInvestimento = (data: Investimento) => api.post('/investimentos', data);
export const listarInvestimentosPorUsuario = (usuario_id: string) => api.get(`/investimentos/usuario/${usuario_id}`);
export const buscarInvestimento = (id: string) => api.get(`/investimentos/${id}`);
export const atualizarInvestimento = (id: string, data: Partial<Investimento>) => api.patch(`/investimentos/${id}`, data);
export const removerInvestimento = (id: string) => api.delete(`/investimentos/${id}`);
