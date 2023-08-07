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
        <div className="p-5 sms:m-auto sms:align-top sms:max-w-[700px]">
            <Image src={`${BUCKET_URL}${imageName}`}
                width={500}
                height={500}
                quality={75}
                blurDataURL={blurUrl}
                placeholder="blur"
                style={{
                    objectFit: 'cover',
                    aspectRatio: '1/1'
                }}
                className="object-cover rounded-md w-[100vw] sms:w-[60%] sms:h-auto aspect-square sms:inline-block" alt='Producto'/>
            <div className="sms:inline-block sms:align-top sms:ml-3">
                <p className="no-underline text-black italic text-[17px] mt-3">{name}</p>
                <p className="no-underline text-gray-500 text-[17px]">{description}</p>
                <p className="no-underline text-black text-[20px] mt-3">${price}</p>
                <Link href={'/comprar'}>
                    <button className="no-underline text-black text-[20px] mt-3 bg-green-500 rounded-3xl px-4 py-2">Comprar</button>
                </Link>
            </div>
        </div>
    );

}