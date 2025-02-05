"use client";
import { useState, useEffect } from "react";
import Product from "@/components/modules/product/Product";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const MoreProducts = ({ productID, smell }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    // ارسال درخواست به API برای دریافت محصولات مرتبط بر اساس smell
    const fetchRelatedProducts = async () => {
      try {
        const response = await fetch(
          `/api/products?smell=${smell}&limit=4&page=1`
        );
        const data = await response.json();
        console.log("Data:", data);
        console.log("Response OK:", response.ok);


        if (response.ok) {
          setRelatedProducts(data); // ذخیره محصولات مرتبط
        } else {
          console.error("Error fetching related products:", data.message);
        }
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    if (smell) {
      fetchRelatedProducts();
    }
  }, [smell]);

  return (
    <div data-aos="fade-right" className="w-[85%] md:w-full md:px-14 mx-auto">
      <section className="font-Dana text-zinc-700 dark:text-white">
        <h2>محصولات مرتبط</h2>
        <div className="w-24 h-0.5 bg-orange-300 mt-2.5"></div>
      </section>
      {relatedProducts.length > 0 ? (
        <Swiper
          slidesPerView={4}
          spaceBetween={14}
          loop={true}
          dir="rtl"
          rewind={true}
          navigation={true}
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
          {relatedProducts.map(product => (
            <SwiperSlide key={product._id}>
              <Product {...product} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="dark:text-gray-300 text-zinc-700 mt-6 font-Dana">محصول مرتبطی یافت نشد.</p>
      )}
    </div>
  );
};

export default MoreProducts;
