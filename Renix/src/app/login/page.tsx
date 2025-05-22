"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Importa o useRouter do Next.js
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [mensagem, setMensagem] = useState('');

  const router = useRouter(); 
  const { login } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Função para validar email
  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Função para enviar o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem("");
    // Validação no front-end
    if (!email || !senha) {
      setMensagem('Preencha todos os campos!');
      return;
    }

    if (!validateEmail(email)) {
      setMensagem('Por favor, insira um email válido.');
      return;
    }

    if (senha.length < 6) {
      setMensagem('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    try {
      await login(email, senha);
      router.push('/profile');
    } catch (error: any) {
      setMensagem(error?.response?.data?.message || error.message || 'Erro no login');
    }
  };

  return (
    <main className="bg-gray-50 min-h-screen flex items-center justify-center">
      <section className="bg-white w-[90%] max-w-[460px] p-8 rounded-2xl shadow-2xl border border-[#e5e5e5]">
        {/* Login */}
        <h2 className="text-gray-900 font-bold text-2xl text-center mb-6 tracking-wide">
          LOGIN
        </h2>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-6">
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-[#0e7a63] focus:border-transparent transition duration-150"
              placeholder="Digite seu e-mail"
              required
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
                type={showPassword ? 'text' : 'password'}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-[#0e7a63] focus:border-transparent transition duration-150"
                placeholder="Digite sua senha"
                required
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

          {/* MENSAGEM DE FEEDBACK */}
          {mensagem && (
            <div className="text-center mt-4 text-sm text-red-600">{mensagem}</div>
          )}

          {/* BOTÃO */}
          <div>
            <button
              type="submit" // Definido como 'submit' para enviar o formulário
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
