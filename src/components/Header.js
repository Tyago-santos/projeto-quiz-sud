'use client'
import Link from 'next/link'

import { useContext } from 'react';
import { ProviderContext } from '@/app/layout';

const Header = () => {

    const [state] = useContext(ProviderContext);
    return(
        <header className='bg-white'>
                <nav className='max-w-lager mx-auto bg-black text-white'>
                    <Link href="/">
                    </Link>

                    <ul>
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