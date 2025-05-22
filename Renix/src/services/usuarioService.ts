import api from './api';
import { Usuario } from '@/types';

export const registroUsuario = (data: Usuario) => api.post('/usuarios/registro', data);
export const loginUsuario = (email: string, senha: string) => api.post('/usuarios/login', { email_usuario: email, senha_usuario: senha });
export const buscarUsuario = (id: string) => api.get(`/usuarios/${id}`);
export const logoutUsuario = (usuario_id: string) => api.post('/usuarios/logout', { usuario_id });

export const atualizarUsuario = (idOrData: string | Partial<Usuario>, dataArg?: Partial<Usuario>) => {
  let id: string | undefined;
  let data: Partial<Usuario>;
  if (typeof idOrData === 'string') {
    id = idOrData;
    data = dataArg || {};
  } else {
    // Se só passar os dados, pega o id da sessionStorage
    const sessionUser = typeof window !== 'undefined' ? sessionStorage.getItem('usuario') : null;
    id = sessionUser ? JSON.parse(sessionUser).id : undefined;
    data = idOrData;
  }
  if (!id) throw new Error('ID do usuário não encontrado na sessão.');
  return api.put(`/usuarios/${id}`, data);
};