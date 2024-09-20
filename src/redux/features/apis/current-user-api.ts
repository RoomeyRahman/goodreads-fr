import { decrypt } from "@/utils/helper";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tags = {
  currentUser: "current_user",
};
export const currentUserApi = createApi({
  reducerPath: "currentUserApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_HOST}/api`,
    credentials: "include",
  }),
  tagTypes: [tags.currentUser],
  endpoints: (builder) => ({
    getCurrentUser: builder.query<
      { authorization: string; "current-user": any; error: string },
      void
    >({
      query: () => ({ url: "/cookie" }),
      transformResponse: async ({ data }: any) => {
        const userId = decrypt(data["current-user"]).id;
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/${userId}`,
          {
            credentials: "include",
          }
        );
        if (response.ok) {
          const res = await response.json();
          return {"current-user": res.data, authorization: data["authorization"]};
        } else {
          data["current-user"] = null;
          data["authorization"] = null;
          data["error"] =
            (await response.json())?.message || "Something went wrong";
        }
        return data;
      },
      providesTags: (result, err, arg) => (!err && [tags.currentUser]) || [],
    }),
    updateCurrentUser: builder.mutation<void, any>({
      query: (user) => ({
        url: `/users/${user._id}`,
        method: "patch",
        body: user,
      }),
      invalidatesTags: [tags.currentUser],
    }),
  }),
});

export const { useGetCurrentUserQuery, useUpdateCurrentUserMutation } =
  currentUserApi;
export const currentUser = currentUserApi.endpoints.getCurrentUser.select;
