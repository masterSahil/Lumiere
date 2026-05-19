"use client"
import RegisterPage from "@/component/Authentication/Register";
import AdminDashboard from "@/pages/Dashboard";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "./loading";
import LumiereDining from "@/pages/Home";

export default function Page() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const VerifyLogin = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        setLoggedIn(false);
        router.push("/");
        return;
      }

    try {
      setLoading(true);
      await axios.get("/api/auth/verify",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLoggedIn(true);
    } catch (error) {
      console.log(error);
      setLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    VerifyLogin();
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <main>
      {
        loggedIn ? <LumiereDining /> : <RegisterPage setLoggedIn={setLoggedIn} />
      }
    </main>
  );
}