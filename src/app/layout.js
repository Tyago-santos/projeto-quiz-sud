// app/layout.js
'use client'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
const inter = Inter({ subsets: ['latin'] })

// import {  useRouter} from 'next/navigation'


export default function RootLayout({ children }) {

    // const isAuth = false;
    // const router = useRouter();

    // if (!isAuth) {
    //   router.push('/login');
    // }


  return (
    <html lang="pt-BR" className={inter.className}>
      <body>
        {children}
      </body>
    </html>
  )
}