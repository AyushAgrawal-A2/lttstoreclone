import getProductReviews from '@/packages/cheerio/reviews';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
// export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lttProductId = searchParams.get('lttProductId') ?? '';
  const page = searchParams.get('page') ?? '1';
  const reviewStarsFilter = searchParams.get('reviewStarsFilter') ?? '';
  const revRes: ReviewResponse = await getProductReviews({
    lttProductId,
    page,
    reviewStarsFilter,
  });
  return NextResponse.json(revRes);
}
