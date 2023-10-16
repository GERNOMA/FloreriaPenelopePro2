'use client';
import { useState } from "react";
import axios from "axios";
import { Inter } from "next/font/google";
import { get } from "http";
import Link from "next/link";
import Image from 'next/image';
import { useRouter } from "next/navigation";

export default function ProductRender({ params }: any) {

    const router = useRouter();

    return (
        <div className='flex flex-col items-center justify-center m-5'>
            <p className='no-underline text-black font-bold text-[12px] sms:text-[17px] md:text-[22px] mt-3'>Para una mejor experiencia crea una cuenta en nuestro sitio web</p>
            <button onClick={(e: any) => router.replace('/registrarse')} className="mt-6 w-[80vw] md:w-96 px-6 py-4 border border-transparent text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none">
                <span>Crear cuenta</span>
            </button>
            <button onClick={(e: any) => router.replace('/comprar')} className="mt-6 w-[80vw] md:w-96 px-6 py-4 border border-transparent text-base font-medium rounded-md text-white bg-gray-500 hover:bg-gray-600 focus:outline-none">
                <span>Continuar sin cuenta</span>
            </button>
        </div>
    );
}