"use client";
import Footer from "@/components/modules/Footer/footer";
import Navbar from "@/components/modules/Navbar/Navbar";
import Stepper from "@/components/modules/stepper/Stepper";
import Table from "@/components/templates/cart/Table";
import styles from "@/styles/cart.module.css";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext"; // استفاده از Context

const page = () => {
  const [cartItems, setCartItems] = useState([]); // سبد خرید
  const [user, setUser] = useState(null); // کاربر
  const [discountCode, setDiscountCode] = useState(null); // کد تخفیف
  const [finalPrice, setFinalPrice] = useState(0); // قیمت نهایی بعد از تخفیف
  const { cart, discount, applyDiscount } = useCart(); // گرفتن تخفیف از Context

  // بارگذاری داده‌ها پس از رفرش صفحه
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || []; // گرفتن سبد خرید از localStorage
    setCartItems(cart);

    // خواندن تخفیف و قیمت نهایی از localStorage
    const savedDiscountCode = JSON.parse(localStorage.getItem("discountCode"));
    const savedFinalPrice = localStorage.getItem("finalPrice");

    if (savedDiscountCode) {
      setDiscountCode(savedDiscountCode); // بارگذاری کد تخفیف
      setFinalPrice(savedFinalPrice); // بارگذاری قیمت نهایی
    }
  }, []);

  // دریافت اطلاعات کاربر
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

    fetchUserData();
  }, []);

  // نیازی به تعریف دوباره applyDiscount در اینجا نیست

  return (
    <>
      <Navbar isLogin={user ? true : false} />
      <Stepper step="cart" />
      <main className={styles.cart} data-aos="fade-up">
        <Table products={cartItems} applyDiscount={applyDiscount} />{" "}
        {/* همین applyDiscount از Context استفاده می‌کند */}
      </main>
      <Footer />
    </>
  );
};

export default page;
