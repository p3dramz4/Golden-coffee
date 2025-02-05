"use client";
import Footer from "@/components/modules/Footer/footer";
import Navbar from "@/components/modules/Navbar/Navbar";
import Stepper from "@/components/modules/stepper/Stepper";
import Link from "next/link";

const page = () => {
  return (
    <>
      <Navbar />
      <Stepper step="complate" />
      <main className="max-w-[1222px] w-full px-4 mx-auto mb-16" data-aos="fade-left">
        <div className="text-gray-200 dark:text-gray-500 ml-auto flex flex-col gap-4 p-4 bg-zinc-700 dark:bg-gray-50 rounded-md shadow-md">
          <ul className="flex flex-col gap-2">
            <li>شماره سفارش: 128387</li>
            <li>تاریخ: ۰۵ بهمن ۱۴۰۲</li>
            <li>
              قیمت نهایی: <strong>230,000 تومان</strong>
            </li>
            <li>روش پرداخت: بانک ملی</li>
          </ul>
            <Link href={"/"}>
              <button className="mt-4 px-5 py-3 text-sm font-semibold uppercase bg-gray-200 text-gray-700 rounded-md shadow-none transition-all hover:text-gray-500 hover:shadow-inner">
                بازگشت به صفحه اصلی 
              </button>
            </Link>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default page;
