import React, { useEffect, useState } from 'react'
import { getProviders, signIn, useSession } from 'next-auth/react';
import Providers from './providers';
import { getServerSession } from 'next-auth/next'
import { options } from '../api/auth/[...nextauth]/options';

export default async function Name() {

    const session = await getServerSession(options);
    const providers = await getProviders();

    return (
        <>
            <p className='text-3xl text-center'>{JSON.stringify(session?.user)}</p>
            <Providers session={session} providers={providers}/>
        </>
    )
}

/*import React from 'react'
import { getProviders, signIn } from 'next-auth/react';

export default async function name(params:type) {

  const providers: any =  await getProviders();
console.log(providers);
  return (
    <>
      {Object.values(providers).map((provider : any) => (
        <p key={provider.name}>
          <a href={provider.signinUrl} onClick={(e) => e.preventDefault()}>
            <button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
          </a>
        </p>
      ))}
    </>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      providers: await getProviders()
    }
  }
}*/