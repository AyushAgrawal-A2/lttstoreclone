"use client";

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import {
  faChevronLeft,
  faChevronRight,
  faCircle,
  faCircleDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface ImageBannerProps {
  banner: HomeBanner[];
}

export default function ImageBanner({ banner }: ImageBannerProps) {
  const [curSlide, setCurSlide] = useState<number>(0);
  return (
    <div className="relative z-10">
      <Swiper
        centeredSlides={true}
        slidesPerView={1}
        spaceBetween={10}
        onSlideChange={(swiper) => setCurSlide(swiper.realIndex)}
      >
        {banner.map(({ link, imgURL }) => (
          <SwiperSlide key={imgURL}>
            <Link href={link}>
              <Image
                src={imgURL}
                className="rounded-2xl"
                alt={"banner"}
                width={2560}
                height={1200}
                sizes="100vw"
              />
            </Link>
          </SwiperSlide>
        ))}
        <ImageBannerButtons length={banner.length} curSlide={curSlide} />
      </Swiper>
    </div>
  );
}

interface ImageBannerButtonsProps {
  length: number;
  curSlide: number;
}

function ImageBannerButtons({ length, curSlide }: ImageBannerButtonsProps) {
  const swiper = useSwiper();
  return (
    <>
      <FontAwesomeIcon
        icon={faChevronLeft}
        className="absolute top-1/2 left-5 translate-y-[-50%] text-4xl hover:scale-110 hidden md:block text-white cursor-pointer z-10"
        onClick={() => swiper.slidePrev()}
      />
      <div className="absolute bottom-5 left-1/2 translate-x-[-50%] border-[3px] border-white bg-gray-500 rounded-full p-1 flex items-center z-10">
        {Array(length)
          .fill(0)
          .map((_, idx) => {
            return (
              <FontAwesomeIcon
                key={idx}
                icon={curSlide === idx ? faCircle : faCircleDot}
                className="text-sm mr-2 last:mr-0 text-white cursor-pointer"
                onClick={() => swiper.slideTo(idx)}
              />
            );
          })}
      </div>
      <FontAwesomeIcon
        icon={faChevronRight}
        className="absolute top-1/2 right-5 translate-y-[-50%] text-4xl hover:scale-110 hidden md:block text-white cursor-pointer z-10"
        onClick={() => swiper.slideNext()}
      />
    </>
  );
}
