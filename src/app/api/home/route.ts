import { getHome } from '@/src/prisma/home';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
// export const runtime = 'edge';

export async function GET() {
  const home: Home = await getHome();
  return NextResponse.json(home);
}
