import React from "react";
import "@/app/globals.css";
import Icons from "@/components/icons/icon";
import Link from "next/link";
import { useCart } from "@/context/CartContext";


export default function BestSelling({product}) {
  const { addToCart } = useCart(); 
  
  return (
    <div className="swiper-slide">
      <div className="p-2 md:p-5 bg-white dark:bg-zinc-700 shadow-normal rounded-2xl">
        <Link href={`/product/${product._id}`} passHref>
          <div className="relative mb-2 md:mb-5">
            <img
              src={product.images[0]}
              className="w-[220px] xxs:w-full mx-auto md:w-auto cursor-pointer transition-all duration-300 ease-in-out delay-200 hover:scale-105 rounded-md"
              loading="lazy"
              alt={product.name}
            />
          </div>
        </Link>
        <Link href={`/product/${product._id}`} passHref>
          <h5 className="font-DanaMedium text-sm md:text-xl text-zinc-700 dark:text-white line-clamp-2 h-10 md:h-14">
            {product.name}
          </h5>
        </Link>
        <div className="flex gap-x-2 md:gap-x-2.5 mt-1.5 md:mt-2.5">
          <div className="text-teal-600 dark:text-emerald-500">
            <span className="font-semibold text-base md:text-xl">
              {product.price.toLocaleString()}
            </span>
            <span className="text-xs md:text-sm tracking-tighter">تومان</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-x-1 lg:gap-x-2">
            <span
              onClick={() => addToCart(product)}
              className="flex-center w-[26px] h-[26px] md:w-9 md:h-9 bg-gray-100 text-gray-400 dark:bg-zinc-800 rounded-full    hover:bg-teal-600 hover:text-white cursor-pointer">
              <Icons.MarketIconProduct />
            </span>
            <span className="block text-gray-400 hover:text-teal-600 dark:hover:text-emerald-500 rounded-full cursor-pointer    transition-colors">
              <Icons.ArrowRightLeft />
            </span>
          </div>
          {/* <!-- stars --> */}
          <div className="flex text-yellow-400">
            {Array(5)
              .fill()
              .map((_, idx) => (
                <Icons.GoldStar key={idx} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
