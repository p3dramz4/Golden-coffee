import Icons from "@/components/icons/icon";
import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-zinc-700 py-8 md:py-11 md:pt-[62px]">
      <Icons.CurveFooter />
      <div
        id="endscroll"
        className="absolute items-center justify-center top-0 right-0 left-0 mx-auto w-[30px] h-[30px] border-2 border-orange-300 rounded-full -translate-y-2/4 md:flex hidden">
        <Icons.ChevronDownFooter />
      </div>
      <div className="px-2 sm:px-0 text-gray-300 sm:w-[94%] lg:w-[90%] mx-auto">
        <div className="flex flex-wrap justify-between">
          <div>
            <div className="flex gap-x-5 mb-6 md:mb-4.5 text-gray-300">
              <Icons.LogoFooter />
              <Icons.MobileLogoFooter />
            </div>
            <p className="max-w-[606px] lg:max-w-full xl:max-w-[606px] text-lg md:text-xl/[48px]">
              ما برآنیم تا با پیشرو بودن در فرآیند تولید ، نوع و کیفیت محصول ،
              خدمات توزیع، الگویی برای تولیدکنندگان ایرانی باشیم و به مرجع فرهنگ
              قهوه در ایران تبدیل شویم. می پنداریم که نظر مردم ایران و منطقه
              باید نسبت به کالای ایرانی بهبود یابد و در این راستا با اشتیاق می
              کوشیم.
            </p>
          </div>
          <div className="mt-10 md:mt-[26px]">
            <h4 className="text-2xl text-white mb-6 md:mb-7 font-semibold">
              دسترسی سریع
            </h4>
            <div className="grid grid-cols-2 gap-y-2.5 md:gap-y-5 gap-x-10 md:gap-x-16 h-44">
              <Link
                href="/quickaccess/privacy-policy"
                className="flex items-center gap-x-2 md:gap-x-3 md:text-xl hover:text-orange-300 transition-colors">
                <span className="inline-block w-2 md:w-2.5 h-1 bg-current rounded-full"></span>
                حریم خصوصی
              </Link>
              <Link
                href="/quickaccess/returns"
                className="flex items-center gap-x-2 md:gap-x-3 md:text-xl hover:text-orange-300 transition-colors">
                <span className="inline-block w-2 md:w-2.5 h-1 bg-current rounded-full"></span>
                عودت کالا
              </Link>
              <Link
                href="/quickaccess/terms-of-use"
                className="flex items-center gap-x-2 md:gap-x-3 md:text-xl hover:text-orange-300 transition-colors">
                <span className="inline-block w-2 md:w-2.5 h-1 bg-current rounded-full"></span>
                شرایط استفاده
              </Link>
              <Link
                href="/quickaccess/place-order"
                className="flex items-center gap-x-2 md:gap-x-3 md:text-xl hover:text-orange-300 transition-colors">
                <span className="inline-block w-2 md:w-2.5 h-1 bg-current rounded-full"></span>
                ثبت سفارش
              </Link>
              <Link
                href="/quickaccess/faq"
                className="flex items-center gap-x-2 md:gap-x-3 md:text-xl hover:text-orange-300 transition-colors">
                <span className="inline-block w-2 md:w-2.5 h-1 bg-current rounded-full"></span>
                پرسش های متداول
              </Link>
              <Link
                href="/quickaccess/careers"
                className="flex items-center gap-x-2 md:gap-x-3 md:text-xl hover:text-orange-300 transition-colors">
                <span className="inline-block w-2 md:w-2.5 h-1 bg-current rounded-full"></span>
                فرصت های شغلی
              </Link>
              <Link
                href="/quickaccess/warranties"
                className="flex items-center gap-x-2 md:gap-x-3 md:text-xl hover:text-orange-300 transition-colors">
                <span className="inline-block w-2 md:w-2.5 h-1 bg-current rounded-full"></span>
                ضمانت نامه ها
              </Link>
              <Link
                href="/contact-us"
                className="flex items-center gap-x-2 md:gap-x-3 md:text-xl hover:text-orange-300 transition-colors">
                <span className="inline-block w-2 md:w-2.5 h-1 bg-current rounded-full"></span>
                ارتباط با ما
              </Link>
            </div>
          </div>
          <div className="mt-10 md:mt-[26px]">
            <h4 className="font-semibold text-2xl text-white mb-6 md:mb-7">
              در ارتباط باشیم
            </h4>
            <div>
              <div className="md:text-xl mb-6 md:mb-10">
                <span className="flex  gap-x-2 md:gap-x-3 mb-4 md:mb-5">
                  <Icons.Location />
                  تهران، اشرفی اصفهانی، روبروی پاساژ تیراژه، خیابان نیک زارع،
                  کوچه12 متری چهارم، پلاک 12
                </span>
                <div className="flex flex-wrap gap-x-5 gap-y-4 font-DanaMedium">
                  <a
                    href="mailto:pedramdehghan1382@gmail.com"
                    className="flex  gap-x-2 md:gap-x-3 text-orange-300">
                    <Icons.Mail />
                    pedramdehghan1382@gmail.com
                  </a>
                  <a
                    href="tel:+989106163341"
                    className="flex gap-x-2 md:gap-x-3">
                    <Icons.PhoneFooter />
                    <span>09106163341</span>
                  </a>
                </div>
              </div>
              <div className="flex gap-x-1.5 md:gap-x-6 font-DanaMedium md:text-xl">
                <a
                  href="https://telegram.me/pedram_z4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-center gap-x-2 flex-grow h-14 max-w-[220px] text-zinc-700 bg-gradient-to-r from-orange-200 to-orange-300 rounded-xl">
                  <Icons.Telegram />
                  @pedram_z4
                </a>
                <a
                  href="https://instagram.com/pedram_z4_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-center gap-x-2 flex-grow h-14 max-w-[220px] border border-orange-200 text-orange-200 rounded-xl">
                  <Icons.Instagram />
                  @pedram_z4_
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-between items-center gap-4 font-DanaMedium text-xs md:text-base mt-10 md:mt-11 pt-10 md:pt-11 border-t border-t-white/10 w-full">
            <div className="flex items-center gap-x-2.5">
              <div className="flex-center shrink-0 w-[30px] h-[30px] border border-white/10 rounded-full">
                <div className="flex-center w-5 h-5 border border-white/20 rounded-full">
                  <div className="w-2.5 h-2.5 bg-gradient-to-t from-orange-200 to-orange-300 rounded-full"></div>
                </div>
              </div>
              <p>
                کلیه حقوق برای{" "}
                <span className="text-orange-200">Golden Coffee</span> محفوظ است
                © 2025.
              </p>
            </div>
            <span className="mr-auto">
              © 2025 All rights reserved by Golden Coffee
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
