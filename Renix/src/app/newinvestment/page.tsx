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
                        <a href="/profile" target="_blank" rel="noopener noreferrer">
                        <img src="/avatar.png" alt="Logo" className="w-8 h-8" />
                    </a>
                    </div>
                </nav>

                {/* Conteúdo */}
                <main className="min-h-screen flex justify-center p-6">
                    <div className=" flex flex-col items-center space-y-6 lg:mt-20">
                        {/* Título centralizado */}
                        <h1 className="text-3xl font-bold text-black mt-20">Novo Investimento</h1>

                        {/* Card com inputs */}
                        <div className="bg-white shadow rounded-lg p-6 w-120 max-w-md">
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
                                    className="w-full  bg-[#028264] text-white py-2 px-4 rounded"
                                >
                                    Calcular
                                </button>
                            </form>
                        </div>
                    </div>
                </main>
                <footer className="bg-white shadow-sm bg-[#028264] shadow">
                    <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.
                        </span>
                        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                            <li>
                                <a href="#" className="hover:underline me-4 md:me-6">About</a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">Contact</a>
                            </li>
                        </ul>
                    </div>
                </footer>

            </div>
        </div>
    );
}
