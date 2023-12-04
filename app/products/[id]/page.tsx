//'use client';
import { useState } from "react";
import axios from "axios";
import { Inter } from "next/font/google";
import { get } from "http";
import Link from "next/link";
import Image from 'next/image';
import getBase64 from "../../utilities/getBase64";
import Product from "./Product";
import excuteQuery from "@/app/db";

const inter = Inter({ subsets: ['latin'] });

const BUCKET_URL = "https://floreria-web-bucket.s3.sa-east-1.amazonaws.com/";

var file: any = null;

var productList: any = [];

async function getProducts(productId: BigInteger) {
  
  var res = await excuteQuery({ query: 'SELECT * FROM products WHERE id = ?', values: [productId] });

  productList = res;

  /*const res = await fetch('https://two70s4325.execute-api.sa-east-1.amazonaws.com/getProducts', {
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

  productList = result.contacts;*/
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