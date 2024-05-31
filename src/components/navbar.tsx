'use client';

import { Wallet } from "thirdweb/wallets";
import styles from "../app/styles.module.css";
import { useDisconnect } from "thirdweb/react";
import { useActiveWallet } from "thirdweb/react";
import { getUserEmail } from "thirdweb/wallets/in-app";
import { client } from "../utils/constants";
import { useEffect, useState } from "react";
import { useAuth } from "../context/context";

export default function Navbar() {
    const { isAuthenticated, logout } = useAuth();

    const [email, setEmail] = useState("");
    const activeWallet = useActiveWallet() as Wallet;
    let wAddress = "";
    if (activeWallet) {
        wAddress = activeWallet.getAccount()?.address as string;
    };

    const emailInApp = async () => {
        const email1 = await getUserEmail({ client });
        const email = email1 as unknown as string;
        setEmail(email);
    };

    useEffect(() => { emailInApp(); }, [email]);

    const { disconnect } = useDisconnect();

    const disconnectWallet = () => {
        console.log(activeWallet);
        disconnect(activeWallet);
        console.log("Entro a la funcion con auth:", isAuthenticated);
        logout();
    }

    return (
        <div className={styles.navbar}>
            <div className={styles.loginCard}>
                <h3>SGD - Trabajos de Grado</h3>
                <p>{wAddress}</p>
                <p>{email}</p>
                <button onClick={disconnectWallet}>Disconnect</button>
            </div>
        </div>
    )
};