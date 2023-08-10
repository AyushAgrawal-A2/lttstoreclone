import Image from 'next/image';

interface ProductImageWithOverlayProps {
  image: Image;
  idx: number;
  displayImageModal: (idx: number) => void;
}

export default function ProductImageWithOverlay({
  image,
  idx,
  displayImageModal,
}: ProductImageWithOverlayProps) {
  return (
    <>
      <Image
        alt={image.overlay || 'product image'}
        src={image.src}
        id={`image${idx}`}
        className="rounded-2xl bg-[#f2f2f2]"
        onClick={() => displayImageModal(idx)}
        width={1500}
        height={1500}
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      {image.overlay && (
        <div className="absolute top-0 right-0 opacity-0 m-3 text-black font-semibold bg-white border border-black rounded-lg p-3 group-hover:opacity-100 transition-opacity duration-500">
          {image.overlay}
        </div>
      )}
    </>
  );
}
