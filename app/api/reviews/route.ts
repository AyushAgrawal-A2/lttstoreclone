import getProductReviews from '@/packages/cheerio/getProductReviews';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('productId') ?? '';
  const page = searchParams.get('page') ?? '';
  const reviewStars = searchParams.get('reviewStars') ?? '';
  const revRes: ReviewResponse = await getProductReviews(
    productId,
    page,
    reviewStars
  );
  return NextResponse.json(revRes);
}
