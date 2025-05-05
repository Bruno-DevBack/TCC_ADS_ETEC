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
            </div>
        </div>
    );
}


