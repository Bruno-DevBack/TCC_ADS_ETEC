"use client";
import "./globals.css";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

function Sidebar({ menuAberto, setMenuAberto }: { menuAberto: boolean; setMenuAberto: (v: boolean) => void }) {
  const { usuario, logout } = useAuth();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 p-6 z-40 transform transition-transform duration-300 ${menuAberto ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <button onClick={() => setMenuAberto(false)} className="mb-6 text-gray-600 font-bold text-xl">
        ✕
      </button>
      <ul className="space-y-4 text-lg">
        <li>
          <button onClick={() => router.push('/investments')} className="hover:text-blue-600">Página Inicial</button>
        </li>
        <li>
          <button onClick={async () => { await logout(); router.push('/login'); }} className="hover:text-red-600 w-full text-left">Sair</button>
        </li>
      </ul>
    </div>
  );
}

function NavbarSession({ onMenuClick }: { onMenuClick: () => void }) {
  const { usuario } = useAuth();
  const [user, setUser] = useState<any>(usuario);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!usuario) {
      const sessionUser =
        typeof window !== "undefined"
          ? sessionStorage.getItem("usuario")
          : null;
      if (sessionUser) setUser(JSON.parse(sessionUser));
    } else {
      setUser(usuario);
    }
  }, [usuario]);

  if (!isMounted || !user) return null;

  return (
    <nav className="bg-white shadow-sm px-6 py-3 flex justify-between items-center border-b border-gray-200">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="text-xl font-bold mr-2">
          <span className="sr-only">Abrir menu</span>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="18" x2="20" y2="18" /></svg>
        </button>
        <img src="/logo.png" alt="Logo" className="w-8 h-8" />
        <span className="text-lg text-black font-bold">RENIX</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-700">{user.nome_usuario}</span>
        <Link href="/profile">
          <img
            src={user.fotoPerfilBase64 ? user.fotoPerfilBase64 : "/avatar.png"}
            alt="Avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
        </Link>
      </div>
    </nav>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Sidebar menuAberto={menuAberto} setMenuAberto={setMenuAberto} />
          <NavbarSession onMenuClick={() => setMenuAberto(true)} />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
