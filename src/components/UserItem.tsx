'use client';

import { Wallet } from "thirdweb/wallets";
import { useDisconnect } from "thirdweb/react";
import { useActiveWallet } from "thirdweb/react";
import { getUserEmail } from "thirdweb/wallets/in-app";
import { client } from "../utils/constants";
import { useEffect, useState } from "react";
import { useAuth } from "../context/context";
import { useRouter } from "next/navigation";

export default function UserItem() {

  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");

  const activeWallet = useActiveWallet() as Wallet;
  let wAddress = "";
  if (activeWallet) {
    wAddress = activeWallet.getAccount()?.address as string;
  };

  const emailInApp = async () => {
    const email1 = await getUserEmail({ client });
    const email = email1 as unknown as string;
    setEmail(email);
    setUser(email[0].toUpperCase());
  };

  useEffect(() => { emailInApp(); }, [email]);
  useEffect(() => { if (!isAuthenticated) router.push("/"); }, [isAuthenticated]);

  const { disconnect } = useDisconnect();

  const disconnectWallet = () => {
    console.log(activeWallet);
    disconnect(activeWallet);
    console.log("Entro a la funcion con auth:", isAuthenticated);
    logout();
  }


  return <>
    <div className="border rounded-[8px] p-2">
      <div className="flex items-center justify-between gap-2">
        <div className="avatar rounded-full min-h-10 min-w-10 bg-emerald-500 text-white font-[700] flex items-center justify-center">
          <p>{user}</p>
        </div>
        <div className="grow">
          <p className="text-[14px] font-bold">{email}</p>
        </div>
      </div>
      <p className="text-[10px] text-neutral-500">{wAddress}</p>
    </div>
    <div className="flex justify-center mb-4 p-2">
      <button className="bg-indigo-500 text-sm text-white py-1 px-4 rounded hover:bg-indigo-600"
        onClick={disconnectWallet}>Cerrar sesión</button>
    </div>
  </>
}