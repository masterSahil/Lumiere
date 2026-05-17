"use client"
import RegisterPage from "@/component/Authentication/Register";
import AdminDashboard from "@/pages/Dashboard";
import { useEffect, useState } from "react";

export default function Page() {

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    let isLogin = sessionStorage.getItem("token"); 
    isLogin && setLoggedIn(true);
  }, [])

  return (
    <main>
      {
        loggedIn ? <AdminDashboard /> : <RegisterPage />
      }
    </main>
  );
}