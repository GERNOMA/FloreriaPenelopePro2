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
                username: { label: "Username", type: "text" },
                password: {  label: "Password", type: "password" }
            },
            async authorize(credentials){
                const user = { id: '1', name: 'Jose', email: 'jsmith@example.com' }

                const isValid = (credentials?.username === user.name && credentials?.password === 'password')
        
                if (isValid) {
                  return Promise.resolve(user)
                } else {
                  return Promise.resolve(null)
                }
            }
        }),
    ],
};