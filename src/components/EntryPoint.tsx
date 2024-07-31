import { Outlet } from "@tanstack/react-router";
import { Toaster } from "react-hot-toast";
import Sidebar from "./Sidebar";
// import { SignIn } from "./SignIn";
import { useAuth } from "@/contexts/AuthContext";

export const EntryPoint: React.FunctionComponent = () => {
  const auth = useAuth();
  if (auth.authInitializing) {
    return null;
  }
  // if (!auth.myProfile) {
  //   return <SignIn />;
  // }
  return (
    <div className="w-full grid grid-cols-[300px,_1fr] bg-neutral-800">
      <Toaster />
      <div className="">
        <Sidebar />
      </div>
      <div className="">
        <Outlet />
      </div>

    </div>
  );
};
