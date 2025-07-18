"use client";

// import { Header } from "@/component/layout/header";
// import SideBar from "@/component/layout/slidebar";
// import { useAuth } from "@/context/auth.context";
// import { useRouter } from "next/navigation";
// import React, { useEffect } from "react";

// interface IProps {
//   children: React.ReactNode;
// }

// const Layout: React.FC<IProps> = ({ children }) => {
//   const { isAuthenticated } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!isAuthenticated) {
//       router.replace("/login");
//     }
//   }, [isAuthenticated, router]);

//   return (
//     <div className="flex h-full w-full overflow-y-clip">
//       <div className="h-full w-[250px] border-r border-gray-400">
//         <SideBar />
//       </div>
//       <div className="mb-10 w-full flex flex-col flex-1">
//         <div className="h-fit ">
//           <Header />
//         </div>
//         <div className="flex-1 overflow-auto">{children}</div>
//       </div>
//     </div>
//   );
// };

// export default Layout;
// auth.context.tsx
// app/dashboard/layout.tsx
"use client";

import { Header } from "@/component/layout/header";
import SideBar from "@/component/layout/slidebar";
import { useAuth } from "@/context/auth.context";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface IProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<IProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) return null;

  return (
    <div className="flex h-full w-full overflow-y-clip">
      <div className="h-full w-[250px] border-r border-gray-400">
        <SideBar />
      </div>
      <div className="mb-10 w-full flex flex-col flex-1">
        <div className="h-fit">
          <Header />
        </div>
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
