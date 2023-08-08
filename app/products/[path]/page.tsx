import fetchProduct from '@/packages/actions/fetchProduct';
import Loading from '@/packages/ui/common/Loading';
import ProductColorSwatch from '@/packages/ui/ProductColorSwatch';
import ProductDetails from '@/packages/ui/product/details/ProductDetails';
import ProductFeatureImages from '@/packages/ui/ProductFeatureImages';
import ProductPrice from '@/packages/ui/ProductPrice';
import ProductRating from '@/packages/ui/ProductRating';
import ProductRecommendation from '@/packages/ui/ProductRecommendation';
import ProductReviews from '@/packages/ui/ProductReviews';
import ProductSizeOptions from '@/packages/ui/ProductSizeOptions';
import ProductTitle from '@/packages/ui/ProductTitle';

import Images from '@/packages/ui/product/images/Images';
import ProductDetailBoxRelatedProducts from '@/packages/ui/product/details/ProductDetailBoxRelatedProducts';

export default async function Page({ params }: { params: { path: string } }) {
  const path = '/products/' + params.path;
  const product = await fetchProduct(path);
  if (!product) console.log('Not found');
  // const [productRecommendations, setProductRecommendations] = useState<
  //   ProductCard[]
  // >([]);
  // const [colorIdx, setColorIdx] = useState(0);
  // const [sizeIdx, setSizeIdx] = useState(0);
  // function changeColor(idx: number, imgPos: number) {
  //   setColorIdx(idx);
  //   imageScroll(imgPos);
  // }

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
          {/* {product.rating.reviews !== 0 && (
            <ProductRating rating={product.rating} />
          )} */}
          <ProductPrice price={product.price} />
          {/* {product.colorSwatch && (
            <ProductColorSwatch
              colorSwatch={product.colorSwatch}
              colorIdx={colorIdx}
              changeColor={changeColor}
              size={'lg'}
            />
          )}
          {product.sizeOptions.length > 0 && (
            <ProductSizeOptions
              sizeOptions={product.sizeOptions}
              sizeIdx={sizeIdx}
              setSizeIdx={setSizeIdx}
            />
          )} */}
          <ProductDetails
            details={product.details as Detail[]}
            relatedProducts={product.relatedProducts}
          />
        </div>
      </div>
      <ProductFeatureImages featureImages={product.featureImages} />
      <ProductReviews
        reviewStats={product.reviewStats}
        lttProductId={product.lttProductId}
      />
      {/* <ProductRecommendation productCards={productRecommendations} /> */}
    </main>
  );
}
