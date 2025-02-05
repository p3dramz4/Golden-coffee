"use client";
import Icons from "@/components/icons/icon";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Latest() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredProductIndex, setHoveredProductIndex] = useState(null);
  const { addToCart } = useCart(); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products?limit=8");
        const { products: fetchedProducts } = response.data;
        if (Array.isArray(fetchedProducts)) {
          setProducts(fetchedProducts);
        } else {
          throw new Error("داده‌های دریافتی یک آرایه نیستند");
        }
      } catch (err) {
        console.error("خطا در دریافت محصولات:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleMouseEnter = index => {
    setTimeout(() => {
      setHoveredProductIndex(index);
    }, 200);
  };

  const handleMouseLeave = () => {
    setHoveredProductIndex(null);
  };

  if (loading) return <p>در حال بارگذاری...</p>;
  if (error) return <p>خطا: {error}</p>;
  
  return (
    <section className="products pt-8 md:pt-24 lg:pt-48">
      <div className="container">
        <div className="flex justify-between items-end mb-5 md:mb-12">
          <div>
            <h3 className="section-title">جدیدترین محصولات</h3>
            <span className="section-subtitle">فراوری شده از دانه قهوه</span>
          </div>
          <Link href="/allproducts" className="section-link">
            <span className="hidden md:inline-block">مشاهده همه محصولات</span>
            <span className="inline-block md:hidden">مشاهده همه</span>
            <Icons.ChevronLeftProduct />
          </Link>
        </div>
        <div className=" grid justify-items-center grid-cols-1 xxs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-3.5 md:gap-5">
          {products.map((product, index) => (
            <div
              key={product._id}
              data-aos="flip-left"
              data-aos-anchor-placement="center-bottom"
              data-aos-duration="1500"
              className="w-[240px] xxs:w-[180px] xs:w-auto p-2 md:p-5 bg-white dark:bg-zinc-700 shadow-normal rounded-2xl"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}>
              <Link href={`/product/${product._id}`} passHref>
                <div className="relative mb-2 md:mb-5 ">
                  <img
                    src={
                      hoveredProductIndex === index && product.images[1]
                        ? product.images[1]
                        : product.images[0]
                    }
                    className="w-[220px] xxs:w-full mx-auto md:w-auto cursor-pointer transition-all duration-300 ease-in-out delay-200 hover:scale-105 rounded-md"
                    loading="lazy"
                    alt={product.name}
                  />
                  {product.discount && (
                    <span className="absolute block h-5 md:h-[30px] bg-orange-300 rounded-full text-xs/[24px] md:text-base/[34px] top-1.5 right-1.5 font-semibold px-3.5 text-white dark:text-zinc-700">
                      {product.discount}%
                    </span>
                  )}
                </div>
              </Link>
              <Link href={`/product/${product._id}`} passHref>
                <h5 className="font-DanaMedium text-sm md:text-xl text-zinc-700 dark:text-white line-clamp-2 h-10 md:h-14 cursor-pointer">
                  {product.name}
                </h5>
              </Link>
              <div className="flex gap-x-2 md:gap-x-2.5 mt-1.5 md:mt-2.5">
                <div className="text-teal-600 dark:text-emerald-500">
                  <span className="font-semibold text-base md:text-xl">
                    {Number(product.price).toLocaleString()}
                  </span>
                  <span className="text-xs md:text-sm tracking-tighter pr-0.5">
                    تومان
                  </span>
                </div>
                {product.oldPrice && (
                  <div className="offer">
                    <span className="text-xs md:text-sm tracking-tighter line-through">
                      {product.oldPrice}
                    </span>
                    <span className="hidden lg:inline text-xs md:text-sm tracking-tighter">
                      تومان
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-x-1 lg:gap-x-2">
                  <span
                    onClick={() => addToCart(product)}
                    className="flex-center w-[26px] h-[26px] md:w-9 md:h-9 bg-gray-100 text-gray-400 dark:bg-zinc-800 rounded-full hover:bg-teal-600 hover:text-white cursor-pointer">
                    <Icons.MarketIconProduct />
                  </span>
                  <span className="block text-gray-400 hover:text-teal-600 dark:hover:text-emerald-500 rounded-full cursor-pointer transition-colors">
                    <Icons.ArrowRightLeft />
                  </span>
                </div>
                <div className="flex text-yellow-400">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <span key={i}>
                        {i < (product.rating || 5) ? (
                          <Icons.GoldStar />
                        ) : (
                          <Icons.GrayStar />
                        )}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
