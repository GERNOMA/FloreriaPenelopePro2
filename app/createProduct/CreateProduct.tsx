'use client';
import { useState } from "react";
import axios from "axios";
import { Inter } from "next/font/google";
import { get } from "http";

const inter = Inter({ subsets: ['latin'] });

export default function CreateProduct(){

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState<any>();
    const [uploadingStatus, setUploadingStatus] = useState('');

    const uploadProduct = async () => {
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
                imageName: file.name
            }),
        })
    
        if (!res.ok) {
            throw new Error('Failed to fetch data')
        }

    };

    const uploadFile = async () => {

        let { data } = await axios.post("../api/s3/uploadFile", {
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
        setUploadingStatus('Subiendo...');

        await uploadFile();

        await uploadProduct();

        setUploadingStatus('Exitoso...');
    }

    return (
        <div>
            <input type="text" placeholder="Título" onChange={(e: any) => setTitle(e.target.value)} className="textInput margin"/>
            <input type="text" placeholder="Descripción" onChange={(e: any) => setDescription(e.target.value)} className="textInput margin"/>
            <input type="number" placeholder="Precio" onChange={(e: any) => setPrice(e.target.value)} className="textInput margin"/>
            <input type="file" onChange={(e: any) => setFile(e.target.files[0])} className="textInput margin"/>
            <button
                onClick={createProduct}
                className="buttonInput">
                Upload a File!
            </button>
            {uploadingStatus && <p>{uploadingStatus}</p>}
        </div>
    );
}