"use client";

import ImageWithOverlay from "./ProductImageWithOverlay";

type ProductImagesProps = {
  images: Image[];
  displayImageModal: (idx: number) => void;
};

export default function ProductImages({
  images,
  displayImageModal,
}: ProductImagesProps) {
  return (
    <ul className="md:max-h-[50vh] lg:max-h-[90vh] overflow-auto no-scrollbar scroll-smooth snap-x md:snap-y snap-proximity flex flex-row items-center md:flex-col gap-1 md:gap-10 mb-4">
      {images.map((image, idx) => (
        <li
          key={idx}
          className="snap-start relative group shrink-0 grow-0 w-[95%]"
        >
          <ImageWithOverlay
            image={image}
            idx={idx}
            displayImageModal={displayImageModal}
          />
        </li>
      ))}
    </ul>
  );
}
