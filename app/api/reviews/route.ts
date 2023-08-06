import getProductReviews from '@/packages/cheerio/reviews';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lttProductId = searchParams.get('lttProductId') ?? '';
  const page = searchParams.get('page') ?? '1';
  const reviewStars = searchParams.get('reviewStars') ?? '';
  const revRes: ReviewResponse = await getProductReviews({
    lttProductId,
    page,
    reviewStars,
  });
  return NextResponse.json(revRes);
}
