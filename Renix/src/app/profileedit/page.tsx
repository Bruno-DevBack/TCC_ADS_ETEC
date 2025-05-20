'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Menu } from 'lucide-react';

export default function ProfilePage() {
  const [user, setUser] = useState<{ name: string; email: string; password?: string }>({ name: '', email: '', password: '' });
  const [menuAberto, setMenuAberto] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/user?id=ID_DO_USUARIO'); // Substitua com ID real
      if (res.ok) {
        const data = await res.json();
        setUser({ name: data.name, email: data.email, password: '' }); // Senha fica vazia para segurança
      }
    };
    fetchUser();
  }, []);

  // Função para atualizar os campos do user localmente
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
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

      {/* Navbar */}
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="flex items-center space-x-4">
            <button onClick={() => setMenuAberto(true)} className="text-xl font-bold">
              <Menu size={20} />
            </button>
          </div>
          <img src="/logo.png" alt="Logo" className="w-10 h-10" />
          <span className="text-xl text-black font-bold">RENIX</span>
        </div>

        {/* Usuário */}
        <div className="flex items-center space-x-4">
          <span className="text-md hidden sm:block">Olá, {user.name || 'Nome'}</span>
          <a href="/profile" target="_blank" rel="noopener noreferrer">
            <img src="/avatar.png" alt="Avatar" className="w-8 h-8 rounded-full" />
          </a>
        </div>
      </nav>

      {/* Perfil */}
      <main className="flex-1 flex items-center justify-center py-10 px-4 bg-gray-50">
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-6 flex flex-col items-center space-y-6">
          <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden border border-gray-300">
            <img src="/avatar.png" alt="Avatar" className="w-full h-full object-cover" />
          </div>

          <h2 className="text-xl font-semibold text-gray-900">{user.name || 'Nome do Usuário'}</h2>

          <div className="w-full space-y-4 text-sm">
            <div>
              <label htmlFor="name" className="text-gray-600 font-medium block mb-1">Nome completo</label>
              <input
                id="name"
                name="name"
                type="text"
                value={user.name}
                onChange={handleChange}
                className="w-full bg-gray-100 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#028264]"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-gray-600 font-medium block mb-1">E-mail</label>
              <input
                id="email"
                name="email"
                type="email"
                value={user.email}
                onChange={handleChange}
                className="w-full bg-gray-100 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#028264]"
              />
            </div>

            <div>
              <label htmlFor="password" className="text-gray-600 font-medium block mb-1">Senha</label>
              <input
                id="password"
                name="password"
                type="password"
                value={user.password}
                onChange={handleChange}
                placeholder="********"
                className="w-full bg-gray-100 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#028264]"
                autoComplete="new-password"
              />
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
