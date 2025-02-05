"use client";
import { FaStar, FaRegStar } from "react-icons/fa";
import { IoCheckmark } from "react-icons/io5";
import { TbSwitch3 } from "react-icons/tb"; 
import {
  FaTelegram,
  FaLinkedinIn,
  FaPinterest,
  FaTwitter,
  FaFacebookF,
} from "react-icons/fa"; 
import Breadcrumb from "./Breadcrumb"; 
import AddToWishList from "./AddToWishList"; 
import { useState } from "react";
import { showSwal } from "@/utils/helpers"; 
import { useCart } from "@/context/CartContext"; 

const Details = ({ product }) => {
  const [count, setCount] = useState(1); 
  const { addToCart, increaseCount, decreaseCount, cart } = useCart();

  const handleAddToCart = () => {
    const cartItem = {
      id: product._id,
      name: product.name,
      price: product.price,
      images: product.images,
      count,
    };

    addToCart(cartItem);
    showSwal("محصول با موفقیت به سبد خرید اضافه شد", "success", "فهمیدم");
  };

  const handleIncreaseCount = () => {
    setCount(count + 1);
  };

  const handleDecreaseCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <main className="w-[90%] mx-auto md:w-[63%] font-Dana text-zinc-700 dark:text-white">
      <Breadcrumb title={product.name} />

      <h2 className="text-2xl mt-1 font-bold">{product.name}</h2>
      <div className="flex gap-[9px] mt-8">
        <div className="flex gap-0.5 child:text-orange-500 text-xl">
          {new Array(product.score).fill(0).map((_, index) => (
            <FaStar key={index} />
          ))}
          {new Array(5 - product.score).fill(0).map((_, index) => (
            <FaRegStar key={index} />
          ))}
        </div>
        <p>(دیدگاه {product.comments.length} کاربر)</p>
      </div>

      <p className="text-teal-500 text-xl font-DanaMedium my-6">
        {product.price.toLocaleString()} تومان
      </p>
      <span className="block w-[93%] text-zinc-700 dark:text-gray-300">
        {product.shortDescription}
      </span>
      <hr />

      <div className="flex items-center gap-[5px] mb-[50px]">
        <IoCheckmark className="text-green-600 text-xl" />
        <p>موجود در انبار</p>
      </div>

      <div className="flex gap-4 justify-end items-center text-center mb-5 flex-row-reverse">
        <button
          onClick={handleAddToCart}
          className="bg-teal-600 hover:bg-teal-800 text-white py-3 px-5 cursor-pointer border-0 transition-all duration-200 font-DanaMedium">
          افزودن به سبد خرید
        </button>
        <div className="w-20 xxl:w-24 flex items-center justify-between border border-gray-500">
          <span
            onClick={handleIncreaseCount}
            className="w-1/3 cursor-pointer py-2.5 border-l border-gray-600 hover:bg-teal-500">
            +
          </span>
          <span>{count}</span>
          <span
            onClick={handleDecreaseCount}
            className="w-1/3 cursor-pointer py-2.5 border-r border-gray-600 hover:bg-red-400 text-xl">
            -
          </span>
        </div>
      </div>

      <section className="flex gap-8 mb-[30px]">
        <AddToWishList productID={product._id} />
        <div className="flex gap-1 items-center cursor-pointer transition-all duration-200 hover:text-gray-300">
          <TbSwitch3 className="text-lg" />
          <a className="text-lg" href="/">
            مقایسه
          </a>
        </div>
      </section>

      <hr />

      <div className="flex flex-col gap-[15px] mt-[30px]">
        <strong>شناسه محصول: {product._id}</strong>
        <p>
          <strong>برچسب:</strong> {product.tags.join(" ,")}
        </p>
      </div>

      <div className="flex mt-8 gap-2">
        <p>به اشتراک گذاری: </p>
        <a href="/">
          <FaTelegram className="text-xl" />
        </a>
        <a href="/">
          <FaLinkedinIn className="text-xl" />
        </a>
        <a href="/">
          <FaPinterest className="text-xl" />
        </a>
        <a href="/">
          <FaTwitter className="text-xl" />
        </a>
        <a href="/">
          <FaFacebookF className="text-xl" />
        </a>
      </div>

      <hr />
    </main>
  );
};

export default Details;
