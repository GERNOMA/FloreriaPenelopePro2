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
            <p className='text-3xl text-center'>Para una mejor experiencia crea una cuenta en nuestro sitio web!</p>
            <Link href={'/buy'}>
                <button className="no-underline text-black text-[20px] bg-green-500 rounded-3xl px-4 py-2 my-5">Registarse</button>
            </Link>
            <Link href={'/buy'}>
                <button className="no-underline text-black text-[20px] bg-green-500 rounded-3xl px-4 py-2 my-5">Continuar sin registrarse</button>
            </Link>
        </div>
    );
}