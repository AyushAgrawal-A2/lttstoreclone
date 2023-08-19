'use client';

import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

interface ComponentSlidesProps {
  components: JSX.Element[];
  slidesPerView: number;
  centeredSlides: boolean;
  responsive?: boolean;
}

export default function ComponentSlides({
  components,
  slidesPerView,
  centeredSlides,
  responsive,
}: ComponentSlidesProps) {
  const [curSlide, setCurSlide] = useState<number>(0);
  const [respSlidesPerView, setRespSlidesPerView] = useState(slidesPerView);

  useEffect(() => {
    if (responsive) {
      const handleResize = () => {
        setRespSlidesPerView(window.innerWidth >= 750 ? slidesPerView : 1);
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [slidesPerView, responsive, respSlidesPerView]);

  return (
    <Swiper
      centeredSlides={centeredSlides}
      slidesPerView={respSlidesPerView + 0.05}
      spaceBetween={10}
      onSlideChange={(swiper) => setCurSlide(swiper.realIndex)}>
      {components.map((component, idx) => (
        <SwiperSlide
          key={idx}
          className="self-center">
          {component}
        </SwiperSlide>
      ))}
      <ComponentSlidesButtons
        length={components.length}
        curSlide={curSlide}
        slidesPerView={slidesPerView}
        centeredSlides={centeredSlides}
      />
    </Swiper>
  );
}

interface ComponentSlidesButtonsProps {
  length: number;
  curSlide: number;
  slidesPerView: number;
  centeredSlides: boolean;
}

function ComponentSlidesButtons({
  length,
  curSlide,
  slidesPerView,
  centeredSlides,
}: ComponentSlidesButtonsProps) {
  const swiper = useSwiper();
  const total = centeredSlides ? length : length - slidesPerView + 1;
  return (
    <div className="w-max mx-auto my-8 text-xs font-bold">
      <FontAwesomeIcon
        icon={faChevronLeft}
        className="cursor-pointer mx-4"
        onClick={() => swiper.slidePrev()}
      />
      {curSlide + 1} / {total}
      <FontAwesomeIcon
        icon={faChevronRight}
        className=" cursor-pointer mx-4"
        onClick={() => swiper.slideNext()}
      />
    </div>
  );
}
