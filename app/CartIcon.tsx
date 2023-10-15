'use client';
import { setCookie, getCookie } from 'cookies-next';   
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useItemsCartContext } from './contexts/itemsCarContext';

export default function CartIcon(){

    const router = useRouter();

    const {numberOfItemsInCart, setNumberOfItemsInCart}: any = useItemsCartContext();

    const [bounce, setBounce] = useState(false);
    const [bounceKey, setBounceKey] = useState(-1);
    const calculateNumberOfItemsInCart = () => {
        //setCookie('cart', JSON.stringify([]))
        const currentCartIds = JSON.parse(getCookie('cart') || '{}');

        var counter = 0;

        const valuesOfCurrentCartId: any = Object.values(currentCartIds);

        for(var i = 0; i < valuesOfCurrentCartId.length; i++){
            counter +=  valuesOfCurrentCartId[i];
        }

        setNumberOfItemsInCart(counter);
    };

    useEffect(() => {
        if(bounceKey == -1 && numberOfItemsInCart == -1){
            calculateNumberOfItemsInCart();
        }

        setBounceKey(bounceKey => bounceKey + 1);

        if(bounce == false && bounceKey > 1){
            setBounce(true);
            setTimeout(() => setBounce(false), 1000); // adjust the time as needed
        }
    }, [numberOfItemsInCart]);

    return (
        <div onClick={(e: any) => router.replace('/cart')} className={`fixed right-[3%] bottom-10 bg-blue-300 rounded-full p-5 opacity-80 flex items-center justify-center z-10 hover:cursor-pointer ${bounce ? 'animate-bounce-short' : ''}`}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/67/Ic_shopping_cart_48px.svg" alt="Google Icon" width={80} height={80} />
            {(numberOfItemsInCart != -1) && <span className='text-center text-2xl text-white absolute top-[28%]'>{numberOfItemsInCart}</span>}
        </div>
    );

}