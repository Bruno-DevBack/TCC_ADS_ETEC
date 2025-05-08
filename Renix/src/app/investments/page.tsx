'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';

export default function Dashboard() {
    const router = useRouter();

    const investimentos = [
        { nome: 'Nubank', valor: '1.200', id: 1 },
        { nome: 'XP Investimentos', valor: '3.500', id: 2 },
        { nome: 'Inter', valor: '2.750', id: 3 },
        { nome: 'C6 Bank', valor: '4.100', id: 4 },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 font-sans text-gray-800">
            {/* Navbar */}
            <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <img src="/logo.png" alt="Logo" className="w-10 h-10" />
                    <span className="text-xl text-black font-bold">RENIX</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="hidden sm:inline text-gray-600">Olá, Nome</span>
                    <a href="https://example.com" target="_blank" rel="noopener noreferrer">
                        <img src="/avatar.png" alt="Logo" className="w-8 h-8" />
                    </a>
                </div>
            </nav>

            {/* Conteúdo principal */}
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {investimentos.map((inv) => (
                        <div
                            key={inv.id}
                            onClick={() => router.push('/investment')}
                            className="relative bg-white p-6 rounded-xl shadow hover:shadow-md transition cursor-pointer"
                        >
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    router.push('/newinvestment');
                                }}
                                className="absolute top-4 right-4 text-gray-400 hover:text-emerald-600 transition"
                            >
                                <FaEdit />
                            </button>

                            <h3 className="text-lg font-semibold text-gray-700">{inv.nome}</h3>
                            <p className="mt-2 text-3xl font-bold text-gray-900">R$ {inv.valor}</p>
                        </div>
                    ))}
                </div>
            </main>

            {/* Footer */}
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
