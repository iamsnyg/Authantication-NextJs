'use client';
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { set } from 'mongoose'

function page() {

    const router = useRouter()
    const [data, setData] = useState("Nothing");

    const getUserData = async () => {
        try {
            const response = await axios.post("/api/users/me");
            console.log(response.data);
            setData(response.data.data._id);
        } catch (error: any) {
            console.log(error.response.data)
            toast.error(error.response.data.message);
        }
    }

    const logout = async () => {
        try {
            console.log("Logging out...");
            const respone=await axios.get("/api/users/logout");
            console.log(respone.data);
            toast.success("Logged out successfully");
            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className='text-white'>Profile Page</h1>
        <hr className='w-1/2 my-4 text-white'/>
        
        <h2
        className='text-white'
        >{data === "Nothing" ? "Loading..." : <Link href={`/profile/${data}`}>{data}</Link>}</h2>

        <button
        className="p-2 my-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg"
        onClick={logout}
        >
            logout
        </button>

        <button
        className="p-2 bg-gradient-to-r from-green-700 to-green-500 text-white rounded-lg"
        onClick={getUserData}
        >
            Get User Data
        </button>
    </div>
  )
}

export default page