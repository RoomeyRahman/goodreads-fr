import Image from "next/image"
import BookImage from "/public/assets/55384168-_SX120_.jpg"
import ReviewForm from "../components/ReviewForm"

const page = ({ params }: { params: { bookId: string } }) => {
  
  return (
    <section className='review-page my-5'>
      <div className="container">
        <div className="book-info flex gap-5">
          <div className='max-w-[120px] flex-shrink-0'>
            <Image src={BookImage} alt='book-img' />
          </div>

          <ReviewForm/>

        </div>
      </div>
    </section>
  )
}

export default page