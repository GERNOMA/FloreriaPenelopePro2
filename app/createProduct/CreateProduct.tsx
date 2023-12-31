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
    const [deleteProductCategoryId, setDeleteProductCategory] = useState<any>();
    const [deletingProductCategoryStatus, setDeletingProductCategoryStatus] = useState('');

    const router = useRouter();

    const uploadProduct = async () => {
        
        const res = await fetch('https://floreriapenelope.com/fapi/createProduct'/*'https://two70s4325.execute-api.sa-east-1.amazonaws.com/createProduct'*/, {
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
    }

    const createProduct = async () => {
        if(title != '' && description != '' && price != 0 && image != null && productCategory != null && productCategory != 'elejí'){

            setUploadingStatus('Subiendo...');

            blurImage.name = `blur-${image.name}`;
    
            await uploadFile(image);
            await uploadFile(blurImage);
    
            await uploadProduct();
    
            setUploadingStatus('Exitoso...');

        }
        else{
            setUploadingStatus('Te faltó algo anciana');
        }
    }

    const createCategory = async () => {
        if(titleCategoty != ''){
            setUploadingStatusCategory('Subiendo...');

            const res = await fetch('localhost:3333/createProduct'/*'https://two70s4325.execute-api.sa-east-1.amazonaws.com/createCategory'*/, {
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
        else{
            setUploadingStatusCategory('Te faltó algo anciana');
        }
    }

    const deleteCategory = async () => {
        if(deleteProductCategoryId != null && deleteProductCategoryId != 'elejí'){
            setDeletingProductCategoryStatus('Borrando...');

            const res = await fetch('https://two70s4325.execute-api.sa-east-1.amazonaws.com/deleteCategory', {
                method: 'POST',
                cache: 'no-store',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: deleteProductCategoryId
                }),
            })
        
            if (!res.ok) {
                throw new Error('Failed to fetch data')
            }
    
            setDeletingProductCategoryStatus('Exitoso...');
    
            router.refresh();
        }
        else{
            setDeletingProductCategoryStatus('Te faltó algo anciana');
        }
    }

    const compressFile = async (file: any) => {

        var options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1000,
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
            <input type="text" placeholder="Título" onChange={(e: any) => setTitle(e.target.value)} className='p-2 m-2 block text-black border border-gray-300' />
            <input type="text" placeholder="Descripción" onChange={(e: any) => setDescription(e.target.value)} className="p-2 m-2 block text-black border border-gray-300"/>
            <input type="number" placeholder="Precio" onChange={(e: any) => setPrice(e.target.value)} className="p-2 m-2 block text-black border border-gray-300"/>
            <input type="file" onChange={(e: any) => compressFile(e.target.files[0])} className="p-2 m-2 block text-black border border-gray-300"/>
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

            <input type="text" placeholder="Título" onChange={(e: any) => setTitleCategory(e.target.value)} className='p-2 m-2 mt-[100px] block text-black border border-gray-300'/>
            <button
                onClick={createCategory}
                className='m-auto p-2 bg-green-500'>
                Crear
            </button>
            {uploadingStatusCategory && <p className='text-center mt-2'>{uploadingStatusCategory}</p>}

            <select className="p-2 m-2 mt-[100px]" onChange={(e: any) => setDeleteProductCategory(e.target.value)}>
                {
                    categories.map((product: any) => {
                        return <option key={product.id} value={product.id}>{product.name}</option>
                    })
                }
                <option key='-1' value='caca' selected={true}>elejí</option>
            </select>
            <button
                onClick={deleteCategory}
                className='m-auto p-2 bg-red-500 mb-6'>
                Borrar
            </button>
            {deletingProductCategoryStatus && <p className='text-center mt-2 mb-6'>{deletingProductCategoryStatus}</p>}
        </div>
    );
}