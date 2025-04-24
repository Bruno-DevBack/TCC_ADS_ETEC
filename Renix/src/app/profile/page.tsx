'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';

  export default function ProfilePage() {
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  
    useEffect(() => {
      const fetchUser = async () => {
        const res = await fetch('/api/user?id=ID_DO_USUARIO');  // Passe o ID real do usuário aqui
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      };
  
      fetchUser();
    }, []);
  

  return (
    <div className="min-h-screen bg-[#0e7a63] flex items-center justify-center">
      <div className="bg-[#d9d9d9] w-[350px] p-6 rounded flex flex-col items-center shadow-lg">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-2 overflow-hidden">
          <img
            src="/avatar.png"
            alt="Avatar"
            className="w-20 h-20 object-cover"
          />
        </div>

        {/* Nome no topo */}
        <h2 className="text-black text-xl font-semibold mb-4 border-t border-gray-400 w-full text-center pt-2">
          Nome
        </h2>

        {/* "Formulário" de visualização */}
        <div className="w-full text-left space-y-4">
          <div>
            <label className="text-sm font-bold text-black block mb-1">
              NOME COMPLETO:
            </label>
            <p className="w-full h-6 px-2 bg-white border border-gray-400 rounded text-sm flex items-center">
              Nicolly Oliveira da Silva
            </p>
          </div>

          <div>
            <label className="text-sm font-bold text-black block mb-1">
              TELEFONE:
            </label>
            <p className="w-full h-6 px-2 bg-white border border-gray-400 rounded text-sm flex items-center">
              (11) 91234-5678
            </p>
          </div>

          <div>
            <label className="text-sm font-bold text-black block mb-1">
              SENHA:
            </label>
            <p className="w-full h-6 px-2 bg-white border border-gray-400 rounded text-sm flex items-center">
              ********
            </p>
          </div>

          <div className="flex justify-center items-center pt-2">
            <Link href="/proxima-pagina">
              <button className="bg-[#028264] text-white px-8 py-3 rounded flex items-center justify-center">
                <span className="font-extrabold text-sm">EDITAR</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
