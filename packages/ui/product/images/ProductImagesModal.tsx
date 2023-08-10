'use client';

import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useEffect } from 'react';

type ProductImagesModalProps = {
  title: string;
  images: Image[];
  modalIdx: number;
  displayModal: boolean;
  setDisplayModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ProductImagesModal({
  title,
  images,
  modalIdx,
  displayModal,
  setDisplayModal,
}: ProductImagesModalProps) {
  useEffect(() => {
    if (displayModal) {
      document.documentElement.style.overflow = 'hidden';
      document.getElementById(`imageModal${modalIdx}`)?.scrollIntoView({
        behavior: 'instant',
        block: 'nearest',
        inline: 'start',
      });
    } else document.documentElement.style.overflow = 'auto';
  }, [displayModal, modalIdx]);

  return (
    <div
      className={
        'fixed top-0 left-0 z-50 h-screen w-screen overflow-auto overscroll-contain p-3 bg-[#000000] ' +
        (!displayModal && 'hidden')
      }
      onClick={() => setDisplayModal(false)}>
      <button className="fixed top-5 right-10 text-black bg-[#FFFFFF] h-10 w-10 rounded-full flex justify-center items-center">
        <FontAwesomeIcon
          icon={faXmark}
          size={'lg'}
        />
      </button>
      {images.map((image, idx) => (
        <div
          key={idx}
          className="w-min mx-auto text-fgTertiary font-bold tracking-wide">
          <Image
            src={image.src}
            id={`imageModal${idx}`}
            className="w-screen max-w-5xl cursor-zoom-out"
            loading="eager"
            width={1500}
            height={1500}
            alt={image.overlay || title}
          />
          {image.overlay || title}
        </div>
      ))}
    </div>
  );
}
