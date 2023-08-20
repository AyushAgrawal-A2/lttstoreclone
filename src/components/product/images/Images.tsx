"use client";

import ComponentSlides from "@/src/components/common/ComponentSlides";
import ProductImages from "@/src/components/product/images/ProductImages";
import ProductImagesModal from "@/src/components/product/images/ProductImagesModal";
import ProductImagesPreview from "@/src/components/product/images/ProductImagesPreview";
import ProductImageWithOverlay from "./ProductImageWithOverlay";
import { useCallback, useState } from "react";

interface ImagesProps {
  title: string;
  images: Image[];
}

export default function Images({ title, images }: ImagesProps) {
  const [displayModal, setDisplayModal] = useState(false);
  const [modalIdx, setModalIdx] = useState(0);

  const scrollProductImages = useCallback((idx: number) => {
    document.getElementById(`image${idx}`)?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }, []);

  const displayImageModal = useCallback((idx: number) => {
    setDisplayModal(true);
    setModalIdx(idx);
  }, []);

  return (
    <>
      <ProductImagesModal
        title={title}
        images={images}
        modalIdx={modalIdx}
        displayModal={displayModal}
        setDisplayModal={setDisplayModal}
      />
      <div className="md:hidden">
        <ComponentSlides
          components={images.map((image, idx) => (
            <li
              key={image.src}
              className="snap-start relative group shrink-0 grow-0 w-[95%]"
            >
              <ProductImageWithOverlay
                image={image}
                idx={-idx - 1}
                displayImageModal={displayImageModal}
              />
            </li>
          ))}
          slidesPerView={1}
          centeredSlides={false}
        />
      </div>
      <div className="hidden md:flex flex-col lg:flex-row-reverse gap-3.5 overscroll-contain">
        <ProductImages images={images} displayImageModal={displayImageModal} />
        <ProductImagesPreview
          images={images}
          scrollProductImages={scrollProductImages}
        />
      </div>
    </>
  );
}
