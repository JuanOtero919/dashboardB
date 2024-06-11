'use client';

import { useState } from "react";
import { createSmartWallet, connectSmartWallet } from "../utils/wallet";
import { useSetActiveWallet } from "thirdweb/react";
import { Account } from "thirdweb/wallets";

import { getUserEmail } from "thirdweb/wallets/in-app";
import { client } from "../utils/constants";
import { useAuth } from "../context/context";

export default function Login() {
    const { login } = useAuth();
    const [loadingStatus, setLoadingStatus] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isInvalid, setIsInvalid] = useState<boolean>(false);

    const setActiveAccount = useSetActiveWallet();

    const connectWallet = async () => {
        try {
            setIsLoading(true);
            setIsInvalid(false);
            setLoadingStatus("Inicie sesion con su correo institucional")
            const user_account = await createSmartWallet(setActiveAccount) as Account;
            const email = await getUserEmail({ client });
            setLoadingStatus(`Iniciando sesión como ${email}`);
            if (email?.endsWith("@unicauca.edu.co")) {
                console.log("Correo valido:", email);
                await connectSmartWallet(user_account, email, (status) => setLoadingStatus(status));
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
        <div className="flex items-center justify-center h-screen bg-indigo-900">
            <div className="p-8 bg-gray-100 rounded-lg shadow-lg w-80 text-center">
                <h2 className="text-xl font-bold mb-6 text-center">Login</h2>
                {!isLoading && <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    onClick={() => connectWallet()}
                >Iniciar Sesión</button>}
                {isLoading &&
                    <p className="block text-gray-900">{loadingStatus}</p>
                }
                {isInvalid && <div>
                    <p className="block text-gray-900">Correo no valido</p>
                    <p className="block text-gray-900">El correo debe corresponder con una cuenta institucional</p>
                    <p className="block text-gray-900">"correo@unicauca.edu.co"</p>
                </div>
                }
            </div>
        </div>
    )
};

// isLoading ? (
//     <div className="p-4 bg-gray-100 rounded-lg mb-4">
//         <div className="flex justify-center mb-4">
//             <p className="block text-gray-900">{loadingStatus}</p>
//         </div>
//     </div>
// ) :