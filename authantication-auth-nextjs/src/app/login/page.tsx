'use client';

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';


function LoginPage() {
    const router = useRouter();

    const [user, setUser] = useState({
        email: "",
        password: "",
        
    });

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);



    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/profile");
        } catch (error:any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally{
        setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else{
            setButtonDisabled(true);
        }
    }, [user]);

    // if(!loading) return null;

    if(!isLoaded) {
        setIsLoaded(true);
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <div>
            <h1 className='text-2xl text-white font-bold mb-4'>{!loading ? "Processing" : "Login"}</h1>
        </div>
        
        
        <label htmlFor="email">email</label>
        <input 
        className="p-2 text-black border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({...user, email: e.target.value})}
        placeholder="email"
        />


        <label htmlFor="password">password</label>
        <input 
        className="p-2 text-black border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({...user, password: e.target.value})}
        placeholder="password"
        />

       


        <button
            onClick={onLogin}
            className="p-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg"
        >
            Login here
        </button>

        <Link href="/signup">Go! to Signup Page</Link>

        
    </div>
  )
}

export default LoginPage