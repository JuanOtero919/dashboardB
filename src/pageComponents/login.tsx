'use client';

import { useState } from "react";
import { useSetActiveWallet } from "thirdweb/react";
import { getUserEmail } from "thirdweb/wallets/in-app";
import { createSmartWallet, connectSmartWallet } from "@/utils/wallet";
import { client } from "@/utils/constants";
import { useAuth } from "@/context/context";

export default function Login() {
    const { login, setInAppAccount } = useAuth();
    const [loadingStatus, setLoadingStatus] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isInvalid, setIsInvalid] = useState<boolean>(false);

    const setActiveWallet = useSetActiveWallet();

    const connectWallet = async () => {
        try {
            setIsLoading(true);
            setIsInvalid(false);
            setLoadingStatus("Iniciando sesión...")
            const [user_account, personalWallet] = await createSmartWallet(setActiveWallet);
            const email = await getUserEmail({ client });
            setLoadingStatus(`Iniciando sesión como ${email}`);
            if (user_account && personalWallet && email?.endsWith("@unicauca.edu.co")) {
                console.log("Correo valido:", email);
                await connectSmartWallet(user_account, email, (status) => setLoadingStatus(status));
                setInAppAccount(personalWallet);
                setIsInvalid(false);
                login();
            } else {
                console.log("Correo fuera de sistema", email);
                setIsInvalid(true);
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-indigo-900">
            <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-lg flex h-96  items-center">
                <div className="w-1/2 h-full flex items-end bg-cover bg-center p-4" style={{ backgroundImage: 'url(/11121454_4650044.svg)' }}>
                    <span className="text-xs text-gray-300">Imagen de storyset en Freepik</span>
                </div>
                <div className="w-1/2 p-8 justify-center">
                    <div className="flex items-center justify-center">
                        <h2 className="text-4xl font-semibold mb-4">SG - Docs</h2>
                    </div>
                    <div className="flex items-center justify-center text-center">
                        <p className="text-gray-700 mb-6">Ingresa a tu cuenta insitucional para acceder al sistema de gestión documental de procesos de Grado.</p>
                    </div>
                    {!isLoading &&
                        <div className="flex items-center justify-center dark:bg-gray-800 mb-6">
                            <button onClick={() => connectWallet()}
                                className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
                                <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
                                <span>Iniciar sesión con Google</span>
                            </button>
                        </div>
                    }
                    {isLoading &&
                        <div className="flex items-center justify-center text-center">
                            <p className="text-gray-700 mb-6">{loadingStatus}</p>
                        </div>

                    }
                    {isInvalid &&
                        <div className="text-center">
                            <p className="text-red-500 mb-2">Correo no valido</p>
                            <p className="text-gray-700 mb-2">El correo debe corresponder con una cuenta institucional</p>
                            <p className="text-gray-700 mb-2">"correo@unicauca.edu.co"</p>
                        </div>
                    }
                </div>
            </div>
        </div >
    );
}

//Componente de inicio de sesión: https://tailwindflex.com/@shakti/google-login-signup-button