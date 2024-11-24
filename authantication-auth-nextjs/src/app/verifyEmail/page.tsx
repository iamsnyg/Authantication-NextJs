'use client';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';


function page() {

    // const router = useRouter();

    const [token, setToken] = useState("");
    // const [loading, setLoading] = useState(false);
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false)

    const verifyUserEmail = async () => {
        try {

            await axios.post("/api/users/verifyEmail", {token});
            setVerified(true);
            setError(false);
            
        } catch (error: any) {
            setError(true);
            console.log(error.response.data)
        }
    }

    useEffect(()=>{
        setError(false);
        const token = window.location.search.split("=")[1];
        setToken(token || "");
        
    }, [])

    useEffect(()=>{

        setError(false);
        if(token.length>0){
            verifyUserEmail();
        }


    }, [token])
  return (
    <div
    className='flex flex-col items-center justify-center min-h-screen py-2'
    >
        <h1
        className='text-2xl text-white font-bold mb-4'
        >Verify Email</h1>
        <h2
        className='p-2 bg-orange-500 text-black rounded-lg'
        >
            {token ? `${token}`: "Invalid token"}
        </h2>
        {verified && (
            <div>
                <h2>Email verified successfully</h2>
                <Link href="/login">Login</Link>
                    
            </div>
        )}

        {error && (
            <div>
                <h2 className='text-white'>
                    Error verifying email
                </h2>
            </div>
        )}
    </div>
  )
}

export default page