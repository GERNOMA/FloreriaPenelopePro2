import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                name: {
                    label: 'Username:',
                    type: 'text',
                    placeholder: 'ingresa tu username!'
                },
                password: {
                    label: 'Cont:',
                    type: 'text',
                    placeholder: 'ingresa tu Cont!'
                },
            },
            async authorize(credentials){
                const user = { id: '42', name: 'Dave', password: 'jajja' };

                if(credentials?.name == user.name && credentials?.password == user.password){
                    return user;
                } else{
                    return null;
                }
            }
        }),
    ],
    pages: {
        //signIn: '/registrarse'
    }
};