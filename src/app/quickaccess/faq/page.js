"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/modules/Navbar/Navbar";
import Footer from "@/components/modules/Footer/footer";
import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import Icons from "@/components/icons/icon";

const FAQ = () => {
  const [user, setUser] = useState(null);

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

  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "چگونه می‌توانم سفارش خود را ثبت کنم؟",
      answer:
        "برای ثبت سفارش می‌توانید از طریق سایت ما به صورت آنلاین اقدام کنید یا به یکی از شعبه‌های ما مراجعه کنید. تمامی مراحل به راحتی در سایت قابل دسترسی است.",
    },
    {
      question: "چه روش‌های پرداختی برای خرید وجود دارد؟",
      answer:
        "ما روش‌های مختلف پرداخت از جمله کارت‌های بانکی، پرداخت آنلاین و پرداخت در محل را در اختیار شما قرار می‌دهیم.",
    },
    {
      question: "آیا امکان بازگشت کالا وجود دارد؟",
      answer:
        "بله، در صورتی که کالای خریداری شده معیوب باشد یا با آنچه که سفارش داده‌اید مطابقت نداشته باشد، می‌توانید آن را بازگشت دهید.",
    },
    {
      question: "آیا امکان ارسال رایگان وجود دارد؟",
      answer:
        "بله، برای سفارش‌های بالای یک مبلغ خاص، ارسال رایگان ارائه می‌شود. لطفاً برای جزئیات بیشتر به سایت مراجعه کنید.",
    },
    {
      question: "چطور می‌توانم وضعیت سفارش خود را پیگیری کنم؟",
      answer:
        "شما می‌توانید وضعیت سفارش خود را از طریق حساب کاربری خود در سایت پیگیری کنید یا از طریق شماره تماس پشتیبانی ما درخواست کنید.",
    },
  ];

  const toggleFAQ = index => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <>
      <Navbar isLogin={user ? true : false} />
      <Breadcrumb route="پرسش‌های متداول" />
      <div className="p-6 py-20 dark:text-gray-300 text-zinc-700">
        <h1 className="text-2xl font-bold mb-4 w-[92%] md:w-[82%] lg:w-[72%] mx-auto leading-relaxed">
          پرسش‌های متداول
        </h1>
        <div className="w-full max-w-3xl mx-auto mt-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border rounded-md p-4 mb-4 cursor-pointer transition-all duration-300 ${
                openIndex === index ? "w-full" : "max-w-full md:w-[90%]"
              }`}
              onClick={() => toggleFAQ(index)}>
              <div className="flex items-center justify-between">
                <div className="text-base sm:text-lg md:text-xl text-zinc-800 dark:text-white">
                  {faq.question}
                </div>
                {/* Arrow icon based on whether FAQ is open or closed */}
                {openIndex === index ? (
                  <Icons.ChevronUp className="h-5 w-5" />
                ) : (
                  <Icons.ChevronDown className="h-5 w-5" />
                )}
              </div>
              {openIndex === index && (
                <div className="text-sm sm:text-base mt-2">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FAQ;
