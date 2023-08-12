import Images from '@/packages/ui/product/images/Images';
import ProductDetails from '@/packages/ui/product/details/ProductDetails';
import ProductFeatureImages from '@/packages/ui/product/ProductFeatureImages';
import ProductOptions from '@/packages/ui/product/options/ProductOptions';
import ProductPrice from '@/packages/ui/product/ProductPrice';
import ProductRating from '@/packages/ui/product/reviews/ProductRating';
import ProductRecommendation from '@/packages/ui/product/ProductRecommendation';
import ProductReviews from '@/packages/ui/product/reviews/ProductReviews';
import ProductTitle from '@/packages/ui/product/ProductTitle';
import fetchProduct from '@/packages/serverActions/fetchProduct';
import fetchReviews from '@/packages/serverActions/fetchReviews';
import { getProductPaths } from '@/packages/prisma/products';

// export const runtime = 'edge';

export async function generateStaticParams() {
  const productPaths = await getProductPaths();
  return productPaths.map(({ path }) => {
    const temp = path.split('/');
    const name = temp[temp.length - 1];
    return { name };
  });
}

export default async function Page({
  params: { name },
}: {
  params: { name: string };
}) {
  const { product, recommendations } = await fetchProduct(name);
  if (!product) return <></>;
  const reviewsResponse = await fetchReviews(product.lttProductId, 1, '');
  // document.title = product.title + ' - Linus Tech Tips Store';

  return (
    <main className="md:mx-8 py-9 px-12 relative">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-[50%] lg:w-[55%] self-start md:sticky top-0 md:pr-4">
          <Images
            title={product.title}
            images={product.images}
          />
        </div>
        <div className="w-full md:w-[50%] lg:w-[45%] self-start md:sticky top-0 md:pl-4">
          <ProductTitle title={product.title} />
          {product.rating && <ProductRating rating={product.rating} />}
          <ProductPrice price={product.price} />
          <ProductOptions
            colorSwatch={product.colorSwatch}
            sizeOptions={product.sizeOptions}
          />
          <ProductDetails
            details={product.details as Detail[]}
            relatedProducts={product.relatedProducts}
          />
        </div>
      </div>
      <ProductFeatureImages featureImages={product.featureImages} />
      <ProductReviews
        reviewStats={product.reviewStats ?? undefined}
        lttProductId={product.lttProductId}
        initialReviewsResponse={reviewsResponse}
      />
      <ProductRecommendation productCards={recommendations} />
    </main>
  );
}