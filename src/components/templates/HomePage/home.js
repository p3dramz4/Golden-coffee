import React from "react";
import Icons from "@/components/icons/icon";

export default function Mainhome() {
  return (
    <section className="home relative h-[300px] xs:h-auto xs:aspect-[2/1] md:aspect-auto bg-home-mobile md:bg-home-desktop bg-cover bg-no-repeat bg-[center_top]">
      <div className="container relative h-full overflow-y-hidden md:min-h-screen flex items-center justify-end">
        <div className="text-white">
          <h2 className="font-MorabbaDemiBold text-2xl md:text-6xl mb-0.5 md:mb-2">
            قهوه عربیکا تانزانیا
          </h2>
          <span className="font-MorabbaLight text-xl md:text-5xl">
            یک فنجان بالانس!
          </span>
          <span className="block w-[100px] h-px md:h-0.5 bg-orange-300 my-3 md:my-8"></span>
          <p className="max-w-[201px] md:max-w-[460px] text-xs md:text-2xl">
            قطعا نام آشنای عربیکا را شنیده اید عربیکا یکی از گونه های قهوه است
            که در نواحی مختلف کمربند قهوه کشت می شود.
          </p>
        </div>
        {/* <!-- circles --> */}
        <div className="circle circle--main circle--lg">
          <div className="circle circle--md">
            <div className="circle circle--sm"></div>
          </div>
        </div>
      </div>
      <Icons.Curve />
      {/* <!-- orange circle --> */}
      <div className="absolute items-center justify-center bottom-0 right-0 left-0 mx-auto w-[30px] h-[30px] border-2 border-orange-300 rounded-full translate-y-2/4 sm:flex hidden">
        <Icons.ChevronDownHome />
      </div>
    </section>
  );
}
