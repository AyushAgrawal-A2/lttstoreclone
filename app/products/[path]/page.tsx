import fetchProduct from '@/packages/serverActions/fetchProduct';
import fetchProductCards from '@/packages/serverActions/fetchProductCards';
import Images from '@/packages/ui/product/images/Images';
import Loading from '@/packages/ui/common/Loading';
import ProductDetails from '@/packages/ui/product/details/ProductDetails';
import ProductFeatureImages from '@/packages/ui/product/ProductFeatureImages';
import ProductOptions from '@/packages/ui/product/options/ProductOptions';
import ProductPrice from '@/packages/ui/product/ProductPrice';
import ProductRating from '@/packages/ui/product/reviews/ProductRating';
import ProductRecommendation from '@/packages/ui/product/ProductRecommendation';
import ProductReviews from '@/packages/ui/product/reviews/ProductReviews';
import ProductTitle from '@/packages/ui/product/ProductTitle';

export const runtime = 'edge';

export default async function Page({ params }: { params: { path: string } }) {
  const path = '/products/' + params.path;
  const product = await fetchProduct(path);
  const recommendations = (
    await fetchProductCards('all-products-1', 1, 8, 'bestseller,asc')
  ).productCards;
  if (!product) return <Loading />;

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
      {product.reviewStats && (
        <ProductReviews
          reviewStats={product.reviewStats}
          lttProductId={product.lttProductId}
        />
      )}
      <ProductRecommendation productCards={recommendations} />
    </main>
  );
}
