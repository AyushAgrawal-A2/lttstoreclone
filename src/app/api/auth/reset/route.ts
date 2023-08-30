// import bcrypt from "bcrypt";
// import generateAccessToken from "@/src/auth/generateAccessToken";
import { getUser } from "@/src/prisma/user";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import resetFormSchema from "@/src/zod/resetFormSchema";

export const dynamic = "force-dynamic";
// export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const zodResponse = resetFormSchema.safeParse(body);
    if (!zodResponse.success)
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    const { email } = zodResponse.data;
    const user = await getUser(email);
    if (!user)
      return NextResponse.json(
        { error: "No account found with that email" },
        { status: 404 }
      );
    // const accressToken = await generateAccessToken(user.id);
    return NextResponse.json({
      message: "We've sent you an email with a link to update your password",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
