'use client';
import { setCookie, getCookie } from 'cookies-next';   

import Link from "next/link";
import { useState } from 'react';

const BUCKET_URL = "https://floreria-web-bucket.s3.sa-east-1.amazonaws.com/";

export default function Product({ product, blurUrl } : any){

    const [numberOfItemsToAddToCart, setNumberOfItemsToAddToCart] = useState(1);

    const {id, name, description, price, imageName} = product || {};

    const addToCart = () => {

        //setCookie('cart', JSON.stringify({}))
        const currentCartIds = JSON.parse(getCookie('cart') || '{}');
    
        var newCartIds: any = {};

        if(Object.keys(currentCartIds).includes(String(id))){
            newCartIds = {...currentCartIds, [id]: currentCartIds[id] + numberOfItemsToAddToCart};
        } else{
            newCartIds = {...currentCartIds, [id]: numberOfItemsToAddToCart};
        }
    
        setCookie('cart', JSON.stringify(newCartIds))
    
        console.log('dwadwadw    ' + getCookie('cart')); 
    };

    return (
        <div className="px-[15%] lg:p-5 lg:m-auto lg:align-top lg:flex flex-col lg:flex-row lg:justify-between lg:max-w-[1400px]">
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
                className="object-cover rounded-lg w-full lg:w-[500px] lg:h-auto aspect-square lg:inline-block" alt='Producto'/>
            <div className="lg:inline-block lg:ml-8 lg:mr-8">
                <p className="no-underline text-black font-semibold text-[18px] mt-3">{name}</p>
                <p className="no-underline text-gray-500 text-[16px]">{description}</p>
                <p className="no-underline text-black font-bold text-[22px] mt-3">${price}</p>
                <div className='flex flex-col lg:flex-row justify-between mt-4'>
                    <Link href={'/askLogin'}>
                        <button className="w-full lg:w-40 px-6 py-4 border border-transparent text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none mb-4 lg:mb-0">Comprar</button>
                    </Link>
                    <div className='flex flex-row justify-between'>
                        <input onChange={(e: any) => setNumberOfItemsToAddToCart(Number(e.target.value))} type="number" min="1" max="99" defaultValue='1' placeholder="cantidad"
                            className="border border-gray-300 text-center rounded-md w-[35%] lg:max-w-[55px] lg:ml-4" />
                        <button onClick={addToCart} className="w-[60%] lg:w-60 lg:ml-2 px-6 py-4 border border-transparent text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none">Agregar al carrito</button>
                    </div>
                </div>
            </div>
        </div>
    );

}