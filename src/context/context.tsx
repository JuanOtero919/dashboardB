'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useActiveAccount } from 'thirdweb/react';

interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const activeAccount = useActiveAccount();

    useEffect(() => { if (activeAccount) login(); }, [activeAccount]);

    const pathName = usePathname();
    const router = useRouter();

    useEffect(() => {
        console.log("Gestión de direccionamiento con cuenta activa:", activeAccount);
        if (pathName == "/") {
            if (isAuthenticated) { router.push("/process") };
        }
        else {
            if (!isAuthenticated || !activeAccount) router.push("/");
        }
    }, [isAuthenticated]);

    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(false);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};