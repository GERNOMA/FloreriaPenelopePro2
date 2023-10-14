'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import { Inter } from "next/font/google";
import { get } from "http";
import Link from "next/link";
import Image from 'next/image';
import getBase64 from "../utilities/getBase64";
import Product from "./Product";
import { setCookie, getCookie } from 'cookies-next';   

const inter = Inter({ subsets: ['latin'] });

const BUCKET_URL = "https://floreria-web-bucket.s3.sa-east-1.amazonaws.com/";

var file: any = null;

export default function ProductRender({ params }: any) {

    const [cartText, setCartText] = useState('Cargando...');
    const [productList, setProductList] = useState([]);
    const [productListQuantities, setProductListQuantities] = useState([]);
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() =>{
        console.log('fefe');
        const getProducts = async () => {

            const currentCartIds = JSON.parse(getCookie('cart') || '{}');
        
            const valuesOfCurrentCartId: any = Object.keys(currentCartIds);
        
            console.log('dwdwadad ' + JSON.stringify(currentCartIds));
        
            const res = await fetch('https://two70s4325.execute-api.sa-east-1.amazonaws.com/getProducts', {
                method: 'POST',
                cache: 'no-store',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ids: valuesOfCurrentCartId }),
            });
            
            if (!res.ok) {
                throw new Error('Failed to fetch data');
            }
            
            var result = await res.json();
            console.log('11111 ' + JSON.stringify(result));
            setProductList(result.contacts);
            setProductListQuantities(Object.values(currentCartIds));
            setHasLoaded(true);

            if(result.contacts.length == 0) {
                setCartText('No tienes productos en tu carito');
            }
            else {
                setCartText('');
            }
        }

        if(!hasLoaded) getProducts();
    });

    
    //const blurImageUrl = getBase64(`${BUCKET_URL}cat.webp`);

    return (
    <div>
        <main>
            <div className='max-w-[1200px] m-auto'>
                <div className="lg:max-w-[500px] w-auto flex flex-col sms:flex-row flex-wrap bg-gray-300 py-2 mx-10 rounded-3xl">
                    {
                        productList.map((product: any, index: number) => {
                            return <Product key={product.id} product={product} blurUrl={`${BUCKET_URL}cat.webp`} quantity={productListQuantities[index]} setHasLoaded={setHasLoaded}/>
                        })
                    }
                    {
                        (cartText != '') && <span className="w-full text-center font-bold">{cartText}</span>
                    }
                </div>
            </div>
        </main>
    </div>
    );
}