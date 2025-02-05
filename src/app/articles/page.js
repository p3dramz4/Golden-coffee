"use client";
import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import Footer from "@/components/modules/Footer/footer";
import Navbar from "@/components/modules/Navbar/Navbar";
import Card from "@/components/templates/articles/card/Card";
import { useState, useEffect } from "react";

const page = () => {
  const articles = [
    {
      id: 1,
      title: "موکاچینو",
      description:
        "موکاچینو ترکیبی از قهوه اسپرسو، شکلات و شیر بخار داده شده است که طعمی شگفت‌انگیز دارد",
      image: "/images/blogs/mocha.jpg",
      link: "/articles/mocha",
    },
    {
      id: 2,
      title: "آیس کافی",
      description:
        "آیس کافی یک نوشیدنی خنک و انرژی‌زا است که ترکیب قهوه سرد و یخ به همراه طعمی متفاوت دارد.",
      image: "/images/blogs/ice.jpg",
      link: "/articles/icecoffee",
    },
    {
      id: 3,
      title: "قهوه ترک",
      description:
        "قهوه ترک یک نوشیدنی غلیظ و شیرین است که با روش خاصی از آسیاب قهوه و جوشاندن آن در آب تهیه می‌شود.",
      image: "/images/blogs/turkish.jpg",
      link: "/articles/turkishcoffee",
    },
    {
      id: 4,
      title: "آمریکانو",
      description:
        "آمریکانو یک نوشیدنی ساده و پرطرفدار بر پایه اسپرسو است که با آب گرم رقیق شده است.",
      image: "/images/blogs/americano.jpg",
      link: "/articles/americano",
    },
  ];

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

  return (
    <>
      <Navbar isLogin={user ? true : false} />
      <Breadcrumb route={"اخبار و مقالات"} />
      <main className="text-black text-right max-w-[1222px] w-full px-[15px] mx-auto mb-16 rtl">
        <div className="grid gap-[23px] row-gap-[30px] px-3 mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map(article => (
            <Card
              key={article.id}
              title={article.title}
              description={article.description}
              image={article.image}
              link={article.link}
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default page;
