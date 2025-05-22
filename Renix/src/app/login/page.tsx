'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Estado para mensagens de erro
  const router = useRouter();

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
    setErrorMessage(''); // Limpa a mensagem de erro ao tentar enviar o formulário

    // Validação no front-end
    if (!email || !senha) {
      setErrorMessage('Preencha todos os campos!');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Por favor, insira um email válido.');
      return;
    }

    if (senha.length < 6) {
      setErrorMessage('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    try {
  const res = await fetch('http://localhost:3333/api/usuarios/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email_usuario: email, senha_usuario: senha }),
  });

console.log('STATUS DA RESPOSTA:', res.status);
const text = await res.text();
console.log('TEXTO BRUTO DA RESPOSTA:', text);

let data;
try {
  data = JSON.parse(text);
  console.log('RESPOSTA PARSEADA:', data);
} catch (e) {
  console.error('Erro ao fazer parse do JSON:', e);
}


  if (!res.ok) {
    throw new Error(data.message || 'Erro no login');
  }

  const { token } = data;

  if (token) {
    localStorage.setItem('auth_token', token);
    router.push('/investments');
  } else {
    throw new Error('Token não retornado pela API.');
  }
} catch (error: any) {
  console.error('Erro durante o login:', error); // 🔍 log de erro
  setErrorMessage(error.message || 'Erro ao fazer login');
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

          {/* MENSAGEM DE ERRO */}
          {errorMessage && (
            <div className="text-red-500 text-sm">{errorMessage}</div>
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
