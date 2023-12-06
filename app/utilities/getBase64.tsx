/*import { getPlaiceholder } from "plaiceholder";

export default async function getBase64(url: any) {

    const res = await fetch(url);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    const buffer = await res.arrayBuffer();

    const { base64 } = await getPlaiceholder(Buffer.from(buffer));

    return base64;
}*/