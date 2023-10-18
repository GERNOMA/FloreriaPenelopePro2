'use client';
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { setCookie, getCookie } from 'cookies-next';   

export default function loading(){

    var [buyerName, setBuyerName] = useState(getCookie('buyerName') || '');
    var [buyerPhone, setBuyerPhone] = useState(getCookie('buyerPhone') || '');
    var [buyerMail, setBuyerMail] = useState(getCookie('buyerMail') || '');
    var [street, setStreet] = useState(getCookie('street') || '');
    var [houseNumber, setHouseNumber] = useState(getCookie('houseNumber') || '');
    var [streetEsq, setStreetEsq] = useState(getCookie('streetEsq') || '');
    var [reveiverName, setReveiverName] = useState(getCookie('reveiverName') || '');
    var [reveiverPhone, setReveiverPhone] = useState(getCookie('reveiverPhone') || '');

    var [buyerNameRed, setBuyerNameRed] = useState(false);
    var [buyerPhoneRed, setBuyerPhoneRed] = useState(false);
    var [streetRed, setStreetRed] = useState(false);
    var [houseNumberRed, setHouseNumberRed] = useState(false);
    var [streetEsqRed, setStreetEsqRed] = useState(false);
    var [reveiverNameRed, setReveiverNameRed] = useState(false);

    var [formState, setFormState] = useState('');

    const router = useRouter();

    const searchParams = useSearchParams()
 
    const search = searchParams?.get('ids')

    console.log(search);

    const goToBuy = () => {

        setBuyerNameRed(buyerName === '');
        setBuyerPhoneRed(buyerPhone === '');
        setStreetRed(street === '');
        setHouseNumberRed(houseNumber === '');
        setStreetEsqRed(streetEsq === '');
        setReveiverNameRed(reveiverName === '');
    
        if (buyerName === '' || buyerPhone === '' || street === '' || houseNumber === '' || streetEsq === '' || reveiverName === '') {
            setFormState('Llena todos los campos obligatorios*')
            return;
        }

        setFormState('')

        setCookie('buyerName', buyerName);
        setCookie('buyerPhone', buyerPhone);
        setCookie('buyerMail', buyerMail);
        setCookie('street', street);
        setCookie('houseNumber', houseNumber);
        setCookie('streetEsq', streetEsq);
        setCookie('reveiverName', reveiverName);
        setCookie('reveiverPhone', reveiverPhone);

        router.push(`/comprar?ids=${search}&buyerName=${buyerName}&buyerPhone=${buyerPhone}&buyerMail=${buyerMail}&street=${street}&houseNumber=${houseNumber}&streetEsq=${streetEsq}&reveiverName=${reveiverName}&reveiverPhone=${reveiverPhone}`);

    };

    return(
        <div className="m-auto w-min flex flex-col">
            <span className="text-center text-2xl">Datos para el envío</span>
            <input onChange={(e: any) => { setBuyerName(e.target.value) }} defaultValue={buyerName} placeholder="Nombre del comprador*" className={`mt-6 shadow appearance-none border rounded w-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${buyerNameRed ? 'border-red-500' : 'border-gray-300'}`}/>
            <input onChange={(e: any) => { setBuyerPhone(e.target.value) }} defaultValue={buyerPhone} placeholder="Número de teléfono del comprador*" className={`mt-6 shadow appearance-none border rounded w-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${buyerPhoneRed ? 'border-red-500' : 'border-gray-300'}`}/>
            <input onChange={(e: any) => { setBuyerMail(e.target.value) }} defaultValue={buyerMail} placeholder="Correo electrónico del comprador" className="mt-6 shadow appearance-none border rounded w-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            <input onChange={(e: any) => { setStreet(e.target.value) }} defaultValue={street} placeholder="Calle de entrega*" className={`mt-6 shadow appearance-none border rounded w-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${streetRed ? 'border-red-500' : 'border-gray-300'}`}/>
            <input onChange={(e: any) => { setHouseNumber(e.target.value) }} defaultValue={houseNumber} placeholder="Número de puerta de entrega*" className={`mt-6 shadow appearance-none border rounded w-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${houseNumberRed ? 'border-red-500' : 'border-gray-300'}`}/>
            <input onChange={(e: any) => { setStreetEsq(e.target.value) }} defaultValue={streetEsq} placeholder="Esquina de la calle de entrega*" className={`mt-6 shadow appearance-none border rounded w-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${streetEsqRed ? 'border-red-500' : 'border-gray-300'}`}/>
            <input onChange={(e: any) => { setReveiverName(e.target.value) }} defaultValue={reveiverName} placeholder="Nombre del receptor*" className={`mt-6 shadow appearance-none border rounded w-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${reveiverNameRed ? 'border-red-500' : 'border-gray-300'}`}/>
            <input onChange={(e: any) => { setReveiverPhone(e.target.value) }} defaultValue={reveiverPhone} placeholder="Número de teléfono del receptor" className="mt-6 shadow appearance-none border rounded w-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            <button onClick={goToBuy} className="mt-6 w-full px-6 py-4 border border-transparent text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none">
                <span>Continuar</span>
            </button>
            {
                (formState != '') &&
                    <span className="mt-4 text-center text-red-500">{formState}</span>
            }
        </div>
    );
}