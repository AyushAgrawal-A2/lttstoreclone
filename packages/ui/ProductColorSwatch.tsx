import { useState } from 'react';

type ProductColorSwatchProps = {
  colorSwatch: ColorSwatch[];
  setImgPos: (imgPos: number) => void;
  size: 'sm' | 'lg';
};

export default function ProductColorSwatch({
  colorSwatch,
  setImgPos,
  size,
}: ProductColorSwatchProps) {
  const [colorIdx, setColorIdx] = useState(-1);

  function onClick(idx: number) {
    setColorIdx(idx);
    setImgPos(colorSwatch[idx].imgPosition);
  }

  return (
    <div className="my-5">
      {size === 'lg' && (
        <div className="my-2 text-2xl font-bold uppercase text-center md:text-start">
          SELECT COLOR: {colorSwatch[colorIdx].color.name}
        </div>
      )}
      <ul
        className={`flex flex-row flex-wrap gap-1.5 justify-center ${
          size === 'lg' && 'md:justify-start'
        }`}>
        {colorSwatch.map(({ color }, idx) => (
          <li
            key={color.name}
            className={`rounded hover:scale-110 p-0.5 cursor-pointer ${
              size === 'sm' ? 'h-[22px] w-[22px]' : 'h-[55px] w-[55px]'
            }  ${
              colorIdx === idx &&
              'scale-110 border-2 border-fgPrimary cursor-pointer	'
            }`}
            onClick={() => onClick(idx)}
            title={color.name}>
            <p
              className="w-full h-full border border-fgPrimary rounded-sm"
              style={{
                backgroundColor: color.backgroundColor,
                backgroundImage: `url(${color.backgroundImage})`,
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
