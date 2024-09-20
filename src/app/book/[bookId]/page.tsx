"use client";
import { useGetSingleBookQuery } from "@/redux/features/apis/book-api";
import BookInfo from "../components/BookInfo";
import Reviewer from "../components/Reviewer";
import {
  useCountReviewQuery,
  useGetReviewQuery,
} from "@/redux/features/apis/review-api";
import { useReducer } from "react";


const Page = ({ params }: { params: { bookId: string } }) => {
  const { data: book, isLoading } = useGetSingleBookQuery(params.bookId);

  const { data: review, refetch: refetcReview } = useGetReviewQuery({}) || {};

  return (
    <section className="book-detail my-5">
      <div className="container">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-3">
            <BookInfo book={book} />
          </div>

          <div className="col-span-9">
            <h2 className="text-5xl leading-[58px] mb-4">
              {book?.name}: Healing Trauma and Restoring Wholeness with the
              Internal Family Systems Model
            </h2>

            <p className="mb-4">Ratings & Reviews</p>

            <Reviewer review={review}/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
