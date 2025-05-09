'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [menuAberto, setMenuAberto] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/user?id=ID_DO_USUARIO'); // Substitua com ID real
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans text-gray-800">
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 p-6 z-40 transform transition-transform duration-300 ${menuAberto ? 'translate-x-0' : '-translate-x-full'
          }`}
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
      {/* Navbar */}
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="flex items-center space-x-4">
            <button onClick={() => setMenuAberto(true)} className="text-xl font-bold">
              ☰
            </button>
          </div>
          <img src="/logo.png" alt="Logo" className="w-10 h-10" />
          <span className="text-xl text-black font-bold">RENIX</span>
        </div>
        {/* Botão do menu */}

        {/* Usuário */}
        <div className="flex items-center space-x-4">
          <span className="text-md lg:text-lg hidden sm:block">Olá, Nome</span>
          <a href="/profile" target="_blank" rel="noopener noreferrer">
            <img src="/avatar.png" alt="Logo" className="w-8 h-8" />
          </a>
        </div>
      </nav>
      <div className="min-h-screen bg-[#0e7a63] flex items-center justify-center bg-gray-50" >
        <div className="shadow-md bg-[#d9d9d9] w-[350px] p-6 rounded flex flex-col items-center shadow-lg">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-2 overflow-hidden">
            <img src="/avatar.png" alt="Avatar" className="w-20 h-20 object-cover" />
          </div>

          <h2 className="text-black text-xl font-semibold mb-4 border-t border-gray-400 w-full text-center pt-2">
            {user?.name || 'Nome'}
          </h2>

          <div className="w-full text-left space-y-4">
            <div>
              <label className="text-sm font-bold text-black block mb-1">NOME COMPLETO:</label>
              <p className="w-full h-6 px-2 bg-white border border-gray-400 rounded text-sm flex items-center">
                {user?.name || 'Carregando...'}
              </p>
            </div>

            <div>
              <label className="text-sm font-bold text-black block mb-1">EMAIL:</label>
              <p className="w-full h-6 px-2 bg-white border border-gray-400 rounded text-sm flex items-center">
                {user?.email || 'Carregando...'}
              </p>
            </div>

            <div>
              <label className="text-sm font-bold text-black block mb-1">SENHA:</label>
              <p className="w-full h-6 px-2 bg-white border border-gray-400 rounded text-sm flex items-center">
                ********
              </p>
            </div>

            <div className="flex justify-center items-center pt-2">
              <Link href="/proxima-pagina">
                <button className="bg-[#028264] text-white px-8 py-3 rounded flex items-center justify-center">
                  <span className="font-bold text-sm">EDITAR</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
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
