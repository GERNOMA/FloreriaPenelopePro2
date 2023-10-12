'use client';
import { useState } from "react";
import axios from "axios";
import { Inter } from "next/font/google";
import Image from 'next/image';
import { AiOutlineWhatsApp, AiFillPhone } from 'react-icons/ai';
import Link from "next/link";

const inter = Inter({ subsets: ['latin'] });

const BUCKET_URL = "https://floreria-web-bucket.s3.sa-east-1.amazonaws.com/";

async function getData() {
  const res = await fetch('https://6nnofqmbzl.execute-api.sa-east-1.amazonaws.com/floreriaWeb', {
    method: 'POST',
    cache: 'no-store'
  })
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export default function Home() {
  const [file, setFile] = useState<any>();
  const [uploadingStatus, setUploadingStatus] = useState<any>();
  const [uploadedFile, setUploadedFile] = useState<any>();
  const [uploadedFileNames, setUploadedFileNames] = useState<any>();

  var productList: any = [];

  const selectFile = (e: React.ChangeEvent<any>) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    setUploadingStatus("Uploading the file to AWS S3");

    let { data } = await axios.post("/api/s3/uploadFile", {
      name: file.name,
      type: file.type,
    });

    console.log(data);

    const url = data.url;
    let { data: newData } = await axios.put(url, file, {
      headers: {
        "Content-type": file.type,
        "Access-Control-Allow-Origin": "*",
      },
    });

    setUploadedFile(BUCKET_URL + file.name);
    setFile(null);

  };

  const readProducts = async () => {
    var result = await getData();
    setUploadedFileNames(result['contacts']);
    /*result['contacts'].map((value: any) =>{
      console.log('addd1 ' + value['name']);
      productList.push(<li>{value['name']}</li>);
    });*/
    /*result.map((value: String) =>{
      console.log('adwad11' + value);
    });*/
  };

  //const data = await getData()

  //readProducts();

  return (
    <div className="">
      <main>
        <div className='relative'>
          <div className='w-[80vw] sms:pt-0 sms:w-[40vw] h-[55%] sms:h-[40%] absolute top-[60%] sms:top-[60%] left-[50%] translate-x-[-50%] translate-y-[-50%] tr bg-white'>
            <div className='flex flex-row flex-wrap justify-around sms:justify-around items-end h-[100%]'>
              <Link className='mb-[2vh] sms:mb-[1vh] shadow-md rounded-full p-3 bg-[#25D366] w-[27%] sms:w-auto sms:h-[60%] aspect-square flex items-center justify-center' href='https://wa.me/+59898372787'>
                <AiOutlineWhatsApp size={'100%'} color={'white'}/>
              </Link>
              <Link className='mb-[2vh] sms:mb-[1vh] shadow-md rounded-full p-3 bg-[#25D366] w-[27%] sms:w-auto sms:h-[60%] aspect-square flex items-center justify-center' href='https://wa.me/+59898372787'>
                <AiFillPhone size={'100%'} color={'white'}/>
              </Link>
            </div>
          </div>
          <div className='w-[70vw] sms:w-[50vw] h-[15vh] absolute top-[35%] left-[50%] translate-x-[-50%] translate-y-[-50%] tr bg-gray-300 shadow-xl'>
            <p className='text-4xl sms:text-5xl absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>Contáctanos</p>
          </div>
          <Image src={'https://floreria-web-bucket.s3.sa-east-1.amazonaws.com/mainPageSplash.jpg'} alt='Imagen principal' priority={true} width={500} height={500} quality={80}
            className='w-[100vw] h-[50vh] mt-[-50px] object-cover'/>
        </div>
      </main>
    </div>
  );
}