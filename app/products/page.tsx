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
  console.log(result);
}

export default async function Home() {

    await getProducts();

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
            <div className="product">
                <img src={`${BUCKET_URL}${imageName}`} className="squareImage"/>
                <p className="italic bigText centerText">{name}</p>
                <p className="noTextStyle grey marginAll">{description}</p>
                <p className="noTextStyle mediumText marginAll">${price}</p>
            </div>
        </Link>
    );

}