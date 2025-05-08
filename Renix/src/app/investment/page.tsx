'use client';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const dadosInvestimento = [
  { mes: 'Jan', valor: 1000 },
  { mes: 'Fev', valor: 1200 },
  { mes: 'Mar', valor: 1400 },
  { mes: 'Abr', valor: 1700 },
  { mes: 'Mai', valor: 2000 },
  { mes: 'Jun', valor: 2300 },
];

export default function Dashboard() {
  const [menuAberto, setMenuAberto] = useState(false);
  const router = useRouter();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
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

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col bg-gray-50">
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
            <a href="https://example.com" target="_blank" rel="noopener noreferrer">
                        <img src="/avatar.png" alt="Logo" className="w-8 h-8" />
                    </a>
          </div>
        </nav>

        {/* Seção principal */}
        <section className="w-full h-full justify-items-center">
          <div className="text-2xl mt-5 mb-5 font-bold mt-3">Rendimento</div>

          <ResponsiveContainer width="75%" height="45%" className={'text-lg'}>
            <LineChart data={dadosInvestimento} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="valor" stroke="black" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>

          <div className="mb-3 w-[80%] md:w-[85%] mt-20 mx-auto flex flex-col align-items justify-center">
            <div className="space-y-3 mb-3">
              <div className="block text-xl font-medium text-black mb-1">
                Valor Investido
              </div>
              <div className="block w-[30%] rounded-md border-2 border-gray-500 p-2 text-xl shadow-sm">
                1800
              </div>
            </div>

            <div className="space-y-3 mb-3">
              <div className="block text-xl font-medium text-black mb-1">
                Impostos
              </div>
              <div className="block w-[30%] rounded-md border-2 border-gray-500 p-2 text-xl shadow-sm">
                150
              </div>
            </div>

            <div className="space-y-3 mb-3">
              <div className="block text-xl font-medium text-black mb-1">
                Valor Líquido
              </div>
              <div className="block w-[30%] rounded-md border-2 border-gray-500 p-2 text-xl shadow-sm">
                2150
              </div>
            </div>
          </div>
        </section>

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
    </div>
  );
}
