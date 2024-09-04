'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {DashboardProvider} from "@/contexts/DashBoardContext";
import { useAuthContext } from "@/contexts/AuthContext";


const DashboardLayout: React.FC<{children: React.ReactNode}> = ({children}) => {
  const router = useRouter()
  const {isLogin} = useAuthContext()

  useEffect(() => {
    if (!isLogin) {
      router.push('/admin/login'); 
    }
  }, [isLogin, router]);

  if (!isLogin) {
    return null;
  }

  return (
    <DashboardProvider>
      {children}
    </DashboardProvider>
  )
}

export default DashboardLayout;