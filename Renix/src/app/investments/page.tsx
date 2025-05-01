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
                <main className="flex-1 bg-gray-50 p-6">
                    <div className="flex items-center justify-between mb-5">
                        <h1 className="text-2xl font-bold text-black-500">
                            Seus Investimentos
                        </h1>
                        <button
                            onClick={() => router.push('/newinvestment')}
                            className="bg-gray-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full text-lg"
                        >
                            +
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white shadow rounded-lg p-4">
                            <h3 className="text-sm font-medium text-gray-500">Nubank</h3>
                            <p className="text-2xl font-bold text-gray-900">1.200</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>

    );
}
