"use client";
import Footer from "@/components/modules/Footer/footer";
import Navbar from "@/components/modules/Navbar/Navbar";
import Stepper from "@/components/modules/stepper/Stepper";
import { useState, useEffect } from "react";
import Order from "@/components/templates/checkout/order/Order";
import Details from "@/components/templates/checkout/details/Details";

const Page = () => {
  const [user, setUser] = useState(null);
  const [discountCode, setDiscountCode] = useState(null); // درست کردن نام متغیر
  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("/api/authUsers");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // خواندن اطلاعات تخفیف و قیمت نهایی از localStorage
    const savedDiscountCode = JSON.parse(localStorage.getItem("discountCode"));
    const savedFinalPrice = localStorage.getItem("finalPrice");

    // اعمال مقادیر خوانده شده در state
    if (savedDiscountCode !== null) {
      setDiscountCode(savedDiscountCode); // ذخیره کد تخفیف
    }

    if (savedFinalPrice !== null) {
      setFinalPrice(savedFinalPrice); // ذخیره قیمت نهایی
    }

    fetchUserData();
  }, []);

  return (
    <>
      <Navbar isLogin={user ? true : false} />
      <Stepper step="checkout" />
      <div
        className="max-w-[1222px] w-full gap-5 mb-[51px] px-4 mx-auto"
        data-aos="fade-up">
        <main className="flex flex-col lg:flex-row items-baseline mt-8">
          <Details />
          <Order discountCode={discountCode} finalPrice={finalPrice} />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Page;
