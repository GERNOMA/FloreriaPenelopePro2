import { Inter } from "next/font/google";
import CreateProduct from "./CreateProduct";

const inter = Inter({ subsets: ['latin'] });

const BUCKET_URL = "https://floreria-web-bucket.s3.sa-east-1.amazonaws.com/";

var file: any = null;

var productList: any = [];

var categories: any;

async function getCategories(){

    const res = await fetch('https://two70s4325.execute-api.sa-east-1.amazonaws.com/getCategories', {
        method: 'POST',
        cache: 'no-store'
    })

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    var result = await res.json();

    categories = result.contacts;
}

export default async function Home() {

    await getCategories();

    return (
    <div className=''>
        <p className='text-3xl text-center m-2'>Subir producto <b>de manera formal</b></p>
        <CreateProduct categories={categories}/>
    </div>
    );
}