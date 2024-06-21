'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useActiveAccount, useSetActiveWallet } from 'thirdweb/react';
import { Account, Wallet } from 'thirdweb/wallets';
import { stringify, parse } from 'flatted';
import { connectInAppWallet } from '@/utils/wallet';


interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
    setInAppAccount: (personalAccount: Account | undefined) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const setActiveWallet = useSetActiveWallet();

    const [personalAccount, setPersonalAccount] = useState<Account | undefined>(() => {
        const savedState = localStorage.getItem('myAccount');
        if (savedState) {
            try {
                console.log("Esta guardado", parse(savedState) as Account);
                return parse(savedState) as Account;
            } catch (error) {
                console.error('Error al parsear JSON:', error);
                return undefined;
            }
        }
        return undefined;
    });

    const activeAccount = useActiveAccount();

    useEffect(() => {
        localStorage.setItem('myAccount', stringify(personalAccount));
        console.log("personal Account logged es: ", personalAccount);

        const savedState = localStorage.getItem('myAccount');
        if (savedState) {
            try {
                console.log("va a guardar", personalAccount, stringify(personalAccount));
            } catch (error) {
                console.error('Error al parsear JSON:', error);
            }
        }
    }, [personalAccount]);

    useEffect(() => {
        if (personalAccount && !activeAccount) {
            console.log("LA ACIVE ES", activeAccount);
            connectInAppWallet(personalAccount, setActiveWallet);
            setIsAuthenticated(true);
            console.log("SETEAR LA ACTIVEWALLET");
        }
        if (personalAccount && activeAccount) {
            login();
        }
    }, [activeAccount]);

    const pathName = usePathname();
    const router = useRouter();

    useEffect(() => {
        console.log("HACIENDO LOS CAMBIOS DESDE CONTEXTO", activeAccount);
        if (pathName == "/") {
            if (isAuthenticated) { router.push("/process") };
        }
        else {
            if (!isAuthenticated || !activeAccount) router.push("/");
        }
    }, [isAuthenticated]);

    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(false);
    const setInAppAccount = setPersonalAccount;

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, setInAppAccount }}>
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