"use client";
import React, { useEffect, useState } from 'react'
import { getProviders, signIn, useSession } from 'next-auth/react';

export default function RegisterForm({session, providers}: any) {

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [registerState, setRegisterState] = useState('');

  const [nameEmpty, setNameEmpty] = useState(false);
  const [phoneEmpty, setPhoneEmpty] = useState(false);
  const [mailEmpty, setMailEmpty] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);

  const registerUser = async () => {
    setNameEmpty(name === '');
    setPhoneEmpty(phone === '');
    setMailEmpty(mail === '');
    setPasswordEmpty(password === '');

    if (name === '' || phone === '' || mail === '' || password === '') {
      setRegisterState('Faltan campos')
      return;
    }

    setRegisterState('Creando...');

    const res = await fetch('https://two70s4325.execute-api.sa-east-1.amazonaws.com/createUser', {
        method: 'POST',
        cache: 'no-store',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            phone: phone,
            mail: mail,
            password: password
        }),
    })
    console.log(JSON.stringify(res));
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    setRegisterState('Creado con éxito');

  };

  return (
    <>
        <div className='flex flex-col items-center justify-center'>
            <input onChange={(e: any) => setName(e.target.value)} className={`mt-6 flex items-center justify-center px-4 py-4 border ${nameEmpty ? 'border-red-500' : 'border-gray-300'} text-base font-medium rounded-md text-black bg-white hover:bg-gray-200 mb-4 focus:outline-none`}
                type="text" placeholder="Nombre" />
            <input onChange={(e: any) => setPhone(e.target.value)} className={`flex items-center justify-center px-4 py-4 border ${phoneEmpty ? 'border-red-500' : 'border-gray-300'} text-base font-medium rounded-md text-black bg-white hover:bg-gray-200 mb-4 focus:outline-none`}
                type="text" placeholder="Teléfono de contacto" />
            <input onChange={(e: any) => setMail(e.target.value)} className={`flex items-center justify-center px-4 py-4 border ${mailEmpty ? 'border-red-500' : 'border-gray-300'} text-base font-medium rounded-md text-black bg-white hover:bg-gray-200 mb-4 focus:outline-none`}
                type="text" placeholder="Email" />
            <input onChange={(e: any) => setPassword(e.target.value)} className={`flex items-center justify-center px-4 py-4 border ${passwordEmpty ? 'border-red-500' : 'border-gray-300'} text-base font-medium rounded-md text-black bg-white hover:bg-gray-200 mb-4 focus:outline-none`}
                type="password" placeholder="Contraseña" />
            <button onClick={registerUser} className="flex items-center justify-center px-6 py-4 border border-gray-300 text-base font-medium rounded-md text-black bg-green-200 hover:bg-green-300 focus:outline-none">
                <span>Registrarse</span>
            </button>
            {registerState && <p className='text-center mt-2'>{registerState}</p>}
        </div>
    </>
  )
}