import bcrypt from "bcrypt";
import generateAccessToken from "@/src/auth/generateAccessToken";
import { createUser, getUser } from "@/src/prisma/user";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import registerFormSchema from "@/src/zod/registerFormSchema";

export const dynamic = "force-dynamic";
// export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const zodResponse = registerFormSchema.safeParse(body);
    if (!zodResponse.success)
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    const { firstName, lastName = "", email, password } = zodResponse.data;
    if (await getUser(email))
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(firstName, lastName, email, hashedPassword);
    const response = NextResponse.json(
      { message: "User registered" },
      { status: 201 }
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
