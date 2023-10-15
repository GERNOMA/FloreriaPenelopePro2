'use client';
import { setCookie, getCookie } from 'cookies-next';   

import Link from "next/link";
import { useState } from 'react';
import { useItemsCartContext } from '../contexts/itemsCarContext';

const BUCKET_URL = "https://floreria-web-bucket.s3.sa-east-1.amazonaws.com/";

export default function Product({ product, /*blurUrl,*/ quantity, setHasLoaded } : any){

    const {id, name, description, price, imageName} = product || {};

    const {numberOfItemsInCart, setNumberOfItemsInCart}: any = useItemsCartContext();

    const removeFromCart = () => {
        //setCookie('cart', JSON.stringify({}))
        const currentCartIds = JSON.parse(getCookie('cart') || '{}');
    
        var newCartIds: any = currentCartIds;

        if(Object.keys(newCartIds).includes(String(id))){
            setNumberOfItemsInCart(numberOfItemsInCart - Number(newCartIds[String(id)]));
            delete newCartIds[String(id)];
        }
    
        setCookie('cart', JSON.stringify(newCartIds))
    
        setHasLoaded(false);

        console.log('dwadwadw    ' + getCookie('cart')); 
    };

    return (
     <div className="relative p-1 m-auto lg:align-top lg:flex flex-col w-full sms:w-[200px]">
        <img src={`${BUCKET_URL}${imageName}`}    
            width={500}
            height={500}
            //quality={75}
            //blurDataURL={blurUrl}
            placeholder="blur"
            style={{
                objectFit: 'cover',
                aspectRatio: '1/1'
            }}
            className="object-cover rounded-lg w-full p-5 sms:p-0 sms:w-[200px] lg:h-auto aspect-square lg:inline-block brightness-50" alt='Producto'/>
        <div className='absolute inset-0 flex flex-col items-center justify-center'>
            <span className='text-center text-5xl text-white'>{quantity}</span>
            <span className='text-center text-1xl text-white'>u. ${price.toLocaleString('es-AR')}</span>
            <span className='text-center text-1xl text-white'>total. ${(price * quantity).toLocaleString('es-AR')}</span>
        </div>
        <div className='absolute top-2 right-2'>
            <button onClick={removeFromCart} className=' rounded-full w-8 h-8 bg-red-300 hover:bg-red-400'>
                <span className='text-center text-2xl text-white'>X</span>
            </button>
        </div>
    </div>
    );

}