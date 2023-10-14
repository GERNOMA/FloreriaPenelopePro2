"use client";
import React, { useEffect, useState } from 'react'
import { getProviders, signIn, useSession } from 'next-auth/react';

export default function Providers({session, providers}: any) {

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
              className="flex items-center justify-center px-28 py-6 border border-gray-300 rounded-md text-black bg-white hover:bg-gray-200">
                <img src="https://floreria-web-bucket.s3.sa-east-1.amazonaws.com/google.svg" alt="Google Icon" width={30} height={30} />
                <span className="ml-4 text-xl">Google</span>
            </button>
            <input onChange={(e: any) => setEmail(e.target.value)} className="mt-6 flex items-center justify-center px-4 py-4 border border-gray-300 text-base font-medium rounded-md text-black bg-white hover:bg-gray-200 mb-4 focus:outline-none"
              type="text" placeholder="Email" />
            <input onChange={(e: any) => setPassword(e.target.value)} className="flex items-center justify-center px-4 py-4 border border-gray-300 text-base font-medium rounded-md text-black bg-white hover:bg-gray-200 mb-4 focus:outline-none"
              type="password" placeholder="Contraseña" />
            <button onClick={loginCredentials} className="flex items-center justify-center px-6 py-4 border border-gray-300 text-base font-medium rounded-md text-black bg-white hover:bg-gray-200 focus:outline-none">
                <span>Entrar</span>
            </button>
        </div>
    </>
  )
}