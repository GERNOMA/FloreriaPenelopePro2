"use client";
import React, { useEffect, useState } from 'react'
import { getProviders, signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Providers({session, providers}: any) {

  /*const route = useRouter();

  if(session?.user){
      route.replace('/cart');
  }*/

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const loginCredentials = () => {
    if(Email != '' && Password != ''){
      signIn('credentials', {username: Email, password: Password, redirect: false})
    }
  };

  return (
    <>
        {/*Object.values(providers).map((provider: any) => (
            (provider.id != 'credentials') &&
                <p key={provider.name}>
                    <a href={provider.signinUrl} onClick={(e) => e.preventDefault()}>
                        <button onClick={() => signIn(provider.id, undefined, { prompt: 'select_account' })}>Sign in with {provider.name}</button>
                    </a>
                </p>
        ))*/}
        <div className='flex flex-col items-center justify-center'>
            <button onClick={() => signIn('google', undefined, { prompt: 'select_account' })}
              className="flex items-center justify-center py-[15px] w-[300px] border border-gray-300 rounded-md text-black bg-white hover:bg-gray-200">
                <img src="https://floreria-web-bucket.s3.sa-east-1.amazonaws.com/google.svg" alt="Google Icon" width={30} height={30} />
                <span className="ml-4 text-xl">Google</span>
            </button>
            <input onChange={(e: any) => setEmail(e.target.value)} className="mt-6 flex items-center justify-center w-[300px] px-[25px] py-[15px] border border-gray-300 text-base font-medium rounded-md text-black bg-white hover:bg-gray-200 mb-4 focus:outline-none"
              type="text" placeholder="Email" />
            <input onChange={(e: any) => setPassword(e.target.value)} className="flex items-center justify-center w-[300px] px-[25px] py-[15px] border border-gray-300 text-base font-medium rounded-md text-black bg-white hover:bg-gray-200 mb-4 focus:outline-none"
              type="password" placeholder="Contraseña" />
            <button onClick={loginCredentials} className="mt-6 w-[150px] px-6 py-4 border border-transparent text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none">
                <span>Entrar</span>
            </button>
        </div>
    </>
  )
}