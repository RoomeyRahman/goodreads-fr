"use client"
import Image from 'next/image'
import { Rating } from 'react-simple-star-rating'
import bookImage from "/public/assets/55384168-_SX120_.jpg"
import { useState } from 'react'
import Link from 'next/link'

const BookInfo = ({book}:any) => {
    const [rating, setRating] = useState(0);
    const handleRating = (rate: number) => setRating(rate);

    return (
        <div className="book-info text-center">
            <div className="book-img max-w-[208px] w-full h-[310px] overflow-hidden flex items-center justify-center mb-5">
                <Image className='w-full' src={bookImage} alt='' />
            </div>

            <button className='border border-secondary w-full p-2 rounded-full mb-5'>
                Currently reading
            </button>

            <button className='border border-secondary w-full p-2 rounded-full mb-5'>
                Buy On Amazon
            </button>

            <div className='mb-4'>
                <Rating
                    onClick={handleRating}
                    size={25}
                    allowFraction
                    className='[&_svg]:inline'
                />
            </div>

            {rating > 0 && (
                <>
                    <div>
                        <Link href={`/review/${book.id}`} className='underline'>
                            Write a review
                        </Link>
                    </div>

                    <div>
                        <Link href={"/edit-review"} className='underline'>
                            Edit your review
                        </Link>
                    </div>
                </>
            )}

        </div>
    )
}

export default BookInfo