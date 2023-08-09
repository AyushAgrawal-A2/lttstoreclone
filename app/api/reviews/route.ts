import getProductReviews from '@/packages/cheerio/reviews';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
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
