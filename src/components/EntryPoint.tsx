import { Outlet } from "@tanstack/react-router";
import { Toaster } from "react-hot-toast";
import Sidebar from "./Sidebar";
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
export const EntryPoint: React.FunctionComponent = () => {

  return (
    <div className="w-full grid gird-cols-12 bg-neutral-800">
      <Toaster />
      <div className="col-span-1">
        <Sidebar />
      </div>
      <div className="col-span-11">
        <Outlet />
        {/* <TanStackRouterDevtools />
        <ReactQueryDevtools /> */}
      </div>

    </div>
  );
};
