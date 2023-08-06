import { getHome } from '@/packages/prisma/home';
import { NextResponse } from 'next/server';

export async function GET() {
  const home: Home = await getHome();
  return NextResponse.json(home);
}
