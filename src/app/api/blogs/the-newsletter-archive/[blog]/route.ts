import { getBlog } from "@/src/prisma/blogs";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
// export const runtime = 'edge';

export async function GET(
  request: NextRequest,
  { params }: { params: { blog: string } },
) {
  const blogPath = "/blogs/the-newsletter-archive/" + params.blog;
  const blog = await getBlog({ blogPath });
  if (blog) return NextResponse.json(blog);
  else return NextResponse.json({ error: "Blog not found" }, { status: 404 });
}
