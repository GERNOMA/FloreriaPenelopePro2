'use client';
import { useEffect, useState } from "react";
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Image from 'next/image';
import { getServerSession } from "next-auth";
import { options } from './api/auth/[...nextauth]/options';
 


export default function NavigationBar({ categories, session }: any){

    const [movileNav, setMovileNav] = useState(false);
    return (
        <nav className='bg-gray-300 fixed top-0 left-0 right-0 z-10'>
            <div className={movileNav
                    ? 'fixed left-0 top-0 w-[50%] h-screen bg-[#ecf0f3] p-10 ease-in duration-500'
                    : 'fixed left-[-100%] w-[50%] h-screen top-0 p-10 ease-in duration-500'}>
                <div className='flex flex-col'>
                    <div onClick={() => setMovileNav(!movileNav)} className="my-4">
                        <AiOutlineClose size={20}/>
                    </div>
                    <Link href='/' className='no-underline my-4' onClick={() => setMovileNav(!movileNav)}>
                        Home
                    </Link>
                    
                    {   
                        (session && session?.user?.name == "Alejandra Vicente") &&
                            <Link href='/createProduct' className='no-underline my-4'>
                                Agregar
                            </Link>
                    }
                    
                    {
                        categories.map((product: any) => {
                            return (<Link  key={product.id} href={`/products/categories/${product.id}`} className='no-underline my-4' onClick={() => setMovileNav(!movileNav)}>
                                {product.name}
                            </Link>);
                        })
                    }
                </div>
            </div>
            <div className='hidden sm:flex p-3'>
                <Link href='/' className='no-underline p-2'>
                Home
                </Link>

                {   
                    (session && session?.user?.name == "Alejandra Vicente") &&
                        <Link href='/createProduct' className='no-underline p-2'>
                            Agregar
                        </Link>
                }

                {
                categories.map((product: any) => {
                    return (<Link key={product.id} href={`/products/categories/${product.id}`} className='no-underline p-2'>
                        {product.name}
                    </Link>);
                })
                }
            </div>
            <div className='sm:hidden flex p-3 flex-row flex-wrap justify-between'>
                {/*<div className='no-underline'>
                    <Image className='w-10 aspect-square object-cover align-center' src='https://floreria-web-bucket.s3.sa-east-1.amazonaws.com/dog.webp' priority={true} alt='Icono'
                        width={100} height={100}/>
            </div>*/}

                <div className='no-underline p-2' onClick={() => setMovileNav(!movileNav)}>
                    <AiOutlineMenu size={20}/>
                </div>
            </div>
      </nav>
    );

}