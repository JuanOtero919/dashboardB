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
            setLoadingStatus("Iniciando sesion con correo institucional")
            const user_account = await createSmartWallet(setActiveAccount) as Account;
            const correo = await getUserEmail({ client });
            setLoadingStatus(`Iniciando sesión como ${correo}`);
            if (correo?.endsWith("@unicauca.edu.co")) {
                console.log("Correo valido:", correo);
                const wallet_address = await
                    connectSmartWallet(user_account, correo, (status) => setLoadingStatus(status));
                setIsInvalid(false);
                login();
            } else {
                console.log("Correo fuera de sistema", correo);
                setIsInvalid(true);
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    return isLoading ? (
        <div className="p-4 bg-gray-100 rounded-lg mb-4">
            <div className="flex justify-center mb-4">
                <p className="block text-gray-900">{loadingStatus}</p>
            </div>
        </div>
    ) : (
        <div className="p-4 bg-gray-100 rounded-lg mb-4">
            <div className="flex justify-center mb-4">
                <h2 className="text-xl font-semibold">Login</h2>
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"

                    onClick={() => connectWallet()}
                >Conectar Wallet / Login</button>
                {isInvalid && <div>
                    <p className="block text-gray-900">"Correo no valido"</p>
                    <p className="block text-gray-900">"El correo debe corresponder con una cuenta institucional"</p>
                    <p className="block text-gray-900">"correo@unicauca.edu.co"</p>
                </div>
                }
            </div>
        </div>
    )
};