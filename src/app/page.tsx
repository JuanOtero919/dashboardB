'use client';

import React, { useEffect } from "react";
import { useAuth } from "../context/context";
import { useRouter } from "next/navigation";
import Login from "../pageComponents/login";

export default function Home() {
  const { isAuthenticated } = useAuth();

  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated) router.push("/process");
  }, [isAuthenticated]
  );

  return isAuthenticated ? (
    <p>Redirigiendo...</p>
  ) : (
    <Login />
  )
}