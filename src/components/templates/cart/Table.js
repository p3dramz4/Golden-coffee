"use client";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import stateData from "@/utils/stateData";
import Select from "react-select";
import { showSwal } from "@/utils/helpers";
import { TbShoppingCartX } from "react-icons/tb";
import { useCart } from "@/context/CartContext";

const stateOptions = stateData();

const Table = () => {
  const {
    cart,
    setCart,
    removeFromCart,
    increaseCount,
    decreaseCount,
    applyDiscount,
  } = useCart();
  const [discount, setDiscount] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [stateSelectedOption, setStateSelectedOption] = useState(null);
  const [changeAddress, setChangeAddress] = useState(false);
  const [discountError, setDiscountError] = useState("");

  useEffect(() => {
    calcTotalPrice();
  }, [cart]);

  function calcTotalPrice() {
    const price = cart.reduce(
      (prev, current) => prev + current.price * current.count,
      0
    );
    setTotalPrice(price);
  }

  const handleRemove = productId => {
    removeFromCart(productId);
  };

  const handleUpdateCount = (id, count) => {
    if (count >= 1) {
      const updatedCart = cart.map(item =>
        item._id === id ? { ...item, count } : item
      );
      setCart(updatedCart);
    }
  };

  const checkDiscount = async () => {
    if (!discount) {
      setDiscountError("لطفا کد تخفیف را وارد کنید");
      return;
    }

    const res = await fetch("api/discounts/use", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: discount }),
    });

    if (res.status === 404) {
      setDiscountError("کد تخفیف وارد شده معتبر نیست");
      showSwal("کد تخفیف وارد شده معتبر نیست", "error", "تلاش مجدد");
    } else if (res.status === 422) {
      setDiscountError("کد تخفیف وارد شده منقضی شده");
      showSwal("کد تخفیف وارد شده منقضی شده", "error", "تلاش مجدد");
    } else if (res.status === 200) {
      const discountCode = await res.json();
      const newPrice = totalPrice - (totalPrice * discountCode.percent) / 100;
      setTotalPrice(newPrice);
      applyDiscount(discountCode.percent); // ذخیره تخفیف در Context
      setDiscountError(""); // Clear error message on success
      showSwal("کد تخفیف با موفقیت اعمال شد", "success", "فهمیدم");
    }
  };


  if (cart.length === 0) {
    return (
      <div
        className=" gap-5 m-auto py-16 relative mt-2 mb-14 leading-5 text-black direction-rtl"
        data-aos="fade-up">
        <div className="flex justify-center items-center gap-4">
          <TbShoppingCartX className="text-6xl text-white" />
          <p className="text-4xl mb-5 text-zinc-700 dark:text-white">
            سبد خرید شما در حال حاضر خالی است.{" "}
          </p>
        </div>
        <span className="block mb-2 text-gray-400 dark:text-gray-500 text-center">
          قبل از تسویه حساب، باید چند محصول را به سبد خرید خود اضافه کنید.
        </span>
        <span className="block mb-2 text-gray-500 text-center">
          در صفحه "فروشگاه"، محصولات جالب زیادی خواهید یافت.
        </span>
        <div className="mt-16 text-center">
          <Link
            href="/allproducts"
            className="bg-sabz hover:bg-hovercolor py-3 px-5 rounded-md text-white">
            بازگشت به فروشگاه
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap-reverse lg:flex-nowrap lg:flex-row-reverse w-full gap-4 justify-between">
        <div className="w-full lg:w-1/2 mx-auto h-[450px] flex flex-col justify-around shadow-md text-black dark:text-white text-right p-8 border-solid border-3 border-gray-300 dark:border-zinc-500 bg-white dark:bg-zinc-700 direction-ltr rounded-lg">
          <p className="mb-4 text-[22px]">جمع کل سبد خرید</p>
          <div className="flex flex-row-reverse pb-3 justify-between mt-4 border-b border-gray-300 dark:border-zinc-600">
            <p>جمع جزء </p>
            <p>{totalPrice.toLocaleString()} تومان</p>
          </div>
          <p className="text-left text-sm mt-4">
            پیک موتوری: <strong>80,000 </strong>
          </p>
          <div className="flex flex-row-reverse justify-between mt-4">
            <p>حمل و نقل </p>
            <div className="text-left text-gray-400">
              <span className="block">ارسال با پیک ممتاز</span>
              <span className="">(فقط برای تهران)</span>
            </div>
          </div>
          <p
            onClick={() => setChangeAddress(prev => !prev)}
            className="inline-block mt-4 cursor-pointer hover:text-green-600">
            تغییر آدرس
          </p>
          {changeAddress && (
            <div className="flex flex-col gap-2.5 pt-2.5">
              <Select
                className="text-zinc-700"
                defaultValue={stateSelectedOption}
                onChange={setStateSelectedOption}
                isClearable={true}
                placeholder={"استان"}
                isRtl={true}
                isSearchable={true}
                options={stateOptions}
              />
              <input
                className="h-10 outline-none border-none bg-gray-100 dark:bg-gray-100 w-full text-sm rounded text-zinc-700 dark:text-zinc-300 p-4 border border-gray-300 dark:border-zinc-600 "
                type="text"
                placeholder="شهر"
              />
              <input
                className="h-10 outline-none border-none bg-slate-50 dark:bg-gray-100 w-full text-sm rounded text-zinc-700 dark:text-zinc-300 p-4 border border-gray-300 dark:border-zinc-600 "
                type="number"
                placeholder="کد پستی"
              />
              <button
                className="hover:text-green-600 transition-all ease-in"
                onClick={() => setChangeAddress(false)}>
                بروزرسانی
              </button>
            </div>
          )}
          <div className="flex flex-row-reverse mt-8 pt-3 border-t border-gray-300 dark:border-zinc-600 justify-between">
            <p>مجموع</p>
            <p className="text-xl">
              {(totalPrice + 80000).toLocaleString()} تومان
            </p>
          </div>
          <Link href={"/checkout"}>
            <button className="py-3 px-7 cursor-pointer border-none outline-none transition-all ease-in text-md leading-5 w-full mt-4 rounded-lg text-white shadow-md shadow-gray-800 bg-sabz hover:bg-hovercolor">
              ادامه جهت تکمیل سفارش
            </button>
          </Link>
        </div>
        <div className="flex flex-col w-full direction-ltr justify-center">
          <div className="hidden md:block w-full">
            <table className="w-full bg-white rounded-md dark:bg-zinc-700 text-black dark:text-white shadow-md">
              <thead className="border-b-2 border-gray-300 dark:border-zinc-600">
                <tr>
                  <th className="px-4 py-3">جمع جزء</th>
                  <th className="px-4 py-3">تعداد</th>
                  <th className="px-4 py-3">قیمت</th>
                  <th className="px-4 py-3 w-[300px]">محصول</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr
                    className="border-b border-gray-300 dark:border-zinc-600 last:border-none"
                    key={item._id || item.name}>
                    <td className="text-center">
                      {(item.count * item.price).toLocaleString()} تومان
                    </td>
                    <td>
                      <div className="flex justify-between items-center border-2 border-gray-300 dark:border-zinc-600">
                        <span
                          onClick={() => decreaseCount(item._id)}
                          className="cursor-pointer py-2 px-3 transition-all ease-in border-r-2 border-gray-300 dark:border-zinc-600 hover:bg-hovercolor">
                          -
                        </span>
                        <p>{item.count}</p>
                        <span
                          onClick={() => increaseCount(item._id)}
                          className="cursor-pointer py-2 px-2.5 transition-all ease-in border-l-2 border-gray-300 dark:border-zinc-600 hover:bg-sabz">
                          +
                        </span>
                      </div>
                    </td>
                    <td className="text-center text-sm text-zinc-700 dark:text-white">
                      {item.price.toLocaleString()} تومان
                    </td>
                    <td className="flex items-center justify-end gap-4">
                      <Link
                        className="text-sm leading-8 text-right inline-block"
                        href={"/"}>
                        {item.name}
                      </Link>
                      {item.images?.[0] && (
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-20 h-20 object-cover"
                        />
                      )}
                    </td>
                    <td className="pl-2">
                      <IoMdClose
                        onClick={() => handleRemove(item._id)}
                        className="flex cursor-pointer text-xl hover:text-red-600"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="md:hidden flex flex-col gap-4">
            {cart.map(item => (
              <div
                key={item._id || item.name}
                className="p-4 bg-white dark:bg-zinc-700 rounded-md shadow-md flex flex-col gap-3 mx-4 text-zinc-700 dark:text-gray-200">
                {item.images?.[0] && (
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-40 object-cover rounded-md"
                  />
                )}
                <p className="text-lg font-semibold text-right">{item.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  قیمت: {item.price.toLocaleString()} تومان
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  جمع کل: {(item.count * item.price).toLocaleString()} تومان
                </p>
                <div className="flex items-center justify-between border-2 border-gray-300 dark:border-zinc-600 rounded-md">
                  <span
                    onClick={() => decreaseCount(item._id)}
                    className="cursor-pointer py-2 px-3 transition-all ease-in border-r-2 border-gray-300 dark:border-zinc-600 hover:bg-hovercolor">
                    -
                  </span>
                  <p>{item.count}</p>
                  <span
                    onClick={() => increaseCount(item._id)}
                    className="cursor-pointer py-2 px-2.5 transition-all ease-in border-l-2 border-gray-300 dark:border-zinc-600 hover:bg-sabz">
                    +
                  </span>
                </div>
                <IoMdClose
                  onClick={() => handleRemove(item._id)}
                  className="self-end cursor-pointer text-xl hover:text-red-600"
                />
              </div>
            ))}
          </div>
          <section className="flex items-baseline w-full justify-center gap-4 mt-7">
            <div className="w-[200px] h-12 text-center border-2 border-gray-300 dark:border-zinc-600 bg-gray-100 dark:bg-gray-200 rounded-md relative">
              <input
                onChange={e => setDiscount(e.target.value)}
                value={discount}
                className="w-full h-full text-sm text-center outline-none bg-transparent p-2"
                type="text"
                placeholder="کد تخفیف"
              />
              <button
                onClick={checkDiscount}
                className="absolute left-0 top-0 bg-sabz text-white w-[50px] h-full rounded-md">
                اعمال
              </button>
            </div>
            {discountError && (
              <span className="text-red-600 text-sm">{discountError}</span>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default Table;
