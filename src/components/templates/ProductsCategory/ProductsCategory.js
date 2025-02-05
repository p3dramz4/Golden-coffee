import React from "react";

export default function ProductsCategory() {
  return (
    <section className="products-category mb-10 md:mb-20">
      <div className="container">
        <div className="flex items-center justify-center gap-y-6 gap-x-[29px] md: *:gap-[65px] flex-wrap">
          <div className="w-25 md:w-50 text-center">
            <a href="#">
              <img
                src="/images/categories/category1.png"
                loading="lazy"
                alt="products-category"
              />
            </a>
            <span className="inline-block font-DanaDemiBold text-sm md:text-xl text-zinc-700 dark:text-white mt-1.5 md:mt-2.5">
              قهوه دمی اسپرسو
            </span>
          </div>
          <div className="w-25 md:w-50 text-center">
            <a href="#">
              <img
                src="/images/categories/category2.png"
                loading="lazy"
                alt="products-category"
              />
            </a>
            <span className="inline-block font-DanaDemiBold text-sm md:text-xl text-zinc-700 dark:text-white mt-1.5 md:mt-2.5">
              لوازم جانبی و تجهیزات
            </span>
          </div>
          <div className="w-25 md:w-50 text-center">
            <a href="#">
              <img
                src="/images/categories/category3.png"
                loading="lazy"
                alt="products-category"
              />
            </a>
            <span className="inline-block font-DanaDemiBold text-sm md:text-xl text-zinc-700 dark:text-white mt-1.5 md:mt-2.5">
              اسپرسو ساز
            </span>
          </div>
          <div className="w-25 md:w-50 text-center">
            <a href="#">
              <img
                src="/images/categories/category4.png"
                loading="lazy"
                alt="products-category"
              />
            </a>
            <span className="inline-block font-DanaDemiBold text-sm md:text-xl text-zinc-700 dark:text-white mt-1.5 md:mt-2.5">
              پک تستر قهوه
            </span>
          </div>
          <div className="w-25 md:w-50 text-center">
            <a href="#">
              <img
                src="/images/categories/category5.png"
                loading="lazy"
                alt="products-category"
              />
            </a>
            <span className="inline-block font-DanaDemiBold text-sm md:text-xl text-zinc-700 dark:text-white mt-1.5 md:mt-2.5">
              قهوه ترک
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
