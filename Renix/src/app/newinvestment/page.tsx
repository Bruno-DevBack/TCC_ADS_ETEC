'use client';

import { useRouter } from 'next/navigation';


export default function Dashboard() {
    const router = useRouter();

    return (
        <div className="flex min-h-screen">

            {/* Conteúdo principal */}
            <div className="flex-1 flex flex-col">
                {/* Navbar */}
                <nav className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <img src="/logo.png" alt="Logo" className="w-14 h-14" />
                    </div>

                    {/* Título centralizado */}
                    <h1 className="text-lg font-extrabold text-black-500 absolute left-1/2 transform -translate-x-1/2">
                        RENIX
                    </h1>

                    <div className="flex items-center space-x-4">
                        <span className="text-sm hidden sm:block">Olá, Nome</span>
                        <img src="/avatar.png" alt="Avatar" className="w-8 h-8 rounded-full" />
                    </div>
                </nav>

                {/* Conteúdo */}
                <main className="min-h-screen bg-gray-50 flex justify-center p-6">
                    <div className="flex flex-col items-center space-y-6">
                        {/* Título centralizado */}
                        <h1 className="text-2xl font-bold text-black-500 mt-20">Novo Investimento</h1>

                        {/* Card com inputs */}
                        <div className="bg-white shadow rounded-lg p-6 w-full max-w-md">
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Valor</label>
                                    <input
                                        type="number"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Digite o valor"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Tempo (meses)</label>
                                    <input
                                        type="number"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Ex: 12"
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
