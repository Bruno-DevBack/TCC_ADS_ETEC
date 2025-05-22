'use client'

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, Camera } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { atualizarUsuario } from '@/services/usuarioService';
import api from '@/services/api';
import Cookies from 'js-cookie';
import { Usuario } from '@/types';

export default function ProfileEditPage() {
  const { usuario, setUsuario } = useAuth(); // ADICIONA setUsuario
  const [menuAberto, setMenuAberto] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState<any>(usuario);
  const [mensagem, setMensagem] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(user?.fotoPerfilBase64 || null);
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [fotoError, setFotoError] = useState('');

  useEffect(() => {
    // Sempre pega o usuário da sessionStorage para garantir dados atualizados
    const atualizarUsuario = () => {
      const sessionUser = typeof window !== 'undefined' ? sessionStorage.getItem('usuario') : null;
      if (sessionUser) setUser(JSON.parse(sessionUser));
    };
    atualizarUsuario();
    window.addEventListener('usuarioAtualizado', atualizarUsuario);
    return () => {
      window.removeEventListener('usuarioAtualizado', atualizarUsuario);
    };
  }, []);

  useEffect(() => {
    if (user?.fotoPerfilBase64) setPreview(user.fotoPerfilBase64);
    else setPreview(null);
  }, [user?.fotoPerfilBase64]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUser((prev: any) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMensagem('');
    try {
      const res = await atualizarUsuario(user.id, {
        nome_usuario: user.nome_usuario,
        email_usuario: user.email_usuario,
      });
      setUser(res.data);
      sessionStorage.setItem('usuario', JSON.stringify(res.data));
      localStorage.setItem('usuario', JSON.stringify(res.data));
      Cookies.set('usuario', JSON.stringify(res.data), { expires: 7 });
      setUsuario(res.data as Usuario); // ATUALIZA CONTEXTO GLOBAL
      // Força atualização global em todas as abas/componentes
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('storage'));
        const event = new Event('usuarioAtualizado');
        window.dispatchEvent(event);
      }
      if ((res.data as any).fotoPerfilBase64) setPreview((res.data as any).fotoPerfilBase64);
      setMensagem('Dados atualizados com sucesso!');
      setTimeout(() => router.push('/profile'), 1200);
    } catch (err: any) {
      if (err.response?.status === 409) setMensagem('Este email já está em uso.');
      else if (err.response?.status === 404) setMensagem('Usuário não encontrado.');
      else setMensagem('Erro ao atualizar dados.');
    }
  }

  // Upload handler
  async function handleFotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFotoError('');
    const file = e.target.files?.[0];
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
      setFotoError('Formato inválido. Use JPG ou PNG.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setFotoError('Arquivo muito grande (máx. 5MB).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPreview(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await api.post(`/usuarios/${user.id}/foto-perfil`, formData);
      setUser(res.data);
      sessionStorage.setItem('usuario', JSON.stringify(res.data));
      localStorage.setItem('usuario', JSON.stringify(res.data));
      Cookies.set('usuario', JSON.stringify(res.data), { expires: 7 });
      setUsuario(res.data as Usuario); // ATUALIZA CONTEXTO GLOBAL
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('storage'));
        const event = new Event('usuarioAtualizado');
        window.dispatchEvent(event);
      }
      setPreview((res.data as any).fotoPerfilBase64 || null);
      setMensagem('Foto atualizada!');
      if (typeof window !== 'undefined') {
        const event = new Event('usuarioAtualizado');
        window.dispatchEvent(event);
      }
    } catch (err: any) {
      if (err.response?.status === 413) setFotoError('Arquivo muito grande.');
      else if (err.response?.status === 415) setFotoError('Formato de arquivo inválido.');
      else setFotoError('Erro ao fazer upload da foto.');
    } finally {
      setUploading(false);
    }
  }

  // Remover foto
  async function handleRemoverFoto() {
    if (!window.confirm('Remover foto de perfil?')) return;
    setRemoving(true);
    setFotoError('');
    try {
      const res = await api.delete(`/usuarios/${user.id}/foto-perfil`);
      setUser(res.data);
      sessionStorage.setItem('usuario', JSON.stringify(res.data));
      localStorage.setItem('usuario', JSON.stringify(res.data));
      Cookies.set('usuario', JSON.stringify(res.data), { expires: 7 });
      setUsuario(res.data as Usuario); // ATUALIZA CONTEXTO GLOBAL
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('storage'));
        const event = new Event('usuarioAtualizado');
        window.dispatchEvent(event);
      }
      setPreview(null);
      setMensagem('Foto removida!');
      if (typeof window !== 'undefined') {
        const event = new Event('usuarioAtualizado');
        window.dispatchEvent(event);
      }
    } catch (err: any) {
      if (err.response?.status === 404) setFotoError('Usuário não encontrado.');
      else setFotoError('Erro ao remover foto.');
    } finally {
      setRemoving(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 p-6 z-40 transform transition-transform duration-300 ${menuAberto ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <button onClick={() => setMenuAberto(false)} className="mb-6 text-gray-600 font-bold text-xl">
          ✕
        </button>
        <ul className="space-y-4 text-lg">
          <li>
            <button onClick={() => router.push('/investments')} className="hover:text-blue-600">Página Inicial</button>
          </li>
        </ul>
      </div>

      {/* Navbar removida, pois agora está no layout global */}

      {/* Perfil */}
      <main className="flex-1 flex items-center justify-center py-10 px-4 bg-gray-50">
        <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white rounded-2xl shadow-md p-6 flex flex-col items-center space-y-6">
          {/* Foto de perfil */}
          <div className="relative flex flex-col items-center mb-2">
            <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden border border-gray-300 flex items-center justify-center group transition-all">
              {preview ? (
                <img
                  src={preview}
                  alt="Foto de perfil"
                  className="w-full h-full object-cover rounded-full group-hover:opacity-80 transition-all"
                  onError={e => { (e.target as HTMLImageElement).src = '/avatar.png'; }}
                />
              ) : (
                <img src="/avatar.png" alt="Avatar" className="w-16 h-16 object-cover rounded-full opacity-60" />
              )}
              {/* Botão de alterar foto (ícone de câmera) */}
              <button
                type="button"
                className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow hover:bg-gray-200 transition-all border border-gray-300"
                onClick={() => fileInputRef.current?.click()}
                title="Alterar foto"
                disabled={uploading || removing}
              >
                <Camera size={20} className="text-gray-700" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/jpg"
                className="hidden"
                onChange={handleFotoChange}
                disabled={uploading || removing}
              />
            </div>
            {/* Botão remover foto */}
            {preview && (
              <button
                type="button"
                className="mt-2 text-xs text-red-600 hover:underline disabled:opacity-60"
                onClick={handleRemoverFoto}
                disabled={removing || uploading}
              >
                {removing ? 'Removendo...' : 'Remover foto'}
              </button>
            )}
            {/* Feedback de erro ou loading */}
            {fotoError && <div className="text-xs text-red-600 mt-1">{fotoError}</div>}
            {uploading && <div className="text-xs text-gray-500 mt-1">Enviando foto...</div>}
          </div>
          <h2 className="text-xl font-semibold text-gray-900">{user?.nome_usuario || 'Nome do Usuário'}</h2>
          <div className="w-full space-y-4 text-sm">
            <div>
              <label htmlFor="nome_usuario" className="text-gray-600 font-medium block mb-1">Nome completo</label>
              <input
                id="nome_usuario"
                name="nome_usuario"
                type="text"
                value={user?.nome_usuario || ''}
                onChange={handleChange}
                className="w-full bg-gray-100 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#028264]"
              />
            </div>
            <div>
              <label htmlFor="email_usuario" className="text-gray-600 font-medium block mb-1">E-mail</label>
              <input
                id="email_usuario"
                name="email_usuario"
                type="email"
                value={user?.email_usuario || ''}
                onChange={handleChange}
                className="w-full bg-gray-100 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#028264]"
              />
            </div>
          </div>
          {mensagem && <div className="text-green-600 text-sm mt-2">{mensagem}</div>}
          <button type="submit" className="bg-[#028264] hover:bg-[#026953] transition-colors text-white font-semibold px-10 py-2 rounded-xl mt-4 shadow-md">
            SALVAR
          </button>
        </form>
      </main>

      {/* Rodapé */}
      <footer className="bg-white mt-12 shadow-sm">
        <div className="max-w-screen-xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <span>© 2025 <a href="/" className="hover:underline">Renix™</a>. Todos os direitos reservados.</span>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="/" className="hover:underline">Sobre</a>
            <a href="/" className="hover:underline">Contato</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
