import { getProviders, signIn } from 'next-auth/react';
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