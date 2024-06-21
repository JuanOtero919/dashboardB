'use client';

import React from "react";
import { useAuth } from "../context/context";
import Login from "../pageComponents/Login";
import FullScreenLoader from "@/components/FullScreenLoader";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (<FullScreenLoader />) : (<Login />)
}