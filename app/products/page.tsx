//'use client';
import { useState } from "react";
import axios from "axios";
import { Inter } from "next/font/google";
import { get } from "http";
import Link from "next/link";
import Image from 'next/image';
import getBase64 from "../utilities/toBase64";

const inter = Inter({ subsets: ['latin'] });

const BUCKET_URL = "https://floreria-web-bucket.s3.sa-east-1.amazonaws.com/";

var file: any = null;

var productList: any = [];

var productBlurList: any = [];

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

    const getBlurImages = async() => {
        console.time("for of");
        const data = []
        for (const product of productList) {
            console.log(product.blurImageName);
            const blurDataURL = await getBase64(`${BUCKET_URL}${product.blurImageName}`);
            productBlurList.push(blurDataURL);
        }
        console.timeEnd("for of");
    }

    await getBlurImages();

    return (
    <div className="md:m-auto md:max-w-[1500px] flex flex-col md:flex-row flex-wrap justify-center">
        {
            productList.map((product: any, index: any) => {
                return <Product key={product.id} product={product} blurUrl={productBlurList[index]}/>
            })
        }
    </div>
    );
}

function Product({ product, blurUrl } : any) {

    const {id, name, description, price, imageName} = product || {};

    const timeStamp = new Date().getTime()

    return (
        <div className='w-100vw m-5 md:min-w-[300px] md:w-[25%] md:m-2 md:inline-block md:align-top'>
            <Link href={`/products/${id}`}>
                <Image src={`${BUCKET_URL}${imageName}?${timeStamp}`} priority={true}
                width={300}
                height={300}
                quality={80}
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
        </div>
    );

}