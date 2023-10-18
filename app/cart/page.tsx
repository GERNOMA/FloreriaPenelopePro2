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
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ['latin'] });

const BUCKET_URL = "https://floreria-web-bucket.s3.sa-east-1.amazonaws.com/";

var file: any = null;

export default function ProductRender({ params }: any) {

    const [cartText, setCartText] = useState('Cargando...');
    const [productList, setProductList] = useState([]);
    const [productListQuantities, setProductListQuantities] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [hasLoaded, setHasLoaded] = useState(false);

    const router = useRouter();

    useEffect(() =>{
        const getProducts = async () => {

            const currentCartIds = JSON.parse(getCookie('cart') || '{}');
        
            const keysOfCurrentCartId: any = Object.keys(currentCartIds);
        
            const res = await fetch('https://two70s4325.execute-api.sa-east-1.amazonaws.com/getProducts', {
                method: 'POST',
                cache: 'no-store',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ids: keysOfCurrentCartId }),
            });
            
            if (!res.ok) {
                throw new Error('Failed to fetch data');
            }
            
            var result = await res.json();

            var newTotalValue = 0;
            const valuesOfCurrentCartId: any = Object.values(currentCartIds);

            for(var i = 0; i < valuesOfCurrentCartId.length; i++){
                newTotalValue += result.contacts[i].price * valuesOfCurrentCartId[i];
            }
            setTotalPrice(newTotalValue);

            setProductList(result.contacts);
            setProductListQuantities(Object.values(valuesOfCurrentCartId));
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

    const buyCart = () => {

        const currentCartIds = JSON.parse(getCookie('cart') || '{}');
        
        const keysOfCurrentCartId: any = Object.keys(currentCartIds);

        router.push(`/details?ids=${JSON.stringify(currentCartIds)}`);
    };
    
    //const blurImageUrl = getBase64(`${BUCKET_URL}cat.webp`);

    return (
    <div>
        <main>
            <div className='max-w-[1200px] m-auto flex flex-col lg:flex-row'>
                <div className="lg:w-[500px] w-auto h-min flex flex-col sms:flex-row flex-wrap bg-[#ECECEC] p-4 mx-10 rounded-[5px]">
                    {
                        productList.map((product: any, index: number) => {
                            return <Product key={product.id} product={product} /*blurUrl={`${BUCKET_URL}cat.webp`}*/ quantity={productListQuantities[index]} setHasLoaded={setHasLoaded}/>
                        })
                    }
                    {
                        (cartText != '') && <span className="w-full text-center font-bold">{cartText}</span>
                    }
                </div>
                <div className="lg:w-[500px] flex flex-col min-con h-min bg-blue-300 p-4 mx-10 rounded-[5px] my-10 lg:my-0">
                    {
                        (cartText == '') &&
                        <span className="w-full text-center text-2xl text-white">Detalles</span>
                    }
                        {
                            productList.map((product: any, index: number) => {
                                return(
                                    <div key={index} className="flex flex-row justify-between">
                                        <span className="mt-4 ml-4 text-left text-1xl text-white">{productListQuantities[index]} X {product.name}</span>
                                        <span className="mt-4 mr-4 text-left text-1xl text-white">${(product.price * productListQuantities[index]).toLocaleString('es-AR')}</span>
                                    </div>
                                );
                            })
                        }
                    {
                        (cartText == '') &&
                            <span className="mt-4 ml-4 text-left text-1px text-white">Sub-total:  ${totalPrice.toLocaleString('es-AR')}</span>
                    }
                    {
                        (cartText == '') && 
                            <button onClick={buyCart} className="mt-6 w-full px-6 py-4 border border-transparent text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none">
                                <span>Comprar carrito</span>
                            </button>
                    }
                    {
                        (cartText != '') && <span className="w-full text-center font-bold text-white">{cartText}</span>
                    }
                </div>
            </div>
        </main>
    </div>
    );
}