'use client';
import { useState } from "react";
import axios from "axios";
import { Inter } from "next/font/google";
import { get } from "http";
import Link from "next/link";
import Image from 'next/image';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'

export default function ProductRender({ params }: any) {

    const paypalCreateOrder = async () => {
        try {
            let response = await axios.post('/api/paypal/createorder', {
                user_id: '111',
                order_price: '435'
            })
            return response.data.data
        } catch (err) {
            // Your custom code to show an error like showing a toast:
            // toast.error('Some Error Occured')
            return null
        }
    }

    const paypalCaptureOrder = async (orderID: any) => {
        try {
            let response = await axios.post('/api/paypal/captureorder', {
            orderID
            })
            if (response.data.success) {
                console.log('aaaaaaa');
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
                className="w-52 md:w-96"
                />
            </PayPalScriptProvider>
        </div>
    );
}