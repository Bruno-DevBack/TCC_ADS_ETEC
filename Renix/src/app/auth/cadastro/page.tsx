"use client";  // Adicione esta linha no topo do seu arquivo

import { useState } from 'react';

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
    <main className="flex flex-col min-h-screen bg-gray-50 font-sans text-gray-800">
      <main className="bg-[#BABABA] min-h-screen flex items-center justify-center sm:bg-[#0e7a63] ">
        <section className="bg-[#d9d9d9] w-[700px] p-6 rounded flex flex-col items-center shadow-lg 2xl:w-[900px]">

          {/* Cadastro */}
          <h2 className="text-black font-semibold mb-4 text-center pt-2 xl:text-xl 2xl:text-3xl">
            CADASTRO
          </h2>

          {/* Formulário */}
          <form className="w-full max-w-[600px] grid sm:grid-cols-2 mt:grid-cols-0 gap-6 mt-4 2xl:max-w-[800px]">

            {/* EMAIL */}
            <div>
              <label htmlFor="email" className="text-xs font-bold text-black block mb-1 xl:text-base 2xl:text-xl">
                E-MAIL:
              </label>
              <input
                id="email"
                type="text"
                className="w-full h-6 px-2 border border-gray-400 rounded text-sm 2xl:text-xl 2xl:h-10 2xl:px-4"
              />
            </div>

            {/* ENDEREÇO */}
            <div>
              <label htmlFor="endereco" className="text-xs font-bold text-black block mb-1 xl:text-base 2xl:text-xl">
                ENDEREÇO:
              </label>
              <input
                id="endereco"
                type="text"
                className="w-full h-6 px-2 border border-gray-400 rounded text-sm 2xl:text-xl 2xl:h-10 2xl:px-4"
              />
            </div>

            {/* SENHA */}
            <div>
              <label htmlFor="senha" className="text-xs font-bold text-black block mb-1 xl:text-base 2xl:text-xl">
                SENHA:
              </label>
              <div className="relative">
                <input
                  id="senha"
                  type={showPassword ? "text" : "password"} // Altera o tipo de input
                  className="w-full h-6 px-2 border border-gray-400 rounded text-sm 2xl:text-xl 2xl:h-10 2xl:px-4"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i> {/* Ícone de olho */}
                </button>
              </div>
            </div>

            {/* NOME */}
            <div>
              <label htmlFor="nome" className="text-xs font-bold text-black block mb-1 xl:text-base 2xl:text-xl">
                NOME COMPLETO:
              </label>
              <input
                id="nome"
                type="text"
                className="w-full h-6 px-2 border border-gray-400 rounded text-sm 2xl:text-xl 2xl:h-10 2xl:px-4"
              />
            </div>

            {/* CONFIRMAR SENHA */}
            <div>
              <label htmlFor="C_senha" className="text-xs font-bold text-black block mb-1 xl:text-base 2xl:text-xl">
                CONFIRMAR SENHA:
              </label>
              <div className="relative">
                <input
                  id="C_senha"
                  type={showConfirmPassword ? "text" : "password"} // Altera o tipo de input
                  className="w-full h-6 px-2 border border-gray-400 rounded text-sm 2xl:text-xl 2xl:h-10 2xl:px-4"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                >
                  <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i> {/* Ícone de olho */}
                </button>
              </div>
            </div>

            {/* CNPJOTO */}
            <div>
              <label htmlFor="cn_cp" className="text-xs font-bold text-black block mb-1 xl:text-base 2xl:text-xl">
                CNPJ/CPF:
              </label>
              <input
                id="cn_cp"
                type="text"
                className="w-full h-6 px-2 border border-gray-400 rounded text-sm xl:text-lg 2xl:text-xl 2xl:h-10 2xl:px-4"
              />
            </div>

            {/* CONIRMAR TERMOS */}
            <div className="col-span-1 flex items-center gap-2 mt-4">
              <input type="checkbox" id="t_priva" className="w-[16px] h-[16px] 2xl:w-[26px] 2xl:h-[26px]" />
              <label htmlFor="t_priva" className="text-xs font-bold text-black xl:text-sm 2xl:text-xl">
                Aceito os termos de uso e a política de privacidade
              </label>
            </div>

            {/* BOTÃO DE CADASTRAR */}
            <div className="pt-3">
              <button
                id="cadastrar"
                className="border border-[#0e7a63] bg-[#0e7a63] text-white font-bold py-1 px-2 rounded w-full hover:bg-[#0e7a63]/80 transition duration-200 ease-in-out margin-top-[200px] xl:text-xl 2xl:text-2xl"
              >
                CADASTRAR-SE
              </button>
            </div>
          </form>

          {/* Link para Login */}
          <div className="text-center mt-10 mb-4">
            <a
              href="/auth/login"
              className="text-xs text-[#0e7a63] hover:text-[#0e7a63]/80 transition duration-200 ease-in-out xl:text-base 2xl:text-xl"
            >
              Já tem uma conta? Faça o login!
            </a>
          </div>
        </section>
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
    </main>
  );
}
