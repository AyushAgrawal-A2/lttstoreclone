import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import ProductCard from './ProductCard';

type ProductDetailBoxRelatedProductsProps = {
  relatedProducts: ProductCard[];
};

export default function ProductDetailBoxRelatedProducts({
  relatedProducts,
}: ProductDetailBoxRelatedProductsProps) {
  const [displayDetails, setDisplayDetails] = useState(true);
  return (
    <div
      className={`my-2.5 border rounded py-3 px-7 hover:shadow-[inset_0_0_0_3px_rgb(227,227,227)] ${
        displayDetails && 'shadow-[inset_0_0_0_2px_rgb(227,227,227)]'
      } transition duration-300 bg-fgSecondary font-bold`}>
      <div
        className="flex justify-between cursor-pointer py-2 bg-fgSecondary sticky top-0 z-10"
        onClick={() => setDisplayDetails((prev) => !prev)}>
        <div className="text-xl">Related Products</div>
        <button
          className={`${
            displayDetails && 'rotate-90'
          } hover:scale-[1.15] transition`}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      <div className={`${!displayDetails && 'hidden'} overflow-auto`}>
        <div className="pt-3 flex gap-5 overflow-auto">
          {relatedProducts.map((productCard) => (
            <div
              key={productCard.path}
              className="flex-none w-[80%]">
              <ProductCard productCard={productCard} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
