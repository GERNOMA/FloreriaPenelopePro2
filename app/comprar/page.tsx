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
            <p className='text-2xl text-center'>Para una mejor experiencia crea una cuenta en nuestro sitio web</p>
            <Link href={'/registrarse'}>
                <button className="mt-6 w-80 px-6 py-4 border border-gray-300 text-base font-medium rounded-md text-black bg-green-200 hover:bg-green-300 focus:outline-none">
                    <span>Crear cuenta</span>
                </button>
            </Link>
            <Link href={'/comprar'}>
                <button className="mt-6 w-80 px-6 py-4 border border-gray-300 text-base font-medium rounded-md text-black bg-gray-200 hover:bg-gray-300 focus:outline-none">
                    <span>Continuar sin cuenta</span>
                </button>
            </Link>
        </div>
    );
}