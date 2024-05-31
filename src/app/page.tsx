// import General from "@/components/Cards/General";
// import { Card } from "@/components/ui/card";

// export default function Home() {
//   return (
//     <div  className="grid gap-[32px]">
//       <div className="grid grid-cols-2 gap-[32px]">
//         <General />
//         <div className="grid gap-[32px]">
//           <Card />
//           <Card />
//         </div>
//       </div>
//       <div className="grid grid-cols-3 gap-[32px]">
//           <Card className="h-[300px]"> Hello </Card>
//           <Card className="h-[300px]"> Hello </Card>
//           <Card className="h-[300px]"> Hello </Card>
//       </div>
//     </div>
//   );
// }

'use client';

import React from "react";
import { useAuth } from "../context/context";
import Login from "../pageComponents/login";
import Dashboard from "../pageComponents/dashboard";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Dashboard />
  ) : (
    <Login />
  )
}
