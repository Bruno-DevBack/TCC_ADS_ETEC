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
                        <button onClick={() => router.push('/newinvestment')} className="hover:text-blue-600">Criar Investimentos</button>
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
                <main className="flex-1 bg-[#ccffde] p-6 items-center">
                    <div className="flex items-center justify-between mb-5">
                        <h1 className="text-2xl md:text-3xl font-bold text-black-500">
                            Seus Investimentos
                        </h1>
                        <button
                            onClick={() => router.push('/newinvestment')}
                            className="bg-gray-600 hover:bg-green-700 text-white font-bold py-2 px-4 md:py-3 md:px-5 rounded-full text-lg lg:text-xl"
                        >
                            +
                        </button>
                    </div>

                    <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4r">
                        <div onClick={() => router.push('/investment')} className="bg-white shadow rounded-lg p-4 flex flex-row hover:bg-gray-200 focus:outline-2 focus:outline-offset-2 focus:outline-gray-300 active:bg-gray-300">
                            <div>
                                <h3 className="text-sm md:text-md lg:text-lg font-medium text-gray-500">Nubank</h3>
                                <p className="text-2xl md:text-3xl font-bold text-gray-900">1.200</p>
                            </div>

                            <button
                                onClick={() => router.push('/newinvestment')}
                                className="h-8 ml-[70%] md:ml-[68%] lg:ml-[50%] xl:ml-[58%] bg-gray-600 hover:bg-green-700 text-white font-bold py-1 px-2 md:py-1 md:px-2 rounded-full text-sm lg:text-md"
                            >
                                ✎
                            </button>
                        </div>    
                    </div>
                </main>
            </div>
        </div>

    );
}
