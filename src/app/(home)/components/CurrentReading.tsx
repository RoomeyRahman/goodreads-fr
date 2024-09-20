import SearchInput from '@/components/SearchInput'
import Image from 'next/image'
import Link from 'next/link'
import FavBook from '/public/assets/icn_default_wtr_leftrail.svg'
import CardTitle from '@/components/CardTitle'

const CurrentReading = () => {
    return (
        <div className='space-y-3 border-b border-b-secondary pb-3 mb-3'>
            <CardTitle title='Currently Reading'/>
            <div className='flex gap-4 items-center'>
                <Image width={40} height={40} src={FavBook} alt='book' />
                <p className='text-sm'>What are you reading?</p>
            </div>
            <SearchInput />
            <div className='flex gap-2'>
                <Link href={"/recommendations"} className='text-xs text-accent underline inline-block'>Recommendations</Link>
                <Link href={"/general-update"} className='text-xs text-accent underline inline-block'>General update</Link>
            </div>
        </div>
    )
}

export default CurrentReading