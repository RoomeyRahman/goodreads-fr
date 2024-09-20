"use client";
import Image from "next/image";
import Review from "/public/assets/review.jpg";
import { Rating } from "react-simple-star-rating";

const Reviewer = ({ review }: any) => {
  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "#4CAF50";
    if (rating >= 3) return "#FFEB3B";
    return "#F44336";
  };
  return (
    <div className="flex flex-col gap-5">
      {review &&
        review.map((rw: any, index: any) => (
          <div className="grid grid-cols-12" key={index}>
            <div className="col-span-3">
              <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                <Image src={Review} alt="review" />
              </div>
              <p>{rw.user?.email}</p>
            </div>
            <div className="col-span-9">
              <div className="mb-4">
                <Rating
                  size={25}
                  allowFraction
                  readonly={true}
                  initialValue={rw.ratings} // Assuming rw.ratings is a number
                  fillColor={getRatingColor(rw.ratings)}
                  className="[&_svg]:inline"
                />
              </div>
              <p>{rw.review}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Reviewer;
