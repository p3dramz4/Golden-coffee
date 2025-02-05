import Icons from "@/components/icons/icon";
import React from "react";

export default function ContactUs() {
  return (
    <section className="contact-us mb-16 md:mb-28">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-y-8 lg:gap-x-5 text-zinc-700 dark:text-white">
          <img
            src="/images/contact.png"
            className="shrink-0 w-[296px]"
            alt="Coffee"
          />
          <div>
            <h3 className="font-MorabbaMedium text-2xl md:text-5xl mb-0.5 md:mb-1.5">
              یکی از بهترین قهوه ها
            </h3>
            <span className="font-MorabbaLight text-lg md:text-3xl/[48px]">
              کیفیت قهوه را از ما بخواهید...
            </span>
            <div className="flex gap-x-2.5 my-5 md:my-6">
              <span className="inline-block w-1 h-1 bg-zinc-700 dark:bg-gray-400 rounded-full"></span>
              <span className="inline-block w-1 h-1 bg-zinc-700 dark:bg-gray-400 rounded-full"></span>
              <span className="inline-block w-1 h-1 bg-zinc-700 dark:bg-gray-400 rounded-full"></span>
            </div>
            <p className="text-lg md:text-2xl">
              فضای گرم و دنج ما را احساس کنید، جایی که همه می توانند قهوه معطری
              پیدا کنند و دسرهای خوشمزه ما را که کاملا با قهوه داغ همراه شده
              است، امتحان کنند. فضای داخلی شیک و کارکنان خوش برخورد ما روز شما
              را می سازد!
            </p>
            <a
              href="#"
              className="inline-flex items-center justify-center h-[50px] md:h-[60px] px-6 text-orange-300 section-link tracking-tighter mt-5 md:mt-6 gap-x-2 border md:border-2 border-orange-300 rounded-full text-xl">
              <Icons.Phone />
              ثبت سفارش تلفنی
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
