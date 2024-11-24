'use client';

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast, { Toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


function page() {
    const router = useRouter();

    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    });

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSignup=async()=>{
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);

            console.log(response.data);
            router.push("/login");

        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0 && user.username.length>0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    }, [user])

  return (
    <div
    className='flex flex-col items-center justify-center min-h-screen py-2'
    >
        <h1
        className='text-2xl text-white font-bold mb-4'
        >{loading ? "Processing...": "Signup"}</h1>
        <label className='text-white' htmlFor="username">username</label>
        <input
        className='p-2 text-black border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600'
        id='username'
        value={user.username}
        onChange={(e)=> setUser({...user, username: e.target.value})}
        placeholder='Username'
        type="text" />
        <label className='text-white' htmlFor="email">Email</label>
        <input
        className='p-2 text-black border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600'
        id='email'
        value={user.email}
        onChange={(e)=> setUser({...user, email: e.target.value})}
        placeholder='Email'
        type="email" />
        <label className='text-white' htmlFor="password">Password</label>
        <input
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600'
        id='password'
        value={user.password}
        onChange={(e)=> setUser({...user, password: e.target.value})}
        placeholder='Password'
        type="password" />
        <button 
        className='p-2 mx-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg'
        onClick={onSignup}
        >
            {buttonDisabled ? "Please fill all fields": "Signup"}
        </button>
        <Link className='text-white underline' href="/login">
        visit login page
        </Link>
    
    </div>
  )
}

export default page