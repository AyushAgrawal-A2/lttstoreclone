import Images from '@/packages/ui/product/images/Images';
import ProductDetails from '@/packages/ui/product/details/ProductDetails';
import ProductFeatureImages from '@/packages/ui/product/ProductFeatureImages';
import ProductOptions from '@/packages/ui/product/options/ProductOptions';
import ProductPrice from '@/packages/ui/product/ProductPrice';
import ProductRating from '@/packages/ui/product/reviews/ProductRating';
import ProductRecommendation from '@/packages/ui/product/ProductRecommendation';
import ProductReviews from '@/packages/ui/product/reviews/ProductReviews';
import ProductTitle from '@/packages/ui/product/ProductTitle';
import {
  getProduct,
  getProductCards,
  getProductPaths,
} from '@/packages/prisma/products';

// export const runtime = 'edge';

export async function generateStaticParams() {
  const productPaths = await getProductPaths();
  return productPaths.map(({ path }) => {
    const temp = path.split('/');
    const name = temp[temp.length - 1];
    return { name };
  });
}

export async function generateMetadata({
  params: { name },
}: {
  params: { name: string };
}) {
  const path = '/products/' + name;
  const product = await getProduct(path);
  if (!product)
    return {
      title: 'Linus Tech Tips Store Clone',
      description:
        'This website a clone of lttstore.com, developed as a hobby project to learn fullstack development',
    };
  const productDetails = product.details as Detail[];
  const descriptionBox = productDetails.find(
    (detail) => detail.title === 'Description'
  );
  return {
    title: product.title + ' - Linus Tech Tips Store',
    description:
      descriptionBox?.data ?? product.title + ' - Linus Tech Tips Store',
  };
}

export default async function Page({
  params: { name },
}: {
  params: { name: string };
}) {
  const path = '/products/' + name;
  const productPromise = getProduct(path);
  const recommendationsPromise = getProductCards({
    collection: 'all-products-1',
    page: 1,
    perPage: 8,
    sortBy: 'bestseller,asc',
  });
  const [product, { productCards: recommendations }] = await Promise.all([
    productPromise,
    recommendationsPromise,
  ]);
  if (!product) return <></>;

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
      />
      <ProductRecommendation productCards={recommendations} />
    </main>
  );
}
