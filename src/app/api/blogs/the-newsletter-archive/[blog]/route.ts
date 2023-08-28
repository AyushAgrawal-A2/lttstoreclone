import cachedGetBlog from "@/src/cachedFns/cachedGetBlog";
import { NextRequest, NextResponse } from "next/server";

// export const dynamic = "force-dynamic";
// export const runtime = 'edge';

export async function GET(
  request: NextRequest,
  { params }: { params: { blog: string } }
) {
  const blog = await cachedGetBlog(params.blog);
  if (blog) return NextResponse.json(blog);
  else return NextResponse.json({ error: "Blog not found" }, { status: 404 });
}
