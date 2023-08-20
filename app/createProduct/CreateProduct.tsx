'use client';
import { useState } from "react";
import axios from "axios";
import { Inter } from "next/font/google";
import { get } from "http";
import { useRouter } from 'next/navigation';
import ImageCompressor from 'browser-image-compression';

const inter = Inter({ subsets: ['latin'] });

export default function CreateProduct({ categories }: any){

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState<any>();
    const [blurImage, setBlurImage] = useState<any>();
    const [productCategory, setProductCategory] = useState<any>();
    const [uploadingStatus, setUploadingStatus] = useState('');
    const [titleCategoty, setTitleCategory] = useState('');
    const [uploadingStatusCategory, setUploadingStatusCategory] = useState('');

    const router = useRouter();

    const uploadProduct = async () => {
        console.log('dddddwad   ' + productCategory);
        const res = await fetch('https://two70s4325.execute-api.sa-east-1.amazonaws.com/createProduct', {
            method: 'POST',
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: title,
                description: description,
                price: price,
                imageName: image.name,
                blurImageName: blurImage.name,
                category: productCategory
            }),
        })
    
        if (!res.ok) {
            throw new Error('Failed to fetch data')
        }

    };

    const uploadFile = async (file: any) => {

        await axios.post("/api/s3/uploadFile", {
            name: file.name,
            type: file.type,
        });

        
    
        /*console.log(data);
    
        const url = data.url;
        let { data: newData } = await axios.put(url, file, {
            headers: {
            "Content-type": file.type,
            "Access-Control-Allow-Origin": "*",
            },
        });*/
    }

    const createProduct = async () => {
        setUploadingStatus('Subiendo...');

        blurImage.name = `blur-${image.name}`;

         uploadFile(image);
         uploadFile(blurImage);

        await uploadProduct();

        setUploadingStatus('Exitoso...');
    }

    const createCategory = async () => {
        setUploadingStatusCategory('Subiendo...');

        const res = await fetch('https://two70s4325.execute-api.sa-east-1.amazonaws.com/createCategory', {
            method: 'POST',
            cache: 'no-store',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: titleCategoty
            }),
        })
    
        if (!res.ok) {
            throw new Error('Failed to fetch data')
        }

        setUploadingStatusCategory('Exitoso...');

        router.refresh();
    }

    const compressFile = async (file: any) => {

        var options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 500,
            useWebWorker: true,
            fileType: 'image/webp',
            initialQuality: 0.8,
        };

        try {
            const compressedFile = await ImageCompressor(file, options);
            setImage(compressedFile);
        // You can now upload the compressedFile to your server
        } catch (error) {
            console.log(error);
        }

        options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 15,
            useWebWorker: true,
            fileType: 'image/webp',
            initialQuality: 0.2,
        };

        try {
            const compressedFile = await ImageCompressor(file, options);
            setBlurImage(compressedFile);
        // You can now upload the compressedFile to your server
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='flex flex-col items-center'>
            <input type="text" placeholder="Título" onChange={(e: any) => setTitle(e.target.value)} className='p-2 m-2 block text-black' />
            <input type="text" placeholder="Descripción" onChange={(e: any) => setDescription(e.target.value)} className="p-2 m-2 block text-black"/>
            <input type="number" placeholder="Precio" onChange={(e: any) => setPrice(e.target.value)} className="p-2 m-2 block text-black"/>
            <input type="file" onChange={(e: any) => compressFile(e.target.files[0])} className="p-2 m-2 block text-black"/>
            <select className="p-2 m-2" onChange={(e: any) => setProductCategory(e.target.value)}>
                {
                    categories.map((product: any) => {
                        return <option key={product.id} value={product.id}>{product.name}</option>
                    })
                }
                <option key='-1' value='caca' selected={true}>elejí</option>
            </select>
            <button
                onClick={createProduct}
                className='m-auto p-2 bg-green-500'>
                Crear
            </button>
            {uploadingStatus && <p className='text-center'>{uploadingStatus}</p>}

            <input type="text" placeholder="Título" onChange={(e: any) => setTitleCategory(e.target.value)} className='p-2 m-2 mt-[100px] block text-black' />
            <button
                onClick={createCategory}
                className='m-auto p-2 bg-green-500'>
                Crear
            </button>
            {uploadingStatusCategory && <p className='text-center mt-2'>{uploadingStatusCategory}</p>}
        </div>
    );
}