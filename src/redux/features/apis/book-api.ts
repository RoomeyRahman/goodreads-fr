
import { transformErrorResponse, transformResponse } from "@/utils/helper";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/books`,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJyb29tZXlyYWhtYW5AZ21haWwuY29tIiwiaWF0IjoxNzI2ODA0NDg5LCJleHAiOjIzMzE2MDQ0ODl9.XxYWcUp9qFJZrUCSkG9H0iv0CT7TdDcskzJUIzyuopY";   
        headers.set("authorization", `Bearer ${token}`);
      return headers;
    },

  }),
  
  endpoints: (builder) => ({
    createBook: builder.mutation<any, { data: Partial<any> }>({
      query: ({ data }) => ({    
        url: "",
        method: "post",
        body: data,
      }),
      transformResponse,
      transformErrorResponse,
      invalidatesTags: (result): any => [{ type: "book" }],
    }),
    getBook: builder.query<any[], any>({
      query: (params) => ({
        url: "",
        method: "get",
        params,
      }),
      transformResponse,
      transformErrorResponse,
      providesTags: (result, err, arg): any =>
        (!err &&
          Array.isArray(result) &&
          result.map((res: any) => ({
            type: "book",
            id: res.id,
          }))) ||
        [],
    }),
    updateBook: builder.mutation<any, { id: string; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse,
      transformErrorResponse,
      invalidatesTags: (result, err, arg): any => [
        { type: "book", id: result?.id },
      ],
    }),
    getSingleBook: builder.query<any, string>({
      query: (id) => ({
        url: `/${id}`,
      }),
      transformResponse,
      transformErrorResponse,
      providesTags: (result, err, arg): any => [
        { type: "book", id: result?.id },
      ],
    }),
    deleteBook: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "delete",
      }),
      transformResponse,
      transformErrorResponse,
      invalidatesTags: (result, err, arg): any => [{ type: "book", id: arg }],
    }),
    countBook: builder.query<any, any>({
      query: (params) => ({
        url: "/count",
        params,
      }),
      transformResponse,
      transformErrorResponse,
    }),
  }),
});

export const {
  useCreateBookMutation,
  useGetBookQuery,
  useGetSingleBookQuery,
  useDeleteBookMutation,
  useUpdateBookMutation,
  useCountBookQuery,
} = bookApi;
