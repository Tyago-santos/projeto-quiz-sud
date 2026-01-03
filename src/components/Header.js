'use client'
import Link from 'next/link'

import { useContext } from 'react';
import { ProviderContext } from '@/app/layout';

const Header = () => {

    const [state] = useContext(ProviderContext);
    return(
        <header className='bg-white py-4'>
                <nav className=' flex items-center  justify-between max-w-6xl mx-auto '>
                    <Link href="/">
                        logo
                    </Link>

                    <ul className='flex gap-x-2'>
                        <ul>
                            {state.user.name}
                        </ul>
                        <ul><Link href="/dashboard">dashbard</Link></ul>
                    </ul>
                </nav>
        </header>
    );
} 


export default Header;