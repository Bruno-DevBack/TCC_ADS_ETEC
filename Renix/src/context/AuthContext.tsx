"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { loginUsuario, buscarUsuario } from '@/services/usuarioService';
import { Usuario } from '@/types';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
    usuario: Usuario | null;
    login: (email: string, senha: string) => Promise<void>;
    logout: () => void;
    setUsuario: (usuario: Usuario | null) => void; // ADICIONA setUsuario
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [logoutTimer, setLogoutTimer] = useState<NodeJS.Timeout | null>(null);

    // Função para checar expiração do token e agendar logout
    const checarExpiracaoToken = () => {
        let token = localStorage.getItem('token') || Cookies.get('token');
        if (!token) return;
        try {
            const decoded: any = jwtDecode(token);
            if (decoded && decoded.exp) {
                const exp = decoded.exp * 1000; // ms
                const agora = Date.now();
                if (exp <= agora) {
                    logout();
                } else {
                    // Agenda logout automático
                    if (logoutTimer) clearTimeout(logoutTimer);
                    const timeout = setTimeout(() => {
                        logout();
                    }, exp - agora);
                    setLogoutTimer(timeout);
                }
            }
        } catch (e) {
            // Token inválido, faz logout
            logout();
        }
    };

    useEffect(() => {
        // Sempre tenta restaurar o usuário e o token de todas as fontes ao iniciar
        const restaurarSessao = () => {
            let sessionUser = typeof window !== 'undefined' ? sessionStorage.getItem('usuario') : null;
            let token = typeof window !== 'undefined' ? sessionStorage.getItem('token') : null;
            if (!sessionUser && typeof window !== 'undefined') {
                sessionUser = localStorage.getItem('usuario') || Cookies.get('usuario') || null;
            }
            if (!token && typeof window !== 'undefined') {
                token = localStorage.getItem('token') || Cookies.get('token') || null;
            }
            if (sessionUser) setUsuario(JSON.parse(sessionUser));
            if (token) {
                localStorage.setItem('token', token);
                sessionStorage.setItem('token', token);
                Cookies.set('token', token, { expires: 7 });
            }
        };
        restaurarSessao();
        checarExpiracaoToken();
        window.addEventListener('storage', checarExpiracaoToken);
        return () => {
            if (logoutTimer) clearTimeout(logoutTimer);
            window.removeEventListener('storage', checarExpiracaoToken);
        };
    }, []); // Corrige: dependências sempre []

    const login = async (email: string, senha: string) => {
        const res = await loginUsuario(email, senha);
        const data: any = res.data;
        let usuario = null;
        let token = data.token || data.accessToken || data.jwt;
        if (data && typeof data === 'object') {
            if (data.usuario && typeof data.usuario === 'object') {
                usuario = data.usuario;
            } else if (data.data && data.data.usuario) {
                usuario = data.data.usuario;
            } else if (Array.isArray(data)) {
                if (data.length > 0) usuario = data[0];
            } else if ('id' in data || 'nome_usuario' in data) {
                usuario = data;
            }
        }
        if (!usuario) {
            throw new Error('Não foi possível obter os dados do usuário.');
        }
        if (token) {
            localStorage.setItem('token', token);
            Cookies.set('token', token, { expires: 7 });
        }
        sessionStorage.setItem('usuario', JSON.stringify(usuario));
        localStorage.setItem('usuario', JSON.stringify(usuario));
        if (usuario.id) localStorage.setItem('userId', String(usuario.id));
        setUsuario(usuario);
        checarExpiracaoToken(); // Só chama aqui, não após cada atualização
    };

    const logout = async () => {
        try {
            if (usuario?.id) {
                await import('@/services/usuarioService').then(mod => mod.logoutUsuario(usuario.id!));
            }
        } catch (e) {
            console.error('Erro ao fazer logout na API:', e);
        }
        localStorage.removeItem('token');
        Cookies.remove('token');
        localStorage.removeItem('userId');
        sessionStorage.removeItem('usuario');
        setUsuario(null);
        if (logoutTimer) clearTimeout(logoutTimer);
    };

    return (
        <AuthContext.Provider value={{ usuario, login, logout, setUsuario }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth precisa estar dentro do AuthProvider');
    return context;
};
