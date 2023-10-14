import { getProviders, signIn, useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth/next'
import { options } from '../api/auth/[...nextauth]/options';
import RegisterForm from './registerForm';

export default async function Name() {

    const session = await getServerSession(options);
    const providers = await getProviders();

    return (
        <>
            <p className='text-3xl text-center'>Registrarse</p>
            <RegisterForm session={session} providers={providers}/>
        </>
    )
}
