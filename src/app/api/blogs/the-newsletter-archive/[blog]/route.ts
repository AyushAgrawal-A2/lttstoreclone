import cachedGetBlog from "@/src/cachedFns/cachedGetBlog";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// export const dynamic = "force-dynamic";
// export const runtime = 'edge';

export async function GET(
  _request: NextRequest,
  { params }: { params: { blog: string } }
) {
  const blog = await cachedGetBlog(params.blog);
  if (blog) return NextResponse.json(blog);
  else return NextResponse.json({ error: "Blog not found" }, { status: 404 });
}
