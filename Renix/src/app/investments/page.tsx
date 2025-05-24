'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext'; // Certifique-se que esse contexto existe
import api from '@/services/api';

interface Investimento {
  id: number;
  nome: string;
  valor: number;
}

export default function Dashboard() {
  const router = useRouter();
  const { usuario } = useAuth(); // Pega o usuário logado
  const [investimentos, setInvestimentos] = useState<Investimento[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchInvestimentos = async () => {
      if (!usuario?.id) {
        setErro('Usuário não autenticado.');
        setLoading(false);
        return;
      }

      try {
        const res = await api.get(`/usuarios/${usuario.id}/investimentos`);
        setInvestimentos(res.data as Investimento[]);

      } catch (err: any) {
        console.error('Erro ao buscar investimentos:', err);
        setErro('Erro ao carregar investimentos.');
      } finally {
        setLoading(false);
      }
    };

    fetchInvestimentos();
  }, [usuario]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans text-gray-800">
      <main className="flex-grow px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Seus Investimentos</h1>
          <button
            onClick={() => router.push('/newinvestment')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition"
          >
            + Novo
          </button>
        </div>

        {loading ? (
          <p>Carregando investimentos...</p>
        ) : erro ? (
          <p className="text-red-600">{erro}</p>
        ) : investimentos.length === 0 ? (
          <p className="text-gray-600">Você ainda não possui investimentos.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {investimentos.map((inv) => (
              <div
                key={inv.id}
                onClick={() => router.push(`/investment/${inv.id}`)}
                className="relative bg-white p-6 rounded-xl shadow hover:shadow-md transition cursor-pointer"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/newinvestment?id=${inv.id}`);
                  }}
                  className="absolute top-4 right-4 text-gray-400 hover:text-emerald-600 transition"
                >
                  <FaEdit />
                </button>

                <h3 className="text-lg font-semibold text-gray-700">{inv.nome}</h3>
                <p className="mt-2 text-3xl font-bold text-gray-900">R$ {Number(inv.valor).toFixed(2)}</p>
              </div>
            ))}
          </div>
        )}
      </main>

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
