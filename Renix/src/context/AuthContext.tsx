"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { loginUsuario, buscarUsuario } from '@/services/usuarioService';
import { Usuario } from '@/types';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
    usuario: Usuario | null;
    login: (email: string, senha: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    useEffect(() => {
        // Recupera usuário da sessionStorage ao carregar
        const userSession = sessionStorage.getItem('usuario');
        if (userSession) {
            setUsuario(JSON.parse(userSession));
            return;
        }
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (token && userId) {
            try {
                const decoded: any = jwtDecode(token);
                // Verifica expiração do token (exp em segundos)
                if (decoded.exp && Date.now() >= decoded.exp * 1000) {
                    logout();
                    return;
                }
                buscarUsuario(userId).then((res) => {
                    setUsuario(res.data as Usuario);
                    sessionStorage.setItem('usuario', JSON.stringify(res.data));
                });
            } catch (e) {
                // Token inválido
                logout();
            }
        }
        // Listener para atualização global do usuário
        const atualizarUsuarioListener = () => {
            const sessionUser = sessionStorage.getItem('usuario');
            if (sessionUser) setUsuario(JSON.parse(sessionUser));
        };
        window.addEventListener('usuarioAtualizado', atualizarUsuarioListener);
        return () => {
            window.removeEventListener('usuarioAtualizado', atualizarUsuarioListener);
        };
    }, []);

    const login = async (email: string, senha: string) => {
        const res = await loginUsuario(email, senha);
        const data: any = res.data;
        // Trata o formato { data: { usuario: { ... } } }
        let usuario = null;
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
        sessionStorage.setItem('usuario', JSON.stringify(usuario));
        if (usuario.id) localStorage.setItem('userId', String(usuario.id));
        setUsuario(usuario);
    };

    const logout = async () => {
        try {
            if (usuario?.id) {
                await import('@/services/usuarioService').then(mod => mod.logoutUsuario(usuario.id!));
            }
        } catch (e) {
            // Apenas loga o erro, mas continua o logout local
            console.error('Erro ao fazer logout na API:', e);
        }
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        sessionStorage.removeItem('usuario');
        setUsuario(null);
    };

    return (
        <AuthContext.Provider value={{ usuario, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth precisa estar dentro do AuthProvider');
    return context;
};
