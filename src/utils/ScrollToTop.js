"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/ScrollToTop.module.css";
import { MdKeyboardArrowUp } from "react-icons/md";

const ScrollToTop = ({ footerRef }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isEndScrollVisible, setIsEndScrollVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      window.scrollY > 500 ? setIsVisible(true) : setIsVisible(false);
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  useEffect(() => {
    if (!footerRef.current) return;

    const endScrollElement = footerRef.current.querySelector("#endscroll");

    if (!endScrollElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsEndScrollVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1, 
      }
    );

    observer.observe(endScrollElement);

    return () => observer.disconnect();
  }, [footerRef]);

  const scrollToTop = () => {
    isVisible &&
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
  };

  return (
    <button
      className={`${styles.button} ${
        isVisible && !isEndScrollVisible ? styles.buttonVisible : ""
      }`}
      onClick={scrollToTop}>
      <MdKeyboardArrowUp />
    </button>
  );
};

export default ScrollToTop;
