import cachedGetHome from "@/src/cachedFns/cachedGetHome";
import { NextResponse } from "next/server";

// export const dynamic = "force-dynamic";
// export const runtime = 'edge';

export async function GET() {
  const home: Home = await cachedGetHome();
  return NextResponse.json(home);
}
