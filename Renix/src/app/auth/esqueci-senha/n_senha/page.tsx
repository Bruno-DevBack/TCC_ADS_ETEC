"use client";

import React from 'react'; // Importa o React
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Importa o hook useRouter

export default function ProfilePage() {
  const router = useRouter(); // Inicializa o hook useRouter

  const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
      setShowConfirmPassword(!showConfirmPassword);
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Evita o comportamento padrão do formulário
    alert('Senha alterada com sucesso!'); // Exibe a mensagem de alerta
    router.push('/auth/login'); // Redireciona para a rota desejada
  };

  return (
    <main className="bg-[#BABABA] min-h-screen flex items-center justify-center sm:bg-[#0e7a63] ">
      <section className="bg-[#d9d9d9] w-[700px] p-6 rounded flex flex-col items-center shadow-lg sm:w-[420px] xl:w-[520px] 2xl:w-[620px]">

        {/* CONFIRMAR CÓDIGO */}
        <h2 className="text-black font-semibold mb-4 text-center pt-2 xl:text-2xl 2xl:text-3xl">
          NOVA SENHA
        </h2>

        {/* Formulário */}
        <form className="w-full grid sm:grid-cols-0 mt:grid-cols-0 gap-6 mt-4" onSubmit={handleSubmit}>
          
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

          {/* BOTÃO */}
          <div>
            <button
              id="logar"
              type="submit" // Define o tipo do botão como submit
              className="border border-[#0e7a63] bg-[#0e7a63] text-white font-bold py-1 px-2 rounded w-full hover:bg-[#0e7a63]/80 transition duration-200 ease-in-out xl:text-xl 2xl:text-3xl"
            >
              Confirmar
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
