"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import Icons from "@/components/icons/icon";
import Navbar from "@/components/modules/Navbar/Navbar";
import Footer from "@/components/modules/Footer/footer";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function AllProducts() {
  const [user, setUser] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // محصولات فیلتر شده
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredProductIndex, setHoveredProductIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 12;
  const [categoryFilter, setCategoryFilter] = useState(""); // فیلتر دسته‌بندی
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("/api/authUsers");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get(
          `/api/products?page=${currentPage}&limit=${productsPerPage}`
        );
        setAllProducts(response.data.products || []);
        setTotalPages(response.data.totalPages || 1);
      } catch (err) {
        console.error("خطا در دریافت محصولات:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, [currentPage]);

  // اینجا برای فیلتر کردن محصولات بر اساس دسته‌بندی انتخاب شده
  useEffect(() => {
    if (categoryFilter) {
      const filtered = allProducts.filter(product =>
        product.name.toLowerCase().includes(categoryFilter.toLowerCase())
      );
      if (filtered.length > 0) {
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts(allProducts); // اگر محصولی پیدا نشد، تمام محصولات رو نشون بده
      }
    } else {
      setFilteredProducts(allProducts); // اگر فیلتر خالی بود، همه محصولات رو نشون بده
    }
  }, [categoryFilter, allProducts]);

  const handleMouseEnter = index => {
    setTimeout(() => {
      setHoveredProductIndex(index);
    }, 150);
  };

  const handleMouseLeave = () => {
    setHoveredProductIndex(null);
  };

  const handlePageChange = page => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleCategoryClick = category => {
    setCategoryFilter(category); // فیلتر کردن محصولات بر اساس دسته‌بندی کلیک شده
  };

  if (loading) return <p>در حال بارگذاری...</p>;
  if (error) return <p>خطا: {error}</p>;

  return (
    <>
      <Navbar
        isLogin={user ? true : false}
        setCategoryFilter={setCategoryFilter}
      />
      <section className="products mt-14 lg:mt-0 py-8 md:py-24 lg:py-36">
        <div className="container">
          <div className=" grid justify-items-center grid-cols-1 xxs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 md:gap-5">
            {filteredProducts.map((product, index) => (
              <div
                key={product._id}
                className="w-[240px] xxs:w-[180px] xs:w-auto p-2 md:p-5 bg-white dark:bg-zinc-700 shadow-normal rounded-2xl"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}>
                <Link href={`/product/${product._id}`} passHref>
                  <div className="relative mb-2 md:mb-5">
                    <img
                      src={
                        hoveredProductIndex === index && product.images[1]
                          ? product.images[1]
                          : product.images[0]
                      }
                      className="w-[220px] xxs:w-full mx-auto md:w-auto cursor-pointer transition-all duration-300 ease-in-out delay-200 hover:scale-105 rounded-md "
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
                <div className="flex gap-x-2 md:gap-x-2.5 xxs:mt-1.5 md:mt-2.5">
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

          {/* Pagination */}
          <div className="flex justify-center mt-10">
            <button
              className="px-4 py-2 bg-gray-300 rounded-lg mx-2"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}>
              قبلی
            </button>

            {/* نمایش شماره صفحات */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === index + 1
                      ? "bg-teal-600 text-white"
                      : "bg-gray-300 text-gray-700"
                  } hover:bg-teal-500 hover:text-white transition-all`}>
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              className="px-4 py-2 bg-gray-300 rounded-lg mx-2"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}>
              بعدی
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
