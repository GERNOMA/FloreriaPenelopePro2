'use client';
import { useState } from "react";
import axios from "axios";
import { Inter } from "next/font/google";
import { get } from "http";
import Link from "next/link";
import Image from 'next/image';
import getBase64 from "../../../utilities/getBase64";
import { useRouter } from 'next/navigation';

const BUCKET_URL = "https://floreria-web-bucket.s3.sa-east-1.amazonaws.com/";

export default function Product({ product, blurUrl, session } : any) {

    const {id, name, description, price, imageName} = product || {};

    const timeStamp = new Date().getTime()

    const deleteProduct = async (_name: String, _id: BigInteger) => {

        if (confirm('Borrar (mi madre la gorda quiere borrar '+_name+' ?)')) {
            const res = await fetch('https://two70s4325.execute-api.sa-east-1.amazonaws.com/deleteProduct', {
                method: 'POST',
                cache: 'no-store',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: _id
                }),
            })
        
            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }
            alert('Está boraoo');
        } else {
        }

    }

    return (
        <div className='w-100vw m-5 sms:min-w-[300px] sms:w-[25%] sms:m-2 sms:inline-block sms:align-top'>
            <Link href={`/products/${id}`}>
                <Image src={`${BUCKET_URL}${imageName}?${timeStamp}`} priority={true}
                width={500}
                height={500}
                quality={75}
                blurDataURL={blurUrl}
                placeholder="blur"
                style={{
                    objectFit: 'cover',
                    aspectRatio: '1/1'
                }}
                //sizes='100vw'
                className='object-cover rounded-md w-[100vw] md:h-auto aspect-square' alt='Producto'/>
                <p className='no-underline text-black italic text-[17px] mt-3'>{name}</p>
                <p className='no-underline text-gray-500 text-[17px]'>{description}</p>
                <p className='no-underline text-black text-[20px] mt-3'>${price}</p>
            </Link>
            {   
                (session && session?.user?.name == "Alejandra Vicente") &&
                    <button
                        onClick={() => deleteProduct(name, id)}
                        className='m-auto p-2 bg-red-500'>
                        Boorar
                    </button>
            }
        </div>
    );

}