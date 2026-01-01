// app/layout.js
'use client'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
const inter = Inter({ subsets: ['latin'] });


import { createContext, useContext, useReducer } from 'react';

import { rootReducers,initialStateReducers } from '@/reducers';

// import {  useRouter} from 'next/navigation'
export const ProviderContext = createContext(); 

export default function RootLayout({ children }) {

  const [state, dispatch] = useReducer(rootReducers, initialStateReducers);
  

  return (
    <ProviderContext.Provider value={[state, dispatch]}>
    <html lang="pt-BR" className={inter.className}>
      <body>
        {children}
      </body>
    </html>

    </ProviderContext.Provider>
  )
}
