import { getHome } from '@/packages/prisma/home';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  const home: Home = await getHome();
  return NextResponse.json(home);
}
