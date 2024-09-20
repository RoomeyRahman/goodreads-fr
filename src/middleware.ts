import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./utils/helper";

export const excludeRoute: string[] = ["/api/cookie"];

export const middleware = async (request: NextRequest) => {
  const currentPath = request.nextUrl.pathname;
  const url = request.nextUrl.clone();
  const token = request.cookies.get("authorization");
  const encryptedUser = request.cookies.get("current-user");
  const user = encryptedUser && decrypt(encryptedUser?.value);


  if (currentPath === "/" || currentPath === "/login") {
    if (token !== undefined) {

      if (currentPath === "/login") {
        url.pathname = "/";
        return NextResponse.redirect(url);
      }

      return NextResponse.next();
    } else {
      if (currentPath !== "/login") {
        url.pathname = "/login";
        return NextResponse.redirect(url);
      }
      return NextResponse.next();
    }
  }


  for (let i = 0; i < excludeRoute.length; i++) {
    if (currentPath.match(excludeRoute[i])) return NextResponse.next();
  }


  if (currentPath.match("/login")) {
    if (token !== undefined) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  if (!currentPath.match("/login") && token === undefined) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!.*\\.).*)"],
};
