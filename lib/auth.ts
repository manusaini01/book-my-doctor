import NextAuth, { CredentialsSignin } from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from "next-auth/providers/google"
import CredentialProvider from "next-auth/providers/credentials"
// import { saltAndHashPassword } from "@/utils/password"
import PostgresAdapter from "@auth/pg-adapter"
import { Pool } from "@neondatabase/serverless"


const pool = new Pool({ connectionString: process.env.POSTGRES_URL })

export const { handlers, signIn, signOut, auth } = NextAuth({

  adapter: PostgresAdapter(pool),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {label: "Password", type: "password" },
      },
      authorize: async ({email, password}) => {
        console.log(email , password)
        
        if(typeof email !== "string") throw new CredentialsSignin('Password doe not match') 

          const user = {email, id: 'dfd'};
          if(password !== "passcode")
            throw new CredentialsSignin("Password doe not match");
          else return user;
      },
    })
  ]
});
