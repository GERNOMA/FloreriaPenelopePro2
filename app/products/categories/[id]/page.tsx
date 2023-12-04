//'use client';
import { useState } from "react";
import axios from "axios";
import { Inter } from "next/font/google";
import { get } from "http";
import Link from "next/link";
import Image from 'next/image';
import getBase64 from "../../../utilities/getBase64";
import { useRouter } from 'next/navigation';
import Product from "./Product";
import { getServerSession } from 'next-auth/next'
import { options } from '../../../api/auth/[...nextauth]/options';
import excuteQuery from "@/app/db";

const inter = Inter({ subsets: ['latin'] });

const BUCKET_URL = "https://floreria-web-bucket.s3.sa-east-1.amazonaws.com/";

var file: any = null;

var productList: any = [];

var productBlurList: any = [];

var productCategoryId = 0;

async function getProducts() {

    var res = await excuteQuery({ query: 'SELECT * FROM products WHERE idCategory = ?', values: [productCategoryId] });

    productList = res;

    /*const res = await fetch('https://two70s4325.execute-api.sa-east-1.amazonaws.com/getProducts', {
    method: 'POST',
    cache: 'no-store',
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ categoryId: productCategoryId }),
    })

    if (!res.ok) {
    throw new Error('Failed to fetch data')
    }

    var result = await res.json();*/

    //productList = result.contacts;
}

var blurImagesCount = 0;

export default async function ProductsRender({ params }: any) {

    productCategoryId = params.id;

    await getProducts();

    /*const getBlurImage = async(product: any) => {
        console.log(product.blurImageName);
        const blurDataURL = await getBase64(`${BUCKET_URL}${product.blurImageName}`);
        productBlurList.push(blurDataURL);
    }*/

    /*const getBlurImages = async() => {
        console.time("for of");
        const data = []
        const promises = productList.map((product: any) => getBlurImage(product));
        await Promise.all(promises);
        console.timeEnd("for of");
    }1*/

    //await getBlurImages();

    //const blurImageUrl = await getBase64(`${BUCKET_URL}cat.webp`);

    const session = await getServerSession(options);

    const timeStamp = new Date().getTime();

    return (
    <div className="sms:m-auto sms:max-w-[1500px] flex flex-col sms:flex-row flex-wrap justify-center">
        {/*productBlurList[index]*/
            productList.map((product: any, index: any) => {
                return <Product key={product.id} product={product} /*blurUrl={blurImageUrl}*/ session={session} timeStamp={timeStamp}/>
            })
        }
    </div>
    );
}