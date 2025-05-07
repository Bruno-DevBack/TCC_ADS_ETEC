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
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 p-6 z-40 transform transition-transform duration-300 ${
          menuAberto ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button onClick={() => setMenuAberto(false)} className="mb-6 text-gray-600 font-bold text-xl">
          ✕
        </button>
        <ul className="space-y-4 text-lg">
          <li>
            <button onClick={() => router.push('/')} className="hover:text-blue-600">Página Inicial</button>
          </li>
          <li>
            <button onClick={() => router.push('/investments')} className="hover:text-blue-600">Investimentos</button>
          </li>
          <li>
            <button onClick={() => router.push('/newinvestment')} className="hover:text-blue-600">Criar investimento</button>
          </li>
        </ul>
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <nav className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between relative">
          {/* Botão do menu */}
          <div className="flex items-center space-x-4">
            <button onClick={() => setMenuAberto(true)} className="text-2xl font-bold">
              ☰
            </button>
            <img src="/logo.png" alt="Logo" className="w-12 h-12" />
          </div>

          {/* Título centralizado */}
          <h1 className="text-2xl md:text-3xl font-extrabold text-black-500 absolute left-1/2 transform -translate-x-1/2">
            RENIX
          </h1>

          {/* Usuário */}
          <div className="flex items-center space-x-4">
            <span className="text-md lg:text-lg hidden sm:block">Olá, Nome</span>
            <img src="/avatar.png" alt="Avatar" className="w-12 h-12 rounded-full" />
          </div>
        </nav>

        {/* Seção principal */}
        <section className="w-full h-full justify-items-center bg-[#ccffde]">
          <div className="text-2xl font-bold mt-3">Rendimento</div>

          <ResponsiveContainer width="95%" height="45%" className={'text-lg'}>
            <LineChart data={dadosInvestimento} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="valor" stroke="black" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>

          <div className="mb-3 w-[80%] md:w-[85%] mx-auto">
            <div className="space-y-3 mb-3">
              <div className="block text-xl font-medium text-black mb-1">
                Valor Investido
              </div>
              <div className="block w-full rounded-md border-2 border-gray-500 p-2 text-xl shadow-sm">
                1800
              </div>
            </div>

            <div className="space-y-3 mb-3">
              <div className="block text-xl font-medium text-black mb-1">
                Impostos
              </div>
              <div className="block w-full rounded-md border-2 border-gray-500 p-2 text-xl shadow-sm">
                150
              </div>
            </div>

            <div className="space-y-3 mb-3">
              <div className="block text-xl font-medium text-black mb-1">
                Valor Líquido
              </div>
              <div className="block w-full rounded-md border-2 border-gray-500 p-2 text-xl shadow-sm">
                2150
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
