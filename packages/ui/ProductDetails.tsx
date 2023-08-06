import ProductDetailBox from './ProductDetailBox';

type ProductDetailsProps = {
  details: Detail[];
};

export default function ProductDetails({ details }: ProductDetailsProps) {
  return details.map((detail) => (
    <ProductDetailBox
      key={detail.title}
      detail={detail}
    />
  ));
}
