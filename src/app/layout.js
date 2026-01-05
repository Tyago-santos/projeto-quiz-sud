'use client'
import { Fredoka } from 'next/font/google'
import '@/styles/globals.css'

const fredoka = Fredoka({ 
  weight: ['300', '400', '500', '600', '700'], 
  subsets: ['latin'],
  variable: '--font-fredoka',
  display: 'swap',
});

import { createContext, useContext, useReducer } from 'react';

import { rootReducers,initialStateReducers } from '@/reducers';

// import {  useRouter} from 'next/navigation'
export const ProviderContext = createContext(); 

export default function RootLayout({ children }) {

  const [state, dispatch] = useReducer(rootReducers, initialStateReducers);
  

  return (
    <ProviderContext.Provider value={[state, dispatch]}>
    <html lang="pt-BR" className={`${fredoka.variable}`}>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>

    </ProviderContext.Provider>
  )
}
