// app/layout.js
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'My App',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={inter.className}>
      <body>
        {children}
      </body>
    </html>
  )
}

