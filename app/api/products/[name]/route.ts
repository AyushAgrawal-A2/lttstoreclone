import {
  getProduct,
  getProductCard,
  getProductCards,
} from '@/packages/fs/products.fs';
import { NextResponse } from 'next/server';

export function GET(
  request: Request,
  { params }: { params: { name: string } }
) {
  const name = params.name;
  const path = '/products/' + name;
  const product = getProduct(path);
  if (product) {
    const productCards: ProductCard[] = [];
    if (
      product.details['Related Products'] &&
      product.details['Related Products'].type === 'links'
    ) {
      product.details['Related Products'].data
        .map((path) => getProduct(path))
        .forEach((product) => {
          if (product) productCards.push(getProductCard(product));
        });
    }
    const recommendations = getProductCards(
      'all-products-1',
      1,
      8,
      'bestseller'
    ).productCards;
    return NextResponse.json({ product, productCards, recommendations });
  } else NextResponse.json({ error: 'Product not found' }, { status: 404 });
}
