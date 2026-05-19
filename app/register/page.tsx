"use client"
import RegisterPage from '@/component/Authentication/Register';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Loading from '../loading';

const page = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const VerifyLogin = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      return setLoggedIn(false);
    }

    try {
      setLoading(true);
      await axios.get("/api/auth/verify", {
        headers: {
          Authorization: `bearer ${token}`
        }
      })

      setLoggedIn(true);
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    VerifyLogin();
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <>
      {!loggedIn && <RegisterPage />}
    </>
  )
}

export default page