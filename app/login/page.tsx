'use client'
import LoginPage from '@/component/Authentication/Login'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const page = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const router = useRouter();

  const VerifyLogin = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      return setLoggedIn(false);
    }

    try {
      await axios.get("http://localhost:3000/api/auth/verify", {
        headers: {
          Authorization: `bearer ${token}`
        }
      })

      setLoggedIn(true);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    VerifyLogin();
  }, [])

  return (
    <>
      {!loggedIn && <LoginPage />}
    </>
  )
}

export default page