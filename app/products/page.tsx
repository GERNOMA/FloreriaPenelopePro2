//'use client';
import { useState } from "react";
import axios from "axios";
import { Inter } from "next/font/google";
import { get } from "http";
import Link from "next/link";
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

const BUCKET_URL = "https://floreria-web-bucket.s3.sa-east-1.amazonaws.com/";

var file: any = null;

var productList: any = [];

async function getProducts() {
  const res = await fetch('https://two70s4325.execute-api.sa-east-1.amazonaws.com/getProducts', {
    method: 'POST',
    cache: 'no-store',
  })
 
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  var result = await res.json();

  productList = result.contacts;
}

export default async function Home() {

    await getProducts();

    return (
    <div className="md:m-auto md:max-w-[1500px] flex flex-col md:flex-row flex-wrap justify-center">
        {
            productList.map((product: any) => {
                return <Product key={product.id} product={product}/>
            })
        }
    </div>
    );
}

function Product({ product } : any){

    const {id, name, description, price, imageName} = product || {};

    return (
        <div className='w-100vw m-5 md:min-w-[300px] md:w-[25%] md:m-2 md:inline-block md:align-top'>
            <Link href={`/products/${id}`}>
                <img src={`${BUCKET_URL}${imageName}`} /*priority={true}
                width='0'
                height='0'
                sizes='100vw'*/
                className='object-cover rounded-md w-[100vw] h-[100vw] md:h-auto aspect-square' alt='Producto'/>
                <p className='no-underline text-black italic text-[17px] mt-3'>{name}</p>
                <p className='no-underline text-gray-500 text-[17px]'>{description}</p>
                <p className='no-underline text-black text-[20px] mt-3'>${price}</p>
            </Link>
        </div>
    );

}