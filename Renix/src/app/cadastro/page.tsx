"use client";

import { useState } from "react";

export default function ProfilePage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <section className="bg-white w-full max-w-[550px] p-8 rounded-2xl shadow-2xl border border-gray-200">
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-8 tracking-wide">
          CADASTRO
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">

          {/* EMAIL */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#0e7a63] text-sm"
              placeholder="Digite seu e-mail"
            />
          </div>

          {/* SENHA */}
          <div>
            <label htmlFor="senha" className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <div className="relative">
              <input
                id="senha"
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#0e7a63] text-sm"
                placeholder="Crie uma senha"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"
              >
                <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </div>
          </div>

          {/* NOME */}
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
              Nome completo
            </label>
            <input
              id="nome"
              type="text"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#0e7a63] text-sm"
              placeholder="Seu nome completo"
            />
          </div>

          {/* CONFIRMAR SENHA */}
          <div>
            <label htmlFor="C_senha" className="block text-sm font-medium text-gray-700 mb-1">
              Confirmar senha
            </label>
            <div className="relative">
              <input
                id="C_senha"
                type={showConfirmPassword ? "text" : "password"}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#0e7a63] text-sm"
                placeholder="Repita sua senha"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"
              >
                <i className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </div>
          </div>

          {/* TERMOS DE USO */}
          <div className="md:col-span-2 flex items-start gap-3 mt-2">
            <input
              type="checkbox"
              id="t_priva"
              className="mt-1 w-5 h-5 text-[#0e7a63] rounded"
            />
            <label htmlFor="t_priva" className="text-sm text-gray-700">
              Aceito os <a href="#" className="underline text-[#0e7a63]">Termos de Uso</a> e a <a href="#" className="underline text-[#0e7a63]">Política de Privacidade</a>.
            </label>
          </div>

          {/* BOTÃO */}
          <div className="md:col-span-2 pt-4">
            <button
              id="cadastrar"
              className="w-full py-3 rounded-xl bg-[#0e7a63] text-white font-semibold text-sm shadow-md hover:bg-[#0e7a63]/90 transition duration-200"
            >
              Cadastrar-se
            </button>
          </div>
        </form>

        {/* LINK PARA LOGIN */}
        <div className="text-center mt-8">
          <a
            href="/auth/login"
            className="text-sm text-[#0e7a63] hover:underline transition"
          >
            Já tem uma conta? Faça o login!
          </a>
        </div>
      </section>
    </main>
  );
}
