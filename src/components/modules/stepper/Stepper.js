import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

const Stepper = ({ step }) => {
  return (
    <div
      className="bg-cover bg-center mb-10 pt-[182px] px-[60px] "
      style={{ backgroundImage: 'url("/images/w.jpg")' }}>
      <div className="flex items-center justify-center gap-[18px] pb-[3.8rem] text-white">
        <Link
          className={`inline-block mt-[5px] mb-[5px] uppercase text-[22px] leading-[1.2] ${
            step === "cart"
              ? "opacity-100 scale-110 text-teal-600 font-bold"
              : "text-white scale-100"
          }`}
          href={"/cart"}>
          سبد خرید
        </Link>
        <FaArrowLeftLong
          className="text-[1.2rem] text-brown-600"
          style={{ opacity: "0.7" }}
        />
        {step === "checkout" || step === "complate" ? (
          <Link
            className={`inline-block mt-[5px] mb-[5px] uppercase text-[22px] leading-[1.2] ${
              step === "checkout"
                ? "opacity-100 scale-110 text-teal-600 font-bold"
                : "text-white scale-100"
            }`}
            href={"/checkout"}>
            پرداخت
          </Link>
        ) : (
          <p className="inline-block mt-[5px] mb-[5px] uppercase text-[22px] leading-[1.2] opacity-70">
            پرداخت
          </p>
        )}
        <FaArrowLeftLong
          className="text-[1.2rem] text-brown-600"
          style={{ opacity: "0.7" }}
        />
        {step === "complate" ? (
          <Link
            className={`inline-block mt-[5px] mb-[5px] uppercase text-[22px] leading-[1.2] ${
              step === "complate"
                ? "opacity-100 scale-110 text-teal-600 font-bold"
                : "text-white scale-100"
            }`}
            href={"/complate"}>
            تکمیل سفارش
          </Link>
        ) : (
          <p className="inline-block mt-[5px] mb-[5px] uppercase text-[22px] leading-[1.2] opacity-70">
            تکمیل سفارش
          </p>
        )}
      </div>
    </div>
  );
};

export default Stepper;
