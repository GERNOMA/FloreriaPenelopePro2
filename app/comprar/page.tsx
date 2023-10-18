'use client';
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Inter } from "next/font/google";
import { get } from "http";
import Link from "next/link";
import Image from 'next/image';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { useSearchParams } from 'next/navigation'
import { setCookie, getCookie } from 'cookies-next';  
import { useRouter } from "next/navigation";

export default function ProductRender({ params }: any) {

    const [cartText, setCartText] = useState('Cargando...');
    const [productList, setProductList] = useState([]);
    const [productListQuantities, setProductListQuantities] = useState([]);
    const [totalPrice, setTotalPrice] = useState(1);
    const [hasLoaded, setHasLoaded] = useState(false);

    const productListRef = useRef([]);
    productListRef.current = productList;

    const totalPriceRef = useRef(0);
    totalPriceRef.current = totalPrice;

    const searchParams = useSearchParams()
 
    const search = searchParams?.get('ids')

    const buyerName = getCookie('buyerName');
    const buyerPhone = getCookie('buyerPhone');
    const buyerMail = getCookie('buyerMail');
    const street = getCookie('street');
    const houseNumber = getCookie('houseNumber');
    const streetEsq = getCookie('streetEsq');
    const reveiverName = getCookie('reveiverName');
    const reveiverPhone = getCookie('reveiverPhone');


    useEffect(() =>{
        const getProducts = async () => {

            const currentCartIds = JSON.parse(search || '{}');
        
            const keysOfCurrentCartId: any = Object.keys(currentCartIds);

            console.log('1133  ' + keysOfCurrentCartId);
        
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

        /*const getChangeCurrency = async () => {
            const res = await fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=345aa791a7508f726ef9704d2fd18809&symbols=USD,AUD,CAD,PLN,MXN`, {
                method: 'POST',
                cache: 'no-store',
                headers: {
                    "Content-Type": "application/json",
                },
                //body: JSON.stringify({ ids: keysOfCurrentCartId }),
            });

            const resultJson = res.json();

            console.log(resultJson);
        }*/

        if(!hasLoaded) getProducts();
        //getChangeCurrency();
    }, []);

    const addBuy = async () => {

        var productString = '';

        productListRef.current.map((product: any, index: number) => {
            productString += `[${product.id}, ${product.name}]`
            
            if(productListRef.current.length - 1 > index){
                productString += ', ';
            }
        });

        console.log(JSON.stringify({
            buyerName: buyerName,
            buyerPhone: buyerPhone,
            buyerMail: buyerMail,
            street: street,
            houseNumber: houseNumber,
            streetEsq: streetEsq,
            reveiverName: reveiverName,
            reveiverPhone: reveiverPhone,
            products: productString,
            price: totalPriceRef.current,
        }));

        const res = await fetch('https://two70s4325.execute-api.sa-east-1.amazonaws.com/addBuy', {
            method: 'POST',
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                buyerName: buyerName,
                buyerPhone: buyerPhone,
                buyerMail: buyerMail,
                street: street,
                houseNumber: houseNumber,
                streetEsq: streetEsq,
                reveiverName: reveiverName,
                reveiverPhone: reveiverPhone,
                products: productString,
                price: totalPriceRef.current,
            }),
        });
    
        var result = await res.json();

        console.log('dwadaw  ' + result);

        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
    
    }

    const paypalCreateOrder = async () => {
        console.log('weqdwaaaa ' + String(Math.round(Number(totalPriceRef.current / 40))));
        try {
            let response = await axios.post('/api/paypal/createorder', {
                user_id: '111',
                order_price: String(Math.round(Number(totalPriceRef.current / 40)))
            })
            return response.data.data
        } catch (err) {
            // Your custom code to show an error like showing a toast:
            // toast.error('Some Error Occured')
            return null
        }
    }

    const router = useRouter();

    const paypalCaptureOrder = async (orderID: any) => {
        try {
            let response = await axios.post('/api/paypal/captureorder', {
            orderID
            })
            if (response.data.success) {
                console.log(`wadwdwa`);
                await addBuy();
                router.push('/thanks');
            // Order is successful
            // Your custom code

            // Like showing a success toast:
            // toast.success('Amount Added to Wallet')

            // And/Or Adding Balance to Redux Wallet
            // dispatch(setWalletBalance({ balance: response.data.data.wallet.balance }))
            } else{
                console.log('2222');
            }
        } catch (err) {
            console.log('66666');
            // Order is not successful
            // Your custom code

            // Like showing an error toast
            // toast.error('Some Error Occured')
        }
    }

    return (
        <div className='flex flex-col items-center justify-center m-5'>
            <div className="w-[80vw] md:w-[500px] h-min flex flex-col flex-wrap bg-[#ECECEC] p-4 mx-10 rounded-[5px]">
                {
                    (cartText == '') &&
                    <span className="w-full text-center text-2xl text-black">Datos</span>
                }
                {
                    (cartText == '') &&
                        <>
                            <div className="flex flex-row justify-between">
                                <span className="mt-4 ml-4 text-left text-[12px] sms:text-[14px] text-black">Nombre del comprador:</span>
                                <span className="mt-4 mr-4 text-left text-[12px] sms:text-[14px] text-black">{buyerName}</span>
                            </div>
                            <div className="flex flex-row justify-between">
                                <span className="mt-4 ml-4 text-left text-[12px] sms:text-[14px] text-black">Número de teléfono del comprador:</span>
                                <span className="mt-4 mr-4 text-left text-[12px] sms:text-[14px] text-black">{buyerPhone}</span>
                            </div>
                            <div className="flex flex-row justify-between">
                                <span className="mt-4 ml-4 text-left text-[12px] sms:text-[14px] text-black">Mail del comprador:</span>
                                <span className="mt-4 mr-4 text-left text-[12px] sms:text-[14px] text-black">{buyerMail}</span>
                            </div>
                            <div className="flex flex-row justify-between">
                                <span className="mt-4 ml-4 text-left text-[12px] sms:text-[14px] text-black">Calle de entrega:</span>
                                <span className="mt-4 mr-4 text-left text-[12px] sms:text-[14px] text-black">{street}</span>
                            </div>
                            <div className="flex flex-row justify-between">
                                <span className="mt-4 ml-4 text-left text-[12px] sms:text-[14px] text-black">Número de puerta de entrega:</span>
                                <span className="mt-4 mr-4 text-left text-[12px] sms:text-[14px] text-black">{houseNumber}</span>
                            </div>
                            <div className="flex flex-row justify-between">
                                <span className="mt-4 ml-4 text-left text-[12px] sms:text-[14px] text-black">Esquina de la calle de entrega:</span>
                                <span className="mt-4 mr-4 text-left text-[12px] sms:text-[14px] text-black">{streetEsq}</span>
                            </div>
                            <div className="flex flex-row justify-between">
                                <span className="mt-4 ml-4 text-left text-[12px] sms:text-[14px] text-black">Nombre del receptor:</span>
                                <span className="mt-4 mr-4 text-left text-[12px] sms:text-[14px] text-black">{reveiverName}</span>
                            </div>
                            <div className="flex flex-row justify-between">
                                <span className="mt-4 ml-4 text-left text-[12px] sms:text-[14px] text-black">Número de teléfono del receptor:</span>
                                <span className="mt-4 mr-4 text-left text-[12px] sms:text-[14px] text-black">{reveiverPhone}</span>
                            </div>
                        </>
                }
                {
                    (cartText == '') &&
                    <span className="mt-4 w-full text-center text-2xl text-black">Costos</span>
                }
                    {
                        productList.map((product: any, index: number) => {
                            return(
                                <div key={index} className="flex flex-row justify-between">
                                    <span className="mt-4 ml-4 text-left text-1xl text-black">{productListQuantities[index]} X {product.name}</span>
                                    <span className="mt-4 mr-4 text-left text-1xl text-black">${(product.price * productListQuantities[index]).toLocaleString('es-AR')}</span>
                                </div>
                            );
                        })
                    }
                {
                    (cartText == '') &&
                        <span className="mt-4 ml-4 text-left text-1px text-black">Sub-total:  ${totalPrice.toLocaleString('es-AR')}</span>
                }
                {
                    (cartText != '') && <span className="w-full text-center font-bold text-black">{cartText}</span>
                }
            </div>
            <PayPalScriptProvider
                options={{
                    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
                    currency: 'USD',
                    intent: 'capture'
                }}
            >
                <PayPalButtons
                style={{
                    color: 'gold',
                    shape: 'rect',
                    label: 'pay',
                    height: 50,
                }}
                createOrder={async (data, actions) => {
                    let order_id = await paypalCreateOrder()
                    console.log('wadwa    ' + order_id);
                    return order_id + ''
                }}
                onApprove={async (data, actions) => {
                    let response = await paypalCaptureOrder(data.orderID)
                    /*if (response)*/ return Promise.resolve();
                }}
                className="mt-6 w-[80vw] md:w-[500px]"
                />
            </PayPalScriptProvider>
        </div>
    );
}