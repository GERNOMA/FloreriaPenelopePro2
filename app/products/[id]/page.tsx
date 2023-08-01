//'use client';
import { useState } from "react";
import axios from "axios";
import { Inter } from "next/font/google";
import { get } from "http";
import Link from "next/link";

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

    return (
    <div className="container flex items-center p-4 mx-auto min-h-screen justify-center">
        <main>
        {
            productList.map((product: any) => {
                return <Product key={product.id} product={product}/>
            })
        }
        </main>
    </div>
    );
}

function Product({ product } : any){

    const {id, name, description, price, imageName} = product || {};

    return (
        <Link href={`/products/${id}`}>
            <div>
                <p>{name}</p>
                <p>{description}</p>
                <p>{price}</p>
                <img src={`${BUCKET_URL}${imageName}`} className="squareImage"/>
            </div>
        </Link>
    );

}