import api from './api';
import { Usuario } from '@/types';
import Cookies from 'js-cookie';

// Utilitário para salvar usuário e token em todas as camadas
function persistirUsuarioEToken(usuario: any, token?: string) {
  if (usuario) {
    sessionStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('usuario', JSON.stringify(usuario));
    Cookies.set('usuario', JSON.stringify(usuario), { expires: 7 });
    if (usuario.id) localStorage.setItem('userId', String(usuario.id));
  }
  if (token) {
    localStorage.setItem('token', token);
    sessionStorage.setItem('token', token);
    Cookies.set('token', token, { expires: 7 });
  }
}

export const registroUsuario = (data: Usuario) => api.post('/usuarios/registro', data);

export const loginUsuario = async (email: string, senha: string) => {
  const res = await api.post('/usuarios/login', { email_usuario: email, senha_usuario: senha });
  const data: any = res.data;
  let usuario = null;
  let token = data.token || data.accessToken || data.jwt;
  if (data && typeof data === 'object') {
    if (data.usuario && typeof data.usuario === 'object') {
      usuario = data.usuario;
    } else if (data.data && data.data.usuario) {
      usuario = data.data.usuario;
    } else if (Array.isArray(data)) {
      if (data.length > 0) usuario = data[0];
    } else if ('id' in data || 'nome_usuario' in data) {
      usuario = data;
    }
  }
  persistirUsuarioEToken(usuario, token);
  return res;
};

export const buscarUsuario = async (id: string) => {
  const res = await api.get(`/usuarios/${id}`);
  const usuario = res.data;
  persistirUsuarioEToken(usuario);
  return res;
};

export const logoutUsuario = (usuario_id: string) => {
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
  Cookies.remove('token');
  localStorage.removeItem('usuario');
  sessionStorage.removeItem('usuario');
  Cookies.remove('usuario');
  localStorage.removeItem('userId');
  return api.post('/usuarios/logout', { usuario_id });
};

export const atualizarUsuario = async (
  idOrData: string | Partial<Usuario>,
  dataArg?: Partial<Usuario>
) => {
  let id: string | undefined;
  let data: Partial<Usuario>;

  if (typeof idOrData === 'string') {
    id = idOrData;
    data = dataArg || {};
  } else {
    // Tenta pegar do sessionStorage
    let sessionUser: Usuario | null = null;
    if (typeof window !== 'undefined') {
      const sessionUserStr = sessionStorage.getItem('usuario');
      if (sessionUserStr) {
        try {
          sessionUser = JSON.parse(sessionUserStr);
        } catch {
          // Falha ao parsear, ignora
        }
      }
    }
    id = sessionUser?.id;
    data = idOrData;
  }

  if (!id) {
    throw new Error('ID do usuário não encontrado na sessão.');
  }

  const res = await api.put(`/usuarios/${id}`, data);

  // Atualiza sessão e localStorage para manter sincronizado
  persistirUsuarioEToken(res.data);

  return res;
};
