"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useState } from "react";

const Gallery = ({ product }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const images = product?.images || []; 

  return (
    <section className="w-[90%] md:w-[30%] xl:w-[36%] mx-auto">
      <Swiper
        style={{
          "--swiper-navigation-color": "#807C7C",
          "--swiper-pagination-color": "#807C7C",
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 gallery-slider mb-2">
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img} alt={`Product Image ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="gallery-slider-2">
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img} alt={`Thumbnail ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Gallery;
