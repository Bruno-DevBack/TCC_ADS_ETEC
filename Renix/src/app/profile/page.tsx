'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Menu } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Cookies from 'js-cookie';

export default function ProfilePage() {
  const { usuario } = useAuth();
  const [user, setUser] = useState<any>(usuario);
  const [menuAberto, setMenuAberto] = useState(false);
  const router = useRouter();

useEffect(() => {
  const atualizarUsuario = () => {
    let sessionUser = typeof window !== 'undefined' ? sessionStorage.getItem('usuario') : null;
    if (!sessionUser && typeof window !== 'undefined') {
      sessionUser = Cookies.get('usuario') || null;
    }

    if (sessionUser) {
      try {
        const parsed = JSON.parse(sessionUser);
        const usuarioExtraido = parsed?.data ?? parsed; // usa parsed.data se existir, senão usa o próprio parsed
        setUser(usuarioExtraido);
      } catch (error) {
        console.error('Erro ao analisar os dados do usuário:', error);
      }
    }
  };

  atualizarUsuario();
  window.addEventListener('usuarioAtualizado', atualizarUsuario);
  window.addEventListener('storage', atualizarUsuario);

  // Persistência entre reloads
  if (!sessionStorage.getItem('usuario')) {
    const localUser = typeof window !== 'undefined' ? localStorage.getItem('usuario') : null;
    if (localUser) {
      sessionStorage.setItem('usuario', localUser);
      Cookies.set('usuario', localUser, { expires: 7 });

      const parsed = JSON.parse(localUser);
      const usuarioExtraido = parsed?.data ?? parsed;
      setUser(usuarioExtraido);
    } else if (typeof window !== 'undefined') {
      const cookieUser = Cookies.get('usuario');
      if (cookieUser) {
        sessionStorage.setItem('usuario', cookieUser);
        const parsed = JSON.parse(cookieUser);
        const usuarioExtraido = parsed?.data ?? parsed;
        setUser(usuarioExtraido);
      }
    }
  }

  return () => {
    window.removeEventListener('usuarioAtualizado', atualizarUsuario);
    window.removeEventListener('storage', atualizarUsuario);
  };
}, []); // Corrigido: dependências sempre []

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans text-gray-800">

      {/* Perfil */}
      <main className="flex-1 flex items-center justify-center py-10 px-4 bg-gray-50">
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-6 flex flex-col items-center space-y-6">
          <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden border border-gray-300">
            <img src={user?.fotoPerfilBase64 ? user.fotoPerfilBase64 : "/avatar.png"} alt="Avatar" className="w-full h-full object-cover" />
          </div>

          <h2 className="text-xl font-semibold text-gray-900">{user?.nome_usuario || 'Nome do Usuário'}</h2>

          <div className="w-full space-y-4 text-sm">
            <div>
              <label className="text-gray-600 font-medium block mb-1">Nome completo</label>
              <div className="w-full bg-gray-100 p-2 rounded-md border border-gray-300">
                {user?.nome_usuario || 'Carregando...'}
              </div>
            </div>

            <div>
              <label className="text-gray-600 font-medium block mb-1">E-mail</label>
              <div className="w-full bg-gray-100 p-2 rounded-md border border-gray-300">
                {user?.email_usuario || 'Carregando...'}
              </div>
            </div>
          </div>

          <Link href="/profileedit">
            <button className="bg-[#028264] hover:bg-[#026953] transition-colors text-white font-semibold px-10 py-2 rounded-xl mt-4 shadow-md">
              EDITAR
            </button>
          </Link>
        </div>
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
