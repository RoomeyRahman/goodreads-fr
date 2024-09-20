import { ILogin } from "@/interface/login.interface";
import { encrypt, transformErrorResponse, transformResponse } from "@/utils/helper";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_ENDPOINT,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<void, ILogin>({
      queryFn: async (data): Promise<any> => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/login`,
            {
              method: "POST",
              body: JSON.stringify(data),
              headers: {
                "CONTENT-TYPE": "application/json",
              },
            }
          );

          if (response.ok) {
            const na_key = response.headers.get("X-GOODREADS-KEY");
            const userData = await response.json();
            const cookieSetResp = await fetch(`/api/cookie`, {
              method: "post",
              body: JSON.stringify([
                { name: "authorization", value: `Bearer ${na_key}` },
                { name: "current-user", value: encrypt(userData.data) },
              ]),
              headers: {
                "content-type": "application/json",
              },
            });
            if (cookieSetResp.ok) {
              const queryString = window.location.search;
              const params = new URLSearchParams(queryString);
              const redirectUrl = params.get("redirect") || "/";
              window.location.href = redirectUrl;
              return;
            } else {
              return {
                error: cookieSetResp
                  .json()
                  .then(
                    (err) =>
                      err?.message ||
                      "Something went wrong while setting header"
                  ),
              };
            }
          } else {
            return {
              error: response
                .json()
                .then((err) => err?.message || "Something went wrong"),
            };
          }
        } catch (err: any) {
          return { error: err?.message };
        }
        return { data: {} };
      },
    }),
    logout: builder.mutation<void, void>({
      queryFn: async (): Promise<any> => {
        try {
          const response = await fetch(`/api/cookie`, {
            method: "delete",
            body: JSON.stringify({}),
            headers: {
              "CONTENT-TYPE": "application/json",
            },
          });
          if (response.ok) {
            window.location.reload();
          }
        } catch (err: any) {
          return { error: err?.message };
        }
        return { data: {} };
      },
    }),
    register: builder.mutation<void, any>({
      queryFn: async (data: any): Promise<any> => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/users`,
            {
              method: "POST",
              body: JSON.stringify(data),
              headers: {
                "CONTENT-TYPE": "application/json",
              },
            }
          );

          if (response.ok) {
            const na_key = response.headers.get("X-NA-KEY");
            const userData = await response.json();
            const cookieSetResp = await fetch(`/api/cookie`, {
              method: "post",
              body: JSON.stringify([
                { name: "authorization", value: `Bearer ${na_key}` },
                { name: "current-user", value: encrypt(userData) },
              ]),
              headers: {
                "content-type": "application/json",
              },
            });
            if (cookieSetResp.ok) {
              window.location.reload();
            } else {
              return {
                error: cookieSetResp
                  .json()
                  .then(
                    (err) =>
                      err?.message ||
                      "Something went wrong while setting header"
                  ),
              };
            }
          } else {
            return {
              error: response
                .json()
                .then((err) => err?.message || "Something went wrong"),
            };
          }
        } catch (err: any) {
          return { error: err?.message };
        }
        return { data: {} };
      },
    }),
    userVarification: builder.mutation<any, { data: any,headers:any }>({
      query: ({ data,headers }) => ({
        url: "/users/verification",
        method: "post",
        body: data,
        headers:headers
      }),
      transformResponse,
      transformErrorResponse,
      invalidatesTags: (result): any => ["verification"],
    }),  
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation,useUserVarificationMutation } =
  authApi;
