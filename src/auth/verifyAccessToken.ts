import { jwtVerify } from "jose";

export default async function verifyAccessToken(token: string) {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET!)
    );
    return payload.userId;
  } catch (error) {
    console.log("Error verifying access token: " + error);
    return "";
  }
}
