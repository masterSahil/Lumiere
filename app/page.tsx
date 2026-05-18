"use client"
import RegisterPage from "@/component/Authentication/Register";
import AdminDashboard from "@/pages/Dashboard";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {

  const [loggedIn, setLoggedIn] = useState(false);

  const router = useRouter();

  const VerifyLogin = async () => {
  try {
    const token = sessionStorage.getItem("token");
    console.log(token);
    if (!token) {
      setLoggedIn(false);
      router.push("/");
      return;
    }

    const res = await axios.get("http://localhost:3000/api/auth/verify",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res.data);

    setLoggedIn(true);
  } catch (error) {
    console.log(error);
    setLoggedIn(false);
  }
};

  useEffect(() => {
    VerifyLogin();
  }, [])

  return (
    <main>
      {
        loggedIn ? <AdminDashboard /> : <RegisterPage setLoggedIn={setLoggedIn} />
      }
    </main>
  );
}