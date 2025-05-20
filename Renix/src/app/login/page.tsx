"use client";

import { useState } from "react";

export default function ProfilePage() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="bg-gray-50 min-h-screen flex items-center justify-center">
      <section className="bg-white w-[90%] max-w-[460px] p-8 rounded-2xl shadow-2xl border border-[#e5e5e5]">
        {/* Login */}
        <h2 className="text-gray-900 font-bold text-2xl text-center mb-6 tracking-wide">
          LOGIN
        </h2>

        {/* Formulário */}
        <form className="space-y-6">
          {/* E-MAIL */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-[#0e7a63] focus:border-transparent transition duration-150"
              placeholder="Digite seu e-mail"
            />
          </div>

          {/* SENHA */}
          <div>
            <label
              htmlFor="senha"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Senha
            </label>
            <div className="relative">
              <input
                id="senha"
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-[#0e7a63] focus:border-transparent transition duration-150"
                placeholder="Digite sua senha"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"
              >
                <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
          </div>

          {/* BOTÃO */}
          <div>
            <button
              id="logar"
              className="w-full py-3 rounded-xl bg-[#0e7a63] text-white font-semibold text-sm shadow-md hover:bg-[#0e7a63]/90 transition duration-200"
            >
              Entrar
            </button>
          </div>

          {/* LINKS INFERIORES */}
          <div className="flex justify-between text-sm mt-4 text-[#0e7a63]">
            <a
              href="cadastro"
              className="hover:underline transition"
            >
              Criar conta
            </a>
            <a
              href="esqueci-senha/c_email"
              className="hover:underline transition"
            >
              Esqueci a senha
            </a>
          </div>
        </form>
      </section>
    </main>
    
  );
}
