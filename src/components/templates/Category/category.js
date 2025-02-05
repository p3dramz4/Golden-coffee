import React from "react";

export default function Category() {
  return (
    <section className="category-banner my-20">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-white">
          <a
            href="#"
            className="category-banner__right flex flex-col justify-center pr-7 md:pr-12 rounded-2xl h-[142px] md:h-[248px]">
            <span className="font-DanaDemiBold text-2xl/6 md:text-4xl/6 mb-4 md:mb-7">
              انواع قهوه
            </span>
            <span className="md:font-DanaMedium text-xl/6">
              ترکیبی و تک خاستگاه
            </span>
          </a>
          <a
            href="#"
            className="category-banner_left flex flex-col justify-center pr-7 md:pr-12 rounded-2xl h-[142px] md:h-[248px]">
            <span className="font-DanaDemiBold text-2xl/6 md:text-4xl/6 mb-4 md:mb-7">
              پودر های فوری
            </span>
            <span className="md:font-DanaMedium text-xl/6">
              نسکافه . هات چاکلت . ماسالا
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
