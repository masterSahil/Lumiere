'use client'
import AdminDashboard from "@/pages/Dashboard";
import LumiereDining from "@/pages/Home";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
  const [role, setRole] = useState('user');

  const VerifyLogin = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      console.log("No token found");
      return;
    }

    try {
      const res = await axios.get("/api/auth/verify", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setRole(res.data.role);
    } catch (error) {
      console.log(error);
    } 
  }

  useEffect(() => {
    VerifyLogin();
  }, [])

  return (
    <main>
      { role === 'user' ? <LumiereDining /> : <AdminDashboard /> }
    </main>
  );
}