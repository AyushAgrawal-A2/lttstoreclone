'use client';

import ProductColorSwatch from '../../common/ProductColorSwatch';
import ProductSizeOptions from './ProductSizeOptions';
import { useCallback, useState } from 'react';

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

  const scrollProductImages = useCallback((idx: number) => {
    document.getElementById(`image${idx}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  }, []);

  const changeColor = useCallback(
    (idx: number) => {
      setColorIdx(idx);
      scrollProductImages(colorSwatch[idx].imgPosition);
    },
    [colorSwatch, scrollProductImages]
  );

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
