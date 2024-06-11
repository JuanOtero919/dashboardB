import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" flex items-start justify-between">
      <Sidebar />
      <main className="grid w-full h-full pl-[300px]">
        {/* <Header /> */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}