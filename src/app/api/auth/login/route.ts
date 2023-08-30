import bcrypt from "bcrypt";
import generateAccessToken from "@/src/auth/generateAccessToken";
import { getUser } from "@/src/prisma/user";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import loginFormSchema from "@/src/zod/loginFormSchema";

export const dynamic = "force-dynamic";
// export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const zodResponse = loginFormSchema.safeParse(body);
    if (!zodResponse.success)
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    const { email, password } = zodResponse.data;
    const user = await getUser(email);
    if (!user)
      return NextResponse.json(
        { error: "Incorrect email or password" },
        { status: 401 }
      );
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword)
      return NextResponse.json(
        { error: "Incorrect email or password" },
        { status: 401 }
      );
    const response = NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );
    const accressToken = await generateAccessToken(user.id);
    if (accressToken)
      response.cookies.set({
        name: "auth",
        value: accressToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
