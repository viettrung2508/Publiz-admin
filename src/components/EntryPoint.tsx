import { Outlet } from "@tanstack/react-router";
import { Toaster } from "react-hot-toast";
import Sidebar from "./Sidebar";
import { SignIn } from "./SignIn";
import { useAuth } from "@/contexts/AuthContext";
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
export const EntryPoint: React.FunctionComponent = () => {
  const auth = useAuth();
  if (auth.authInitializing) {
    return null;
  }
  if (!auth.myProfile) {
    return <SignIn />;
  }
  return (
    <div className="w-full grid grid-cols-12 bg-neutral-800">
      <Toaster />
      <div className="col-span-2">
        <Sidebar />
      </div>
      <div className="col-span-10">
        <Outlet />
        {/* <TanStackRouterDevtools />
        <ReactQueryDevtools /> */}
      </div>

    </div>
  );
};
