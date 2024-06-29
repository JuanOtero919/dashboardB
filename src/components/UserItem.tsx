'use client';

import { useActiveWallet } from "thirdweb/react";
import { getUserEmail } from "thirdweb/wallets/in-app";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/context";
import { client } from "@/utils/constants";

export default function UserItem() {

  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");

  const activeWallet = useActiveWallet();
  const wAddress = activeWallet ? activeWallet?.getAccount()?.address as string : '';

  const emailInApp = async () => {
    const email1 = await getUserEmail({ client });
    const email = email1 as unknown as string;
    setEmail(email);
    setUser(email[0].toUpperCase());
  };

  useEffect(() => { emailInApp(); }, [email]);
  useEffect(() => { if (!isAuthenticated) {router.push("/");
  console.log("CERRANDO DESDE USER")
  }
   }, [isAuthenticated]);

  return (
    <div className="border rounded-[8px] p-2">
      <div className="flex items-center justify-between gap-2">
        <div className="avatar rounded-full min-h-10 min-w-10 bg-indigo-900 text-white font-[700] flex items-center justify-center">
          <p>{user}</p>
        </div>
        <div className="grow">
          <p className="text-[14px] font-bold">{email}</p>
        </div>
      </div>
      <p className="text-[10px] text-neutral-500 mt-1">{wAddress}</p>
    </div>
  )
}