'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Dashboard() {
    const router = useRouter();
    const [menuAberto, setMenuAberto] = useState(false);

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
                        <button onClick={() => router.push('/')} className="hover:text-blue-600">Página Inicial</button>
                    </li>
                    <li>
                        <button onClick={() => router.push('/investments')} className="hover:text-blue-600">Investimentos</button>
                    </li>
                </ul>
            </div>

            {/* Conteúdo principal */}
            <div className="flex-1 flex flex-col">
                {/* Navbar */}
                <nav className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
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

                    <div className="flex items-center space-x-4">
                        <span className="text-md lg:text-lg hidden sm:block">Olá, Nome</span>
                        <img src="/avatar.png" alt="Avatar" className="w-12 h-12 rounded-full" />
                    </div>
                </nav>

                {/* Conteúdo */}
                <main className="min-h-screen bg-[#ccffde] flex justify-center p-6">
                    <div className=" flex flex-col items-center space-y-6 lg:-mt-20">
                        {/* Título centralizado */}
                        <h1 className="text-3xl font-bold text-black-500 mt-20">Novo Investimento</h1>

                        {/* Card com inputs */}
                        <div className="bg-white shadow rounded-lg p-6 w-full max-w-md">
                            <form className="space-y-4">

                                <div>
                                    <label className="block text-sm sm:text-md font-medium text-gray-700 mb-1">Banco</label>
                                    <select
                                        required
                                        className="text-sm sm:text-md mt-1 block w-full rounded-md border-gray-300 border-1 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-1 px-1"
                                    >
                                        <option value="">Selecione um banco</option>
                                        <option value="nubank">Nubank</option>
                                        <option value="bancodobrasil">Banco do Brasil</option>
                                    </select>
                                </div>


                                <div>
                                    <label className="block text-sm sm:text-md font-medium text-gray-700 mb-1">Valor</label>
                                    <input
                                        required
                                        type="number"
                                        className="text-sm sm:text-md mt-1 block w-full rounded-md border-gray-300 border-1 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-1 px-1"
                                        placeholder="Digite o valor"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm sm:text-md font-medium text-gray-700 mb-1">Tempo (meses)</label>
                                    <input
                                        required
                                        type="date"
                                        className="text-sm sm:text-md mt-1 block w-full rounded-md border-gray-300 border-1 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-1 px-1"
                                        placeholder="Ex: 05/05/2025"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm sm:text-md font-medium text-gray-700 mb-1">Tempo (meses)</label>
                                    <input
                                        required
                                        type="date"
                                        className="text-sm sm:text-md mt-1 block w-full rounded-md border-gray-300 border-1 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-1 px-1"
                                        placeholder="Ex: 25/12/2026"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                                >
                                    Calcular
                                </button>
                            </form>
                        </div>
                    </div>
                </main>

            </div>
        </div>
    );
}
