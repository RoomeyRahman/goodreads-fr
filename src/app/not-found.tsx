"use client"
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NotFound() {
    const pathname = usePathname()
    return (
        <section>
            <Header />
            <div className='py-[100px]'>
                <div className="container">
                    <div className='text-center space-y-5'>
                        <h1 className='capitalize'>{pathname}  Not Found  </h1>
                        <p>Could not find requested resource</p>
                        <Link href="/" className='block'>Return Home</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    )
}