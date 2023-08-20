import ProductDetailBox from "./ProductDetailBox";
import ProductDetailBoxRelatedProducts from "./ProductDetailBoxRelatedProducts";
import ProductDetailBoxTable from "./ProductDetailBoxTable";
import ProductDetailText from "./ProductDetailText";

type ProductDetailsProps = {
  details: Detail[];
  relatedProducts: ProductCard[];
};

export default function ProductDetails({
  details,
  relatedProducts,
}: ProductDetailsProps) {
  return (
    <>
      {details.map((detail) => (
        <ProductDetailBox key={detail.title} title={detail.title}>
          {detail.type === "text" ? (
            <ProductDetailText data={detail.data} />
          ) : (
            <ProductDetailBoxTable data={detail.data} />
          )}
        </ProductDetailBox>
      ))}
      <ProductDetailBoxRelatedProducts relatedProducts={relatedProducts} />
    </>
  );
}
