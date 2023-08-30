import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
// export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path");
  const tags = request.nextUrl.searchParams.getAll("tag");
  if (path) revalidatePath(path);
  if (tags) tags.forEach(revalidateTag);
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
