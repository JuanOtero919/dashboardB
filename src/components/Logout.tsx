'use client';

import { useDisconnect } from "thirdweb/react";
import { useActiveWallet } from "thirdweb/react";
import { useAuth } from "@/context/context";
import { LogOut } from "lucide-react";
import { useState } from "react";
import Popup from "./Popup";

export default function Logout() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const { isAuthenticated, logout, setInAppAccount } = useAuth();
    const activeWallet = useActiveWallet();
    const { disconnect } = useDisconnect();

    const disconnectWallet = () => {
        console.log(activeWallet);
        if (activeWallet) disconnect(activeWallet);

        console.log("Entro a la funcion con auth:", isAuthenticated);
        logout();
        setInAppAccount(undefined);
        setIsPopupOpen(false); // Cerrar el popup después de confirmar
    }

    const handleCancel = () => {
        setIsPopupOpen(false); // Cerrar el popup después de cancelar
    }

    return (
        <>
            {isPopupOpen && <div className="fixed flex justify-center items-center h-screen">
                <Popup
                    isOpen={isPopupOpen}
                    message="¿Realmente desea salir de la aplicación?"
                    onConfirm={disconnectWallet}
                    onCancel={handleCancel}
                />
            </div>}
            < button onClick={() => setIsPopupOpen(true)}
                className="flex items-center gap-2 hover:bg-gray-200 transition-colors duration-300 ease-in-out py-2 px-4 rounded-lg" >
                <LogOut />
                <span> Cerrar sesión</span>
            </button >
        </>
    )
}