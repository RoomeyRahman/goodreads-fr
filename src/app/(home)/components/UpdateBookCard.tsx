"use client";
import Image from "next/image";
import Link from "next/link";

import BookImage from "/public/assets/55384168-_SX120_.jpg";
import { useReducer, useState } from "react";
import { Rating } from "react-simple-star-rating";
import {
  useCountBookQuery,
  useGetBookQuery,
} from "@/redux/features/apis/book-api";
import { useRouter } from "next/navigation";

interface IState {
  limit: number;
  skip: number;
  page: number;
  searchTypeText: string;
  cTime: any;
}

export interface IAction<IType = string, IPayload = any> {
  type: IType;
  payload: IPayload;
}

const UpdateBookCard = () => {
  const [rating, setRating] = useState(0);
  const handleRating = (rate: number) => setRating(rate);
  const router = useRouter();
  const [state, dispatch] = useReducer(
    (state: IState, action: IAction) => {
      switch (action.type) {
        case "UPDATE_TYPE":
          state = { ...state, page: 1 };
          break;
        case "UPDATE_SEARCH_TEXT":
          state = { ...state, searchTypeText: action.payload, page: 1 };
          break;
        case "UPDATE_LIMIT_SKIP":
          if (action?.payload?.limit > -1)
            state = { ...state, limit: action.payload?.limit };
          if (action?.payload?.skip > -1)
            state = { ...state, skip: action.payload?.skip };
          if (action?.payload?.page > -1)
            state = { ...state, page: action.payload?.page };

          break;
        default:
          break;
      }
      return { ...state };
    },
    {
      limit: 10,
      skip: 0,
      searchTypeText: "",
      page: 1,
      cTime: "",
    }
  );

  const { data: book, refetch: refetchBook } =
    useGetBookQuery({
      limit: state.limit,
      skip: state.skip,
      noCondition: true,
      filter: JSON.stringify({
        name: state.searchTypeText || undefined,
        isDeleted: false,
      }),
    }) || {};
  const { data: brandCount } = useCountBookQuery({
    filter: JSON.stringify({
      name: state.searchTypeText || undefined,
    }),
  });

  return (
    <div>
      {book &&
        book.map((bk, index) => (
          <div className="bg-white border border-secondary p-5" key={index}>
            <small className="mb-2 inline-block">
              Trending this week in one of your favorite genres,{" "}
              <Link href={"/psychology"}>Psychology</Link>
            </small>

            <div className="book-info flex gap-5">
              <div className="max-w-[120px] flex-shrink-0">
                <Image src={BookImage} alt="book-img" />
              </div>

              <div className="space-y-2">
                <h2 className="text-base">
                 {bk?.name}: Healing Trauma and Restoring Wholeness with the
                  Internal Family Systems Model
                </h2>

                <p className="text-sm">
                  by{" "}
                  <Link
                    href={"#authorName"}
                    className="font-bold hover:underline"
                  >
                    {bk.author}
                  </Link>
                </p>

                {/* rating */}
                <Rating
                  onClick={handleRating}
                  size={25}
                  allowFraction
                  className="[&_svg]:inline"
                />
                {/* rating -/end */}

                <p className="text-sm font-medium">
                  Discover an empowering new way of understanding your
                  multifaceted mind—and healing the many parts that make you who
                  you are.
                </p>

                {/* description */}
                <p className="truncate max-w-[370px]">
                  Is there just one “you”? We have been taught to b
                </p>

                <p
                  onClick={() => {
                    router.push(`/book/${bk?.id}`);
                  }}
      
                  className="inline-block text-xs text-accent cursor-pointer"
                >
                  Continue reading
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default UpdateBookCard;
