import { Inter } from "next/font/google";
import CreateProduct from "./CreateProduct";

const inter = Inter({ subsets: ['latin'] });

const BUCKET_URL = "https://floreria-web-bucket.s3.sa-east-1.amazonaws.com/";

var file: any = null;

var productList: any = [];

export default async function Home() {
    return (
    <div className="centerDiv">
        <p className="bigText centerText margin">Sube tu prducto amorfa</p>
        <CreateProduct/>
    </div>
    );
}