import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import NavigationBar from './NavigationBar'
import { getServerSession } from 'next-auth/next'
import { options } from './api/auth/[...nextauth]/options'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  await getCategories();
  
  const session = await getServerSession(options);
  
  return (
    <html lang='es'>
      <body className={inter.className}>
        <main>
          <NavigationBar categories={categories} session={session}/>
          <div className='w-max h-20'></div>
          {children}
        </main>
      </body>
    </html>
  );
}
