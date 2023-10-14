//'use client';
import { useState } from "react";
import axios from "axios";
import { Inter } from "next/font/google";
import { get } from "http";
import Link from "next/link";
import Image from 'next/image';
import getBase64 from "../../utilities/getBase64";

const inter = Inter({ subsets: ['latin'] });

const BUCKET_URL = "https://floreria-web-bucket.s3.sa-east-1.amazonaws.com/";

var file: any = null;

var productList: any = [];

async function getProducts(productId: BigInteger) {
  const res = await fetch('https://two70s4325.execute-api.sa-east-1.amazonaws.com/getProducts', {
    method: 'POST',
    cache: 'no-store',
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: productId }),
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
 
  var result = await res.json();

  productList = result.contacts;
}

export default async function ProductRender({ params }: any) {

    await getProducts(params.id);

    const blurImageUrl = await getBase64(`${BUCKET_URL}cat.webp`);

    return (
    <div>
        <main>
        {
            productList.map((product: any) => {
                return <Product key={product.id} product={product} blurUrl={blurImageUrl}/>
            })
        }
        </main>
    </div>
    );
}

function Product({ product, blurUrl } : any){

    const {id, name, description, price, imageName} = product || {};

    return (
        <div className="px-28 lg:p-5 lg:m-auto lg:align-top lg:flex flex-col lg:flex-row lg:justify-between lg:max-w-[1000px]">
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
                    <Link href={'/askLogin'}>
                        <button className="w-full lg:w-50 lg:ml-6 px-6 py-4 border border-transparent text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none">Agregar al carrito</button>
                    </Link>
                </div>
            </div>
        </div>
    );

}