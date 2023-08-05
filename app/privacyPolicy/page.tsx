import { redirect } from 'next/navigation';

export default async function ProductRender({ params }: any) {

    redirect('https://www.privacypolicies.com/live/f6321e27-cdb4-45cb-a9e0-24b5f3445496');

    return (
        <p>redirigir</p>
    );
}