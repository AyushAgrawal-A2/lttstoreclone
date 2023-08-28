import Images from "@/src/components/product/images/Images";
import ProductDetails from "@/src/components/product/details/ProductDetails";
import ProductFeatureImages from "@/src/components/product/ProductFeatureImages";
import ProductOptions from "@/src/components/product/options/ProductOptions";
import ProductPrice from "@/src/components/product/ProductPrice";
import ProductRating from "@/src/components/product/reviews/ProductRating";
import ProductRecommendation from "@/src/components/product/ProductRecommendation";
import ProductReviews from "@/src/components/product/reviews/ProductReviews";
import ProductTitle from "@/src/components/product/ProductTitle";
import { getProductPaths } from "@/src/prisma/products";
import cachedGetProduct from "@/src/cachedFns/cachedGetProduct";

// export const runtime = 'edge';

export async function generateStaticParams() {
  const productPaths = await getProductPaths();
  return productPaths.map(({ path }) => {
    const temp = path.split("/");
    const product = temp[temp.length - 1];
    return { product };
  });
}

export async function generateMetadata({
  params,
}: {
  params: { product: string };
}) {
  const { product } = await cachedGetProduct(params.product);
  if (!product)
    return {
      title: params.product.toUpperCase(),
    };
  const productDetails = product.details as Detail[];
  const descriptionBox = productDetails.find(
    (detail) => detail.title === "Description"
  );
  return {
    title: product.title,
    description:
      descriptionBox?.data ?? product.title + " - Linus Tech Tips Store",
  };
}

export default async function Page({
  params,
}: {
  params: { product: string };
}) {
  const { product, recommendations } = await cachedGetProduct(params.product);
  if (!product) return <></>;

  return (
    <main className="md:mx-8 py-9 px-12">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-[50%] lg:w-[55%] self-start md:sticky top-0 md:pr-4 z-10">
          <Images
            title={product.title}
            images={product.images}
          />
        </div>
        <div className="w-full md:w-[50%] lg:w-[45%] self-start md:sticky top-0 md:pl-4 z-0">
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
          reviewStats={product.reviewStats ?? undefined}
          lttProductId={product.lttProductId}
        />
      )}
      <ProductRecommendation productCards={recommendations} />
    </main>
  );
}
