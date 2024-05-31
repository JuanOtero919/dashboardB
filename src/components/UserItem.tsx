'use client';

import { Wallet } from "thirdweb/wallets";
import { useDisconnect } from "thirdweb/react";
import { useActiveWallet } from "thirdweb/react";
import { getUserEmail } from "thirdweb/wallets/in-app";
import { client } from "../utils/constants";
import { useEffect, useState } from "react";
import { useAuth } from "../context/context";

export default function UserItem() {

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


  return <div className="flex items-center justify-between gap-2 border rounded-[8px] p-2">
    <div className="avatar rounded-full min-h-10 min-w-10 bg-emerald-500 text-white font-[700] flex items-center justify-center">
      <p>GD</p>
    </div>
    <div className="grow">
      <p className="text-[16px] font-bold">Usuario X</p>
      <p className="text-[12px] text-neutral-500">{email}</p>
      <p className="text-[10px] text-neutral-500">{wAddress}</p>
      <button onClick={disconnectWallet}>Disconnect</button>

    </div>
  </div>;
}