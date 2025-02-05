import Icons from "@/components/icons/icon";
import React from "react";

export default function CoffeeClub() {
  return (
    <section className="coffee-club mb-8 md:mb-20">
      <div className="container">
        <div className="flex items-center flex-wrap lg:flex-nowrap lg:gap-x-4 xl:gap-x-24 gap-y-9 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-8 lg:py-0 px-3 lg:px-5 xl:px-11 lg:h-36 rounded-2xl">
          <div className="flex items-center md:shrink-0 gap-x-3 lg:gap-x-6 xl:gap-x-8">
            <img
              src="/images/club/diamond.png"
              className="w-[87px] h-[87px] lg:w-[100px] md:h-[100px]"
              alt="Coffee Club"
            />
            <div>
              <h4 className="font-MorabbaDemiBold text-2xl md:text-5xl mb-2">
                کافی کلاب
              </h4>
              <p className="font-MorabbaLight text-lg md:text-2xl ">
                میدونستی میتونی با امتیاز هات قهوه بخری ؟
              </p>
            </div>
          </div>
          <div className="flex justify-between sm:px-10 lg:px-0 w-full">
            <div className="flex gap-x-2 lg:gap-x-3 xl:gap-x-5">
              <div className="w-[72px] h-[72px] md:w-[98px] md:h-[98px] text-center text-emerald-600 bg-white py-1.5 md:pt-5 md:pb-1 rounded-2xl">
                <Icons.Activity />
                <span className="text-xs md:text-sm">چرخ و بخت</span>
              </div>
              <div className="w-[72px] h-[72px] md:w-[98px] md:h-[98px] text-center text-emerald-600 bg-white py-1.5 md:pt-5 md:pb-1 rounded-2xl">
                <Icons.Discovery />
                <span className="text-xs md:text-sm">ماموریت ها</span>
              </div>
              <div className="w-[72px] h-[72px] md:w-[98px] md:h-[98px] text-center text-emerald-600 bg-white py-1.5 md:pt-5 md:pb-1 rounded-2xl">
                <Icons.TicketStar /> 
                <span className="text-xs md:text-sm">جایزه ها</span>
              </div>
            </div>
            <div className="flex flex-col justify-between text-center">
              <span className="inline-block md:mb-1 font-DanaMedium text-2xl md:text-3xl">
                542
              </span>
              <span className="text-xs md:text-sm">امتیاز شما</span>
              <a
                href="#"
                className="flex-center w-[70px] h-6 xxs:w-[90px] mt-1 md:mt-2 md:w-[110px] xxs:h-[26px] md:h-8 bg-gradient-to-r from-orange-200 to-orange-300 font-DanaMedium text-xs md:text-sm rounded-full">
                دریافت جایزه
                <Icons.ChevronLeftMiniClub />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
