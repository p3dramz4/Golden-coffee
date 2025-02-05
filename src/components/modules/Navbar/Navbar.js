"use client";
import Icons from "@/components/icons/icon";
import "@/styles/hamburger.css";
import "@/app/globals.css";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/CartContext";
import { useState, useEffect } from "react";

export default function Navbar({ isLogin, setCategoryFilter }) {
  const { cart } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [user, setUser] = useState(null);

   useEffect(() => {
     const getUser = async () => {
       try {
         const res = await fetch("/api/auth/me"); 
         const data = await res.json();
         if (res.ok && data) {
           setUser(data);
         } else {
           setUser(null);
         }
       } catch (error) {
         console.error("خطا در دریافت اطلاعات کاربر:", error);
         setUser(null); 
       }
     };

     getUser();
   }, []);

  const handleAllProductsClick = () => {
    setCategoryFilter("");
  };

  const handleCategoryClick = category => {
    if (typeof setCategoryFilter === "function") {
      setCategoryFilter(category);
    } else {
      console.error("setCategoryFilter is not a function");
    }
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="md:w-[95%] z-50 lg:w-[90%] mx-auto fixed top-0 md:top-4 right-0 left-0 bg-black/50 rounded-3xl backdrop-blur-[6px] ">
        <div className="hidden md:flex justify-between items-center p-2 h-24">
          <nav className="flex items-center mr-4 h-14">
            <div className="ml-4">
              <img
                className="w-9 h-9 cursor-pointer"
                src="/images/app-logo.png"
                alt="Golden-coffee"
              />
            </div>
            <ul className="flex items-center h-full md:gap-x-5 md:text-lg lg:gap-x-9 lg:text-xl tracking-tightest text-gray-300 child:leading-[56px] child-hover:text-orange-300 child-hover:cursor-pointer transition-all">
              <li className="text-orange-200">
                <Link href="/">صفحه اصلی</Link>
              </li>
              <li className="relative group">
                <Link
                  href="/allproducts"
                  onClick={handleAllProductsClick}
                  className="flex items-center gap-1">
                  فروشگاه
                  <Icons.ChevronDownNav />
                </Link>
                <ul className="absolute md:w-[160px] lg:w-56 md:p-4 lg:p-6 md:space-y-3 lg:space-y-4 md:text-sm lg:text-base bg-white text-zinc-700 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all delay-75 dark:bg-zinc-700 dark:text-white border-t-[3px] shadow-normal border-t-orange-300 tracking-normal rounded-2xl child:block child:transition-all child-hover:text-orange-300">
                  <li className="">
                    <Link href="" onClick={() => handleCategoryClick("عربیکا")}>
                      قهوه عربیکا
                    </Link>
                  </li>
                  <li className="">
                    <Link href="" onClick={() => handleCategoryClick("دانه")}>
                      دانه قهوه اسپرسو
                    </Link>
                  </li>
                  <li className="">
                    <Link href="" onClick={() => handleCategoryClick("کپسول")}>
                      کپسول قهوه
                    </Link>
                  </li>
                  <li className="">
                    <Link href="" onClick={() => handleCategoryClick("پک")}>
                      پک های اقتصادی
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link href="/articles">بلاگ</Link>
              </li>
              <li>
                <Link href="/about-us">درباره من</Link>
              </li>
              <li>
                <Link href="/contact-us">تماس با ما</Link>
              </li>
            </ul>
          </nav>
          <div className="flex ml-4 gap-x-3 xl:gap-x-5 items-center text-orange-200">
            <div className="flex gap-3">
              <div className="relative group">
                <div className="py-3">
                  <Icons.MarketIcon />
                </div>
                {/* <!-- سبد خرید --> */}
                <div className="absolute md:w-[300px] lg:w-[400px] md:max-h[320px] lg:max-h-[450px] scroll-container overflow-hidden p-5 left-0 space-y-4 text-base opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all delay-75 bg-white text-zinc-700 dark:bg-zinc-700 dark:text-white border-t-[3px] shadow-normal border-t-orange-300 rounded-2xl">
                  <div className="flex items-center font-DanaMedium text-xs tracking-tighter justify-between ">
                    <span className="justify-between text-gray-400">
                      {cart.length} مورد
                    </span>
                    <a href="#" className="flex items-center text-orange-400">
                      مشاهده سبد خرید
                      <Icons.ChevronLeft />
                    </a>
                  </div>
                  <div className="divide-y divide-gray-100 dark:divide-white/5 overflow-y-auto md:max-h-[140px] lg:max-h-[250px]">
                    {cart && cart.length > 0 ? (
                      <>
                        {cart.map(item => (
                          <div
                            key={item._id || item.name}
                            className="flex tracking-tightest gap-x-2.5 py-3 border-b border-gray-300 dark:border-b-white/10">
                            <div>
                              {item.images?.[0] && (
                                <img
                                  className="w-[120px] h-[120px] object-cover"
                                  src={item.images[0]}
                                  alt={item.name}
                                />
                              )}
                            </div>
                            <div className="flex flex-col justify-between">
                              <h3 className="max-w-[200px] font-medium font-Dana line-clamp-2">
                                {item.name}
                              </h3>
                              {item.discount ? (
                                <span className="mt-5 mb-1 text-xs text-green-700 font-medium">
                                  {item.discount.toLocaleString()} تومان تخفیف
                                </span>
                              ) : null}
                              <span>
                                <span className="font-semibold text-lg font-DanaMedium">
                                  {(item.price * item.count).toLocaleString()}
                                </span>{" "}
                                تومان
                                <span className="text-gray-500 text-sm">
                                  {" "}
                                  (تعداد: {item.count}){" "}
                                </span>
                              </span>
                            </div>
                          </div>
                        ))}
                        <div className="flex flex-col gap-5 mt-5">
                          <div className="flex justify-between items-center px-4 pt-4 border-t border-gray-300 dark:border-zinc-500">
                            <div className="flex flex-col gap-1">
                              <span className="font-DanaMedium text-gray-300 dark:text-emerald-500 text-xs tracking-tighter">
                                مبلغ قابل پرداخت
                              </span>
                              <span className="flex items-center gap-1">
                                <span>
                                  {cart
                                    .reduce(
                                      (total, item) =>
                                        total + item.price * item.count,
                                      0
                                    )
                                    .toLocaleString()}
                                </span>
                                تومان
                              </span>
                            </div>
                            <div>
                              <Link
                                className="flex justify-center items-center md:h-10 lg:h-14 md:w-[90px] lg:w-[144px] text-white bg-teal-600 dark:bg-emerald-500 hover:bg-teal-700 dark:hover:bg-emerald-600 transition-colors rounded-xl tracking-tightest"
                                href="/cart">
                                ثبت سفارش
                              </Link>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <p className="text-2xl text-zinc700 dark:text-white text-center py-14">
                        سبد خرید شما خالی است
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div
                  onClick={toggleTheme}
                  className="toggle-theme py-3 cursor-pointer">
                  {theme === "light" ? <Icons.MoonIcon /> : <Icons.SunIcon />}
                </div>
              </div>
            </div>

            <span className="block w-px h-14 bg-white/20"></span>
            <div className="flex items-center gap-4">
              {user ? (
                user.role === "ADMIN" ? (
                  <div className="relative group">
                    <Link href="/p-admin">
                      <div className="flex items-center text-orange-200 cursor-pointer gap-1">
                        پنل ادمین
                        <Icons.ChevronDownNav />
                      </div>
                    </Link>
                    <ul className="absolute top-14 left-0 md:w-[160px] lg:w-[200px] p-4 space-y-3 bg-white text-zinc-700 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all delay-75 dark:bg-zinc-700 dark:text-white border-t-[3px] shadow-normal border-t-orange-300 rounded-2xl">
                      <li>
                        <Link
                          href="/p-admin"
                          className="flex items-center gap-2 py-1 hover:text-orange-300">
                          پیشخوان
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/p-admin/orders"
                          className="flex items-center gap-2 py-1 hover:text-orange-300">
                          سفارش ها
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/p-admin/tickets"
                          className="flex items-center gap-2 py-1 hover:text-orange-300">
                          تیکت‌های پشتیبانی
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/p-admin/comments"
                          className="flex items-center gap-2 py-1 hover:text-orange-300">
                          کامنت‌ها
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/p-admin/users"
                          className="flex items-center gap-2 py-1 hover:text-orange-300">
                          مدیریت کاربران
                        </Link>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div className="relative group">
                    <Link href="/p-user">
                      <div className="flex items-center text-orange-200 cursor-pointer gap-1">
                        پنل کاربری
                        <Icons.ChevronDownNav />
                      </div>
                    </Link>
                    <ul className="absolute top-14 left-0 md:w-[160px] lg:w-[200px] p-4 space-y-3 bg-white text-zinc-700 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all delay-75 dark:bg-zinc-700 dark:text-white border-t-[3px] shadow-normal border-t-orange-300 rounded-2xl">
                      <li>
                        <Link
                          href="/p-user/orders"
                          className="flex items-center gap-2 py-1 hover:text-orange-300">
                          سفارشات
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/p-user/tickets"
                          className="flex items-center gap-2 py-1 hover:text-orange-300">
                          تیکت‌های پشتیبانی
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/p-user/comments"
                          className="flex items-center gap-2 py-1 hover:text-orange-300">
                          کامنت‌ها
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/p-user/wishlist"
                          className="flex items-center gap-2 py-1 hover:text-orange-300">
                          علاقه‌مندی‌ها
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/p-user/account-details"
                          className="flex items-center gap-2 py-1 hover:text-orange-300">
                          جزئیات اکانت
                        </Link>
                      </li>
                    </ul>
                  </div>
                )
              ) : (
                <div className="flex cursor-pointer tracking-tightest py-3 items-center">
                  <Icons.ArrowIcon />
                  <Link
                    href="/login-register"
                    className="hidden xl:inline-block">
                    ورود | ثبت نام
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* <!--General Mobile Menu --> */}
        <div className="flex md:hidden fixed left-0 right-0 justify-between items-center h-14 px-4 bg-white dark:bg-zinc-700 z-30">
          {/* Menu */}
          <div
            className={`nav fixed top-0 bottom-0 -right-64 w-64 p-4 min-h-screen scroll-container overflow-y-auto bg-white dark:bg-zinc-700 z-20 transition-transform duration-300 ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}>
            {/* Mobile Header */}
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-b-gray-100 dark:border-b-white/10">
              <Icons.Logo />
              <Icons.MobileLogo />
              {/* Mobile Menu Icon */}
              <button
                className={`nav-close-btn hamburger hamburger--spin ${
                  isMenuOpen ? "" : "is-active"
                }`}
                type="button"
                onClick={toggleMenu}>
                <span className="hamburger-box">
                  <span className="hamburger-inner"></span>
                </span>
              </button>
            </div>
            <ul className="child:pr-2 child:text-zinc-700 space-y-3 child:dark:text-white mb-5">
              <li className="flex items-center h-9 rounded-md">
                <a href="/" className="flex items-center gap-x-2">
                  <Icons.Home />
                  صفحه اصلی
                </a>
              </li>
              <li className="h-9 flex items-center">
                <Link href="/about-us" className="flex items-center gap-x-2">
                  <Icons.BriefCase />
                  درباره من
                </Link>
              </li>
              <li className="h-9 flex items-center">
                <Link href="/articles" className="flex items-center gap-x-2">
                  <Icons.DocumentText />
                  بلاگ
                </Link>
              </li>
              <li className="h-9 flex items-center">
                <Link href="/contact-us" className="flex items-center gap-x-2">
                  <Icons.PhoneArrowUpRight />
                  تماس با ما
                </Link>
              </li>
            </ul>
            <div className="flex flex-col gap-6 items-start pt-5 mb-6 border-t border-t-gray-100 dark:border-t-white/10 text-orange-300 pr-2">
              {!isLogin ? (
                <Link href="/login-register">
                  <div className="flex cursor-pointer tracking-tightest py-3 items-center">
                    <Icons.ArrowIcon />
                    <p className="md:hidden xl:flex">ورود | ثبت نام</p>
                  </div>
                </Link>
              ) : (
                user && (
                  <div>
                    <Link href={user && user.role === "ADMIN" ? "/p-admin" : "/p-user"}>
                      <div
                        className="flex items-center text-orange-200 cursor-pointer gap-1 transition-all duration-200 hover:text-orange-300"
                        onClick={() => setShowSubmenu(!showSubmenu)}>
                        {user && user.role === "ADMIN" ? "پنل ادمین" : "پنل کاربری"}
                        {showSubmenu ? (
                          <Icons.ChevronUp />
                        ) : (
                          <Icons.ChevronDown />
                        )}
                      </div>
                    </Link>

                    {showSubmenu && (
                      <ul className="text-zinc-700 dark:text-gray-100 mt-2 space-y-2 transition-all duration-300">
                        {user.role === "ADMIN" ? (
                          <>
                            <li>
                              <Link
                                href="/p-admin"
                                className="flex items-center gap-2 py-1 hover:text-orange-300">
                                پیشخوان
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/p-admin/orders"
                                className="flex items-center gap-2 py-1 hover:text-orange-300">
                                سفارش ها
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/p-admin/tickets"
                                className="flex items-center gap-2 py-1 hover:text-orange-300">
                                تیکت‌های پشتیبانی
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/p-admin/comments"
                                className="flex items-center gap-2 py-1 hover:text-orange-300">
                                کامنت‌ها
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/p-admin/users"
                                className="flex items-center gap-2 py-1 hover:text-orange-300">
                                مدیریت کاربران
                              </Link>
                            </li>
                          </>
                        ) : (
                          <>
                            <li>
                              <Link
                                href="/p-user/orders"
                                className="block py-1 hover:text-orange-300">
                                سفارشات
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/p-user/tickets"
                                className="block py-1 hover:text-orange-300">
                                تیکت‌های پشتیبانی
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/p-user/comments"
                                className="block py-1 hover:text-orange-300">
                                کامنت‌ها
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/p-user/wishlist"
                                className="block py-1 hover:text-orange-300">
                                علاقه‌مندی‌ها
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/p-user/account-details"
                                className="block py-1 hover:text-orange-300">
                                جزئیات اکانت
                              </Link>
                            </li>
                          </>
                        )}
                      </ul>
                    )}
                  </div>
                )
              )}

              <div
                onClick={toggleTheme}
                className="inline-block toggle-theme cursor-pointer">
                {theme === "light" ? (
                  <div className="flex items-center gap-x-2">
                    <Icons.MoonIcon />
                    <span>تم تیره</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-x-2">
                    <Icons.SunIcon />
                    <span>تم روشن</span>
                  </div>
                )}
              </div>
              <Link href="/cart" className="inline-flex items-center gap-x-2">
                <Icons.MarketIcon />
                <span>سبد خرید</span>
              </Link>
            </div>
          </div>
          <button
            className={`nav-icon hamburger hamburger--spin ${
              isMenuOpen ? "" : "is-active"
            }`}
            type="button"
            onClick={toggleMenu}>
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
          <div>
            <Icons.MobileLogo />
          </div>
          <div>
            <Icons.MarketIconMobile />
          </div>
        </div>
        {/* <!-- mobile-basket --> */}
        <div className="cart md:hidden fixed flex flex-col top-0 bottom-0 -left-64 w-64 p-4 min-h-screen bg-white dark:bg-zinc-700 scroll-container overflow-y-auto z-40">
          {/* <!-- mobile-basket-header --> */}
          <div className="flex justify-between items-center pb-4 mb-4 border-b border-b-gray-100 dark:border-b-white/10 text-zinc-700 dark:text-white">
            <Icons.Xmark />
            <span className="font-semibold text-lg">سبد خرید</span>
          </div>
          {/* <!--mobile-basket-item --> */}
          <div className="divide-y divide-gray-100 dark:divide-white/5 overflow-y-auto md:max-h-[140px] lg:max-h-[250px] ">
            <div className="flex tracking-tightest gap-x-2.5 py-3">
              <div className="basis-2/5">
                <img
                  className="w-[120px] h-[120px] object-cover"
                  src="/images/products/p2.png"
                  alt="Coffee"
                />
              </div>
              <div className="flex basis-3/5 flex-col justify-between">
                <h4 className="max-w-[200px] font-medium font-Dana line-clamp-2 text-sm text-zinc-700 dark:text-white pr-1">
                  قهوه عربیکا نسیم کوهستان طلایی ۲۵۰ گرمی
                </h4>
                <span className="mt-5 mb-1 text-xs text-green-700 font-medium">
                  21,000 تومان تخفیف
                </span>
                <span className="text-xs text-zinc-700 dark:text-white">
                  {" "}
                  <span className="font-medium text-lg font-Dana">
                    239,000{" "}
                  </span>{" "}
                  تومان{" "}
                </span>
              </div>
            </div>
            <div className="flex tracking-tightest gap-x-2.5 py-3">
              <div className="basis-2/5">
                <img
                  className="w-[120px] h-[120px] object-cover"
                  src="/images/products/p5.png"
                  alt="Coffee"
                />
              </div>
              <div className="flex flex-col basis-3/5 justify-between">
                <h4 className="max-w-[200px] font-medium font-Dana line-clamp-2 text-sm text-zinc-700 dark:text-white pr-1">
                  قهوه عربیکا سلطنتی ۶۰۰ گرمی
                </h4>
                <span className="text-xs text-zinc-700 dark:text-white">
                  {" "}
                  <span className="font-medium text-lg font-Dana">
                    320,000{" "}
                  </span>{" "}
                  تومان{" "}
                </span>
              </div>
            </div>
            <div className="flex tracking-tightest gap-x-2.5 py-3">
              <div className="basis-2/5">
                <img
                  className="w-[120px] h-[120px] object-cover"
                  src="/images/products/p7.png"
                  alt="Coffee"
                />
              </div>
              <div className="flex flex-col justify-between basis-3/5">
                <h4 className="max-w-[200px] font-medium font-Dana line-clamp-2 text-sm text-zinc-700 dark:text-white pr-1">
                  قهوه عربیکا عصاره ۶۰۰ گرمی
                </h4>
                <span className="mt-5 mb-1 text-xs text-green-700 font-medium">
                  119,000 تومان تخفیف
                </span>
                <span className="text-xs text-zinc-700 dark:text-white">
                  {" "}
                  <span className="font-medium text-lg font-Dana">
                    356,000{" "}
                  </span>{" "}
                  تومان{" "}
                </span>
              </div>
            </div>
            <div className="flex tracking-tightest gap-x-2.5 py-3">
              <div className="basis-2/5">
                <img
                  className="w-[120px] h-[120px] object-cover"
                  src="/images/products/p2.png"
                  alt="Coffee"
                />
              </div>
              <div className="flex flex-col justify-between basis-3/5">
                <h4 className="max-w-[200px] font-medium font-Dana line-clamp-2 text-sm text-zinc-700 dark:text-white pr-1">
                  قهوه عربیکا طلوع ۲۵۰ گرمی
                </h4>
                <span className="mt-5 mb-1 text-xs text-red-500 font-medium">
                  اتمام موجودی
                </span>
                <span className="text-xs text-zinc-700 dark:text-white">
                  {" "}
                  <span className="font-medium text-lg font-Dana">
                    175,000{" "}
                  </span>{" "}
                  تومان{" "}
                </span>
              </div>
            </div>
          </div>
          {/* <!-- mobile-basket-footer --> */}
          <div className="flex items-center justify-between gap-6 mt-auto border-t border-t-gray-200 dark:border-t-gray-600 pt-3">
            <div>
              <span className="font-DanaMedium text-emerald-500 text-xs tracking-tighter">
                مبلغ قابل پرداخت
              </span>
              <span className="text-sm text-zinc-700 dark:text-white">
                تومان
                <span className="font-semibold font-Dana">915,000</span>
              </span>
            </div>
            <div className="flex-grow">
              <a
                className="flex justify-center items-center text-white bg-teal-600 dark:bg-emerald-500 hover:bg-teal-700 dark:hover:bg-emerald-600 transition-colors rounded-xl tracking-tightest h-11"
                href="#">
                ثبت سفارش
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
