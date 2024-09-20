import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";

interface ICookie {
  name: string;
  value: string;
}

export async function POST(req: NextRequest) {
  const data: ICookie[] = await req.json();

  data.forEach(({ name, value }: any) => {
    if (!name || !value) {
      return NextResponse.json(
        { error: "Missing parameters: name and value are required" },
        { status: 400 }
      );
    }

    cookies().set({
      name,
      value,
      sameSite: "lax",
      secure: false,
      domain: process.env.NEXT_PUBLIC_DOMAIN || "",
      httpOnly: true,
    });
  });

  return NextResponse.json({ message: "Cookie set  was successful" });
}

export async function GET(req: NextRequest) {
  const allCookies = cookies().getAll();
  let obj: any = {};
  allCookies.map((cookie) => {
    obj[cookie.name] = cookie.value;
  });
  return NextResponse.json({ data: obj });
}

export async function DELETE(req: NextRequest) {
  cookies().set({
    name: "current-user",
    value: "",
    sameSite: "lax",
    secure: false,
    maxAge: 0,
    domain: process.env.NEXT_PUBLIC_DOMAIN || "/",
  });
  cookies().set({
    name: "authorization",
    value: "",
    sameSite: "lax",
    secure: false,
    maxAge: 0,
    domain: process.env.NEXT_PUBLIC_DOMAIN || "/",
  });
  return NextResponse.json({ data: {} });
}
