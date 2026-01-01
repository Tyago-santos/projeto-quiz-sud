import Link from 'next/link'
const Header = () => {
    return(
        <header>
            <div>
                <nav>
                    <Link href="/">
                        logo
                    </Link>

                    <ul>
                        <ul>Tiago</ul>
                        <ul><Link href="/dashboard">dashbard</Link></ul>
                    </ul>
                </nav>
            </div>
        </header>
    );
} 


export default Header;