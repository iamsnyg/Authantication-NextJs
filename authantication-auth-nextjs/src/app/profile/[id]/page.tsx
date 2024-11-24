import React from 'react'

function page({params}: any) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1 className='text-white'>Profile Page</h1>
        <hr className='w-1/2 my-4'/>
        <h2 className='p-3 bg-green-400 rounded-lg text-white underline' >{params.id}</h2>
    </div>
  )
}

export default page