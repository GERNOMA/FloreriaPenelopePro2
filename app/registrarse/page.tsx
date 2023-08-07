//'use client';
import { useState } from "react";
import axios from "axios";
import { Inter } from "next/font/google";
import { get } from "http";
import Link from "next/link";
import Image from 'next/image';
import { options } from '../api/auth/[...nextauth]/options';
import { getServerSession } from "next-auth";

export default async function ProductRender({ params }: any) {

    //const session = await getServerSession(options);

    return (
        <div className='flex flex-col items-center justify-center m-5'>
            {/*<p className='text-3xl text-center'>{session?.user?.name}</p>
            <img src={session?.user?.image ?? ''} className='text-3xl text-center' />*/}
            <Link href={''}>
                <button className="no-underline text-black text-[20px] bg-green-500 rounded-3xl px-4 py-2 my-5">Google</button>
            </Link>
            <Link href={''}>
                <button className="no-underline text-black text-[20px] bg-green-500 rounded-3xl px-4 py-2 my-5">Sin Google</button>
            </Link>
        </div>
    );
}