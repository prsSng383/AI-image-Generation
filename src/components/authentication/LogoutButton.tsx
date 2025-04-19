"use client"
import { logout } from '@/app/actions/auth-actions'
import React from 'react'

const LogoutButton = () => {
  
    const handelLogout =async()=>{
        await logout()
    }
  
    return (
    <span onClick={handelLogout} className="inline-block w-full cursor-pointer text-destructive" >logout</span>
  )
}

export default LogoutButton