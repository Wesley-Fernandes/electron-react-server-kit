import { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { SocketProvider } from "@/hooks/useSocket";
import { Toaster } from "sonner";

export default function Layout() {
  const location = useLocation();
  const user = useAuth()
  const navigate = useNavigate()

  useEffect(()=>{
    if(location.pathname === "/"||location.pathname === "/signup"){
      if(user){
        navigate("/auth/home");
      }
    }
  }, [location.pathname, user])
  return (
    <SocketProvider>
      <Toaster position="bottom-left" richColors/>
      <main className="h-screen max-h-screen w-screen overflow-y-auto flex flex-col">
        <Navbar/>
        <Outlet/>
      </main>
    </SocketProvider>
  )
}
