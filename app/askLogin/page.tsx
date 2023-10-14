//'use client';
import { useState } from "react";
import axios from "axios";
import { Inter } from "next/font/google";
import { get } from "http";
import Link from "next/link";
import Image from 'next/image';

export default async function ProductRender({ params }: any) {

    return (
        <div className='flex flex-col items-center justify-center m-5'>
            <p className='no-underline text-black font-bold text-[22px] mt-3'>Para una mejor experiencia crea una cuenta en nuestro sitio web</p>
            <Link href={'/registrarse'}>
                <button className="mt-6 w-full md:w-96 px-6 py-4 border border-transparent text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none">
                    <span>Crear cuenta</span>
                </button>
            </Link>
            <Link href={'/comprar'}>
                <button className="mt-6 w-full md:w-96 px-6 py-4 border border-transparent text-base font-medium rounded-md text-white bg-gray-500 hover:bg-gray-600 focus:outline-none">
                    <span>Continuar sin cuenta</span>
                </button>
            </Link>
        </div>
    );
}