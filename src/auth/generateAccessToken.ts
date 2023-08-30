import { SignJWT } from "jose";

export default async function generateAccessToken(userId: string) {
  try {
    return await new SignJWT({ userId })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET!));
  } catch (error) {
    console.log("Error generating access token: " + error);
    return "";
  }
}
