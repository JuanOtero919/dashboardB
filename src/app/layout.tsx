import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "@/app/thirdweb";
import { AuthProvider } from "../context/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Document Management",
    description: "Application destinated to manage grade process in Universidade de Cauca",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en">
            <body className={`${inter.className} flex items-start justify-between`}>
                <ThirdwebProvider>
                    <AuthProvider>
                        {children}
                    </AuthProvider>
                </ThirdwebProvider>
            </body>
        </html>
    );
}