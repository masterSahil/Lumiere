'use client'
import AddMenu from '@/component/admin/addMenu/addMenu'
import axios from 'axios'
import { useEffect, useState } from 'react'

const page = () => {

  const [role, setRole] = useState('user')

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
    <>
      {role === 'admin' && <AddMenu /> }
    </>
  )
}

export default page