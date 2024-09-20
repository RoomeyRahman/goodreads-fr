"use client";

import { useGetSingleBookQuery } from "@/redux/features/apis/book-api";
import { useCreateReviewMutation } from "@/redux/features/apis/review-api";
import { hasError } from "@/utils/helper";
import { Form, Input, message, Button, DatePicker } from "antd";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Rating } from "react-simple-star-rating";
import { useState } from "react";
import moment from "moment-timezone";

const ReviewForm = () => {
  const [create] = useCreateReviewMutation();
  const params = useParams();
  const { data: book, isLoading } = useGetSingleBookQuery(
    params.reviewId as string
  );

  const [rating, setRating] = useState(0);

  const onFinishAdd = async (values: any) => {
    const startDate = values.dateStarted;
    const finishedDate = values.dateFinished;

    const result = await create({
      data: {
        ...values,
        book: book?.id,
        ratings: rating,
        dateStarted: startDate?.toString(),
        dateFinished: finishedDate?.toString(),
      },
    });
    if (hasError(result)) return;
    message.success("Review added successfully");
  };

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  return (
    <div className="space-y-2">
      <h2 className="text-base">
        {book?.name}: Healing Trauma and Restoring Wholeness with the Internal
        Family Systems Model
      </h2>

      <p className="text-sm">
        by{" "}
        <Link href={"#authorName"} className="font-bold hover:underline">
          {book?.author}
        </Link>
      </p>

      <div className="space-y-5">
        <p className="text-sm font-medium">
          Discover an empowering new way of understanding your multifaceted
          mind—and healing the many parts that make you who you are.
        </p>
      </div>

      <Form onFinish={onFinishAdd} layout="vertical">
        <Form.Item name="ratings">
          <Rating
            size={25}
            allowFraction
            onClick={handleRating}
            className="[&_svg]:inline"
          />
        </Form.Item>

        <p className="font-bold">Write a review</p>
        <Form.Item
          name="review"
          rules={[{ required: true, message: "Please write a review!" }]}
        >
          <Input.TextArea
            name="review"
            className="w-full min-h-[150px] p-5"
            placeholder="Write your review here"
          />
        </Form.Item>

        <div className="flex flex-row items-center gap-10">
          <Form.Item
            name="dateStarted"
            label="Date Started"
            rules={[{ required: true, message: "Please enter Date Started!" }]}
          >
            <DatePicker className="w-[300px]" name="dateStarted" />
          </Form.Item>

          <Form.Item
            name="dateFinished"
            label="Date Finished"
            rules={[{ required: true, message: "Please enter Date Finished!" }]}
          >
            <DatePicker className="w-[300px]" name="dateFinished" />
          </Form.Item>
        </div>

        <Form.Item>
          <Button
            htmlType="submit"
            className="bg-green-500 hover:bg-green-500 px-5 py-2 text-white"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ReviewForm;
