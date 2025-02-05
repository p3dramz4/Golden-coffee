"use client";

import "@/app/globals.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import BestSelling from "./BestSelling";
import Icons from "@/components/icons/icon";
import { useState, useEffect } from "react";

export default function App() {
const [products, setProducts] = useState([]);

// از useEffect برای گرفتن 5 محصول استفاده می‌کنیم
useEffect(() => {
  const fetchProducts = async () => {
    const res = await fetch("/api/products?limit=5"); // ارسال درخواست برای دریافت 5 محصول
    const data = await res.json();
    if (data.products) {
      setProducts(data.products); // ذخیره محصولات در state
    } else {
      console.error("Failed to load products:", data.message);
    }
  };

  fetchProducts();
}, []);

  return (
    <section
      data-aos="flip-left"
      data-aos-anchor-placement="center-bottom"
      data-aos-duration="1000"
      className="best-selling mb-8 md:mb-20">
      <div className="container">
        <div className="flex items-end justify-between mb-5 md:mb-12">
          <div>
            <h3 className="section-title">محصولات پر فروش</h3>
            <span className="section-subtitle">پیشنهاد قهوه خور ها ...</span>
          </div>
          <div className="flex gap-x-3 md:gap-x-[18px]">
            <div className="swiper-button-prev-custom">
              <Icons.ChevronLeftMini />
            </div>
            <div className="swiper-button-next-custom">
              <Icons.ChevronLeftMiniSwiper />
            </div>
          </div>
        </div>
        <Swiper
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          loop={true}
          spaceBetween={14}
          slidesPerView={2}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 14,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          modules={[Navigation]}
          className="mySwiper">
          {products.map(product => (
            <SwiperSlide key={product._id}>
              <BestSelling product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
