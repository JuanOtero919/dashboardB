'use client';

import { useEffect } from "react";
import Navbar from "../components/navbar";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/context";

export default function Dashboard() {
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    useEffect(() => {
        if (isAuthenticated) router.push("/process");
    }, [isAuthenticated]
    );

    return (
        <div>
            <Navbar />
        </div>
    )
};