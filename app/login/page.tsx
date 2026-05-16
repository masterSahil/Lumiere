import LoginPage from '@/component/Authentication/Login'
import { notFound, redirect } from 'next/navigation';

const page = () => {

  const login = false;

  if (login) {
    // redirect("/");
    notFound();
  }

  return (
    <>
      <LoginPage />
    </>
  )
}

export default page