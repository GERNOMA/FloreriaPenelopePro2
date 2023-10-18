import { getProviders, signIn, useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth/next'
import { options } from '../api/auth/[...nextauth]/options';

export default async function Name() {

    return (
        <div className='m-auto flex flex-col w-[90vw] md:max-w-[800px]'>
            <span className='mt-4 text-center text-3xl md:text-5xl text-green-500'>Compra realizada!</span>
            <span className='mt-6 text-center text-1xl md:text-2xl text-gray-500'>Tu compra se realizó con éxito! Se envió un mail en caso de proporcionar uno. Ante cualquier problema contáctese con nosotros!</span>
        </div>
    )
}
//aaa