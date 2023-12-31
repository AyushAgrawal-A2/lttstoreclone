"use client";

import { useCallback, useState } from "react";
import ProductColorSwatch from "./ProductColorSwatch";
import Link from "next/link";
import Image from "next/image";

type ProductCardProps = {
  productCard: ProductCard;
};

export default function ProductCard({ productCard }: ProductCardProps) {
  const [imgPos, setImgPos] = useState(0);
  const [colorIdx, setColorIdx] = useState(-1);

  const changeColor = useCallback(
    (idx: number) => {
      setColorIdx(idx);
      setImgPos(productCard.colorSwatch[idx].imgPosition);
    },
    [productCard.colorSwatch]
  );

  return (
    <div className="group">
      <div className="relative rounded-2xl overflow-hidden">
        <Link href={productCard.path}>
          <Image
            className="bg-bgTertiary aspect-square object-cover group-hover:animate-grow"
            src={productCard.images[imgPos].src}
            alt={productCard.title}
            width={1000}
            height={1000}
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
        </Link>
        <div
          className={`absolute bottom-0 left-0 m-4 py-1 px-2 bg-white text-black text-xs font-semibold border border-black rounded-full ${
            productCard.inStock && "hidden"
          }`}>
          Sold Out
        </div>
      </div>
      {productCard.colorSwatch && (
        <ProductColorSwatch
          colorSwatch={productCard.colorSwatch}
          colorIdx={colorIdx}
          changeColor={changeColor}
          size={"sm"}
        />
      )}
      <Link href={productCard.path}>
        <div className="my-4">
          <div className="text-xl font-bold text-center hover:underline group-hover:underline">
            {productCard.title}
          </div>
          <div className="font-bold text-center">{`$${productCard.price} USD`}</div>
        </div>
      </Link>
    </div>
  );
}
