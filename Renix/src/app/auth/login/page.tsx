"use client";

import { useState } from 'react';

export default function ProfilePage() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="bg-[#BABABA] min-h-screen flex items-center justify-center sm:bg-[#0e7a63] ">
      <section className="bg-[#d9d9d9] w-[700px] p-6 rounded flex flex-col items-center shadow-lg sm:w-[420px]">
        {/* Login */}
        <h2 className="text-black font-semibold mb-4 text-center pt-2">
          LOGIN
        </h2>

        {/* Formulário */}
        <form className="w-full grid sm:grid-cols-0 mt:grid-cols-0 gap-6 mt-4 lx:text-3xl">
          <div>
            <label
              htmlFor="email"
              className="text-xs font-bold text-black block mb-1"
            >
              E-MAIL:
            </label>
            <input
              id="email"
              type="text"
              className="w-full h-6 px-2 border border-gray-400 rounded text-sm"
            />
          </div>

          {/* SENHA */}
          <div>
            <label
              htmlFor="senha"
              className="text-xs font-bold text-black block mb-1"
            >
              SENHA:
            </label>
            <div className="relative">
              <input
                id="senha"
                type={showPassword ? "text" : "password"}
                className="w-full h-6 px-2 border border-gray-400 rounded text-sm"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i> {/* Ícone de olho */}
              </button>
            </div>
          </div>

          <div>
            <button
              id="logar"
              className="border border-[#0e7a63] bg-[#0e7a63] text-white font-bold py-1 px-2 rounded w-full hover:bg-[#0e7a63]/80 transition duration-200 ease-in-out"
            >
              Logar
            </button>
          </div>

          <div className="text-center">
            <a
              href="/auth/cadastro"
              className="text-xs text-[#0e7a63] hover:text-[#0e7a63]/80 transition duration-200 ease-in-out"
            >
              Não tem uma conta? Cadastre-se!
            </a>
          </div>
        </form>
      </section>
    </main>
  );
}
