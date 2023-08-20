"use client";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect } from "react";

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
      document.body.style.overflow = "hidden";
      document.getElementById("navbar")?.classList.add("hidden");
      document.getElementById(`imageModal${modalIdx}`)?.scrollIntoView({
        behavior: "instant",
        block: "nearest",
        inline: "start",
      });
    } else {
      document.body.style.overflow = "auto";
      document.getElementById("navbar")?.classList.remove("hidden");
    }
  }, [displayModal, modalIdx]);

  return (
    <div
      className={`fixed top-0 left-0 z-50 h-screen w-screen overflow-auto overscroll-contain bg-fgSecondary ${
        displayModal ? "" : "hidden"
      }`}
      onClick={() => setDisplayModal(false)}
    >
      <button className="fixed top-5 right-10 text-black bg-white border h-10 w-10 rounded-full flex justify-center items-center">
        <FontAwesomeIcon icon={faXmark} size={"lg"} />
      </button>
      {images.map((image, idx) => (
        <div
          key={idx}
          className="max-w-min mx-auto text-fgTertiary font-bold tracking-wide p-3"
        >
          <Image
            src={image.src}
            id={`imageModal${idx}`}
            className="w-screen max-w-5xl cursor-zoom-out"
            width={1500}
            height={1500}
            alt={image.overlay || title}
            sizes="100vw"
          />
          {image.overlay || title}
        </div>
      ))}
    </div>
  );
}
