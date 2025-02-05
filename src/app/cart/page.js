"use client";
import Footer from "@/components/modules/Footer/footer";
import Navbar from "@/components/modules/Navbar/Navbar";
import Stepper from "@/components/modules/stepper/Stepper";
import Table from "@/components/templates/cart/Table";
import styles from "@/styles/cart.module.css";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

const page = () => {
  const [cartItems, setCartItems] = useState([]); 
  const [user, setUser] = useState(null); 
  const [discountCode, setDiscountCode] = useState(null); 
  const [finalPrice, setFinalPrice] = useState(0); 
  const { cart, discount, applyDiscount } = useCart(); 

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || []; 
    setCartItems(cart);

    const savedDiscountCode = JSON.parse(localStorage.getItem("discountCode"));
    const savedFinalPrice = localStorage.getItem("finalPrice");

    if (savedDiscountCode) {
      setDiscountCode(savedDiscountCode); 
      setFinalPrice(savedFinalPrice); 
    }
  }, []);

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

  return (
    <>
      <Navbar isLogin={user ? true : false} />
      <Stepper step="cart" />
      <main className={styles.cart} data-aos="fade-up">
        <Table products={cartItems} applyDiscount={applyDiscount} />{" "}
      </main>
      <Footer />
    </>
  );
};

export default page;
