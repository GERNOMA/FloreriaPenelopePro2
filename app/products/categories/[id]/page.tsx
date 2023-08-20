//'use client';
import { useState } from "react";
import axios from "axios";
import { Inter } from "next/font/google";
import { get } from "http";
import Link from "next/link";
import Image from 'next/image';
import getBase64 from "../../../utilities/getBase64";

const inter = Inter({ subsets: ['latin'] });

const BUCKET_URL = "https://floreria-web-bucket.s3.sa-east-1.amazonaws.com/";

var file: any = null;

var productList: any = [];

var productBlurList: any = [];

var productCategoryId = 0;

async function getProducts() {
  const res = await fetch('https://two70s4325.execute-api.sa-east-1.amazonaws.com/getProducts', {
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
 
  var result = await res.json();

  productList = result.contacts;
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

    const blurImageUrl = await getBase64(`${BUCKET_URL}cat.webp`);

    return (
    <div className="sms:m-auto sms:max-w-[1500px] flex flex-col sms:flex-row flex-wrap justify-center">
        {/*productBlurList[index]*/
            productList.map((product: any, index: any) => {
                return <Product key={product.id} product={product} blurUrl={blurImageUrl}/>
            })
        }
    </div>
    );
}

function Product({ product, blurUrl } : any) {

    const {id, name, description, price, imageName} = product || {};

    const timeStamp = new Date().getTime()

    return (
        <div className='w-100vw m-5 sms:min-w-[300px] sms:w-[25%] sms:m-2 sms:inline-block sms:align-top'>
            <Link href={`/products/${id}`}>
                <Image src={`${BUCKET_URL}${imageName}?${timeStamp}`} priority={true}
                width={500}
                height={500}
                quality={75}
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