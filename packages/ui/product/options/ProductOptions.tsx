'use client';

import ProductColorSwatch from '../../common/ProductColorSwatch';
import ProductSizeOptions from './ProductSizeOptions';
import { useState } from 'react';

interface ProductOptionsProps {
  colorSwatch: ColorSwatch[];
  sizeOptions: SizeOption[];
}

export default function ProductOptions({
  colorSwatch,
  sizeOptions,
}: ProductOptionsProps) {
  const [colorIdx, setColorIdx] = useState(-1);
  const [sizeIdx, setSizeIdx] = useState(0);

  function changeColor(idx: number) {
    setColorIdx(idx);
    scrollProductImages(colorSwatch[idx].imgPosition);
  }

  function scrollProductImages(idx: number) {
    document.getElementById(`image${idx}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  }

  return (
    <div>
      <ProductColorSwatch
        colorSwatch={colorSwatch}
        colorIdx={colorIdx}
        changeColor={changeColor}
        size={'lg'}
      />
      <ProductSizeOptions
        sizeOptions={sizeOptions}
        sizeIdx={sizeIdx}
        setSizeIdx={setSizeIdx}
      />
    </div>
  );
}
