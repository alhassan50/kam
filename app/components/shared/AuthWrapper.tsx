'use client'

import { selectisLoggedIn } from "@/app/redux/slices/authSlice";
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import ProfileContainer from "./ProfileContainer";
import Link from "next/link";

function AuthWrapper() {
  const authState = useSelector(selectisLoggedIn);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  console.log('rendering');

  useEffect(() => {
    setIsLoggedIn(null);
    const checkAuth = async () => {
      const response = await fetch('/api/auth/check');
      const data = await response.json();
      setIsLoggedIn(data.isLoggedIn);
    };

    checkAuth();
  }, [authState]);

  useEffect(() => {
    console.log("isLoggedIn::::::::", isLoggedIn);
  }, [isLoggedIn]);
  
  return (
    <>
      {
        isLoggedIn === null ? <CircularProgress size={16} /> 
          : isLoggedIn ? <ProfileContainer /> 
            : <Link href="?login=y" className="hover:underline text-sm"> Log In </Link>
      }
    </>
  )
}

export default AuthWrapper