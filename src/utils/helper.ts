
import { IError } from "@/interface/error.interface";
import { FetchBaseQueryError, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { message } from "antd";


export function encrypt(obj: any, salt = "NRLU") {
  obj = JSON.stringify(obj).split("");
  for (var i = 0, l = obj.length; i < l; i++)
    if (obj[i] == "{") obj[i] = "}";
    else if (obj[i] == "}") obj[i] = "{";
  let encode = encodeURI(salt + obj.join(""));
  return btoa(encode);
}

export function decrypt(obj: any, salt = "NRLU") {
  obj = atob(obj);
  obj = decodeURI(obj);
  if (salt && obj.indexOf(salt) != 0)
    throw new Error("object cannot be decrypted");
  obj = obj.substring(salt.length).split("");
  for (var i = 0, l = obj.length; i < l; i++)
    if (obj[i] == "{") obj[i] = "}";
    else if (obj[i] == "}") obj[i] = "{";
  return JSON.parse(obj.join(""));
}

export function removeUndefinedProperties(obj: any): any {
  if (typeof obj !== "object" || obj === null) {
    // Base case: obj is not an object or is null, do nothing
    return obj;
  }

  if (Array.isArray(obj)) {
    // If obj is an array, recursively remove undefined properties from each element
    return obj.map(removeUndefinedProperties);
  }

  // If obj is an object, recursively remove undefined properties from each key
  Object.keys(obj).forEach((key) => {
    obj[key] = removeUndefinedProperties(obj[key]);
    if (obj[key] === undefined) {
      delete obj[key];
    }
  });
  return obj;
}

export function getFileTypeFromURI(uri: string) {
  const parts = uri.split(".");
  if (parts.length > 1) {
    const extension = parts[parts.length - 1].toLowerCase();
    return extension;
  } else {
    console.error("Unable to determine file type from URI.");
    return null;
  }
}

export const transformResponse = (result: any) => result?.data;
export const transformErrorResponse = (err: FetchBaseQueryError): IError => ({
  ...(err?.data || ({} as any)),
  statusCode: err.status,
});

export const hasError = (result: any): boolean => {
  if ("error" in result) {
    const { error } = result;
    if ("message" in error) {
      message.error(error.message);
      return true;
    }
    if ("statusCode" in error) {
      message.error(`Something Went Wrong! ERROR: ${error.statusCode || ""}`);
      return true;
    }
    message.error(`Something Went Wrong! Please contact admin`);
    return true;
  }
  return false;
};


export function debounce(fn: any, delay: number = 1000) {
  let timeoutId: any;
  return (...args: any) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

