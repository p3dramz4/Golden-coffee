"use client";
import Navbar from "@/components/modules/Navbar/Navbar";
import Footer from "@/components/modules/Footer/footer";
import { useEffect, useState } from "react";
import "aos/dist/aos.css";
import AOS from "aos";

const page = () => {
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

  useEffect(() => {
    AOS.init({
      duration: 1000, 
      easing: "ease-in-out", 
      once: true, 
    });
  }, []);


  return (
    <>
      <div className="text-zinc-700 dark:text-gray-200">
        <Navbar isLogin={user ? true : false} />
        <div className=" w-[80%] mx-auto p-5 md:p-8 transform transition-all duration-500 hover:scale-105 mt-[14%] md:mt-[12%] lg:mt-[10%] xl:mt-[7%] mb-6 md:mb-10 relative overflow-hidden">
          <h2 className="text-md md:text-lg lg:text-2xl xl:text-4xl font-Dana">
            پدرام دهقان توسعه دهنده{" "}
            <span className="text-orange-300">فرانت اند</span>
          </h2>
          <p className="mt-2 sm:mt-4 text-sm leading-6 md:text-lg lg:text-xl xl:text-2xl">
            در حال حاضر، ترم آخر رشته مهندسی کامپیوتر در مقطع کارشناسی در
            دانشگاه علوم تحقیقات هستم و به دلیل معافیت دائم از خدمت سربازی، قادر
            به فعالیت مستمر در پروژه‌ها و شغل‌های مرتبط با توسعه نرم‌افزار هستم.
            همچنین، تجربه سه ماهه کارآموزی در شرکت طلاسی (talasea.ir) را داشتم
            که در آن پروژه‌های مختلفی را به صورت عملی پیاده‌سازی کردم. متاسفانه
            به دلیل مسافت زیاد، نتواستم ادامه همکاری داشته باشم.
          </p>
        </div>
        <div
          className="relative w-[80%] mx-auto"
          data-aos="fade-up"
          data-aos-duration="1200"
          data-aos-delay="100">
          <img
            src="/images/frontend.png"
            className="w-full h-auto rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent flex items-center justify-start p-4">
            <h2 className="text-white font-bold text-lg sm:text-xl md:text-2xl text-center">
              <span className="block text-orange-300 text-lg xs:text-xl sm:text-3xl md:text-5xl">
                Frontend Developer
              </span>
              <span className="block text-gray-300">specializing in</span>{" "}
              Next.js, React, and Tailwind CSS
            </h2>
          </div>
        </div>
        <div
          data-aos="fade-up"
          data-aos-duration="1200"
          data-aos-delay="100"
          className="w-[80%] mx-auto py-10 lg:py-16 tracking-wide text-sm leading-6 md:text-lg lg:text-xl xl:text-2xl">
          بیش از دو سال است که در زمینه فرانت‌اند فعالیت می‌کنم و در این مدت،
          تجربه‌های زیادی در پیاده‌سازی و طراحی سایت‌های مختلف کسب کرده‌ام. این
          سایت نمونه کار که مشاهده می‌کنید، از یک دوره آموزشی برای طراحی هدر
          الهام گرفته شده است که من با استفاده از Next.js آن را توسعه داده‌ام و
          سایر بخش‌های آن را به طور کاستوم و مطابق نیازم طراحی کرده‌ام. در این
          پروژه، علاوه بر کار با Next.js برای بخش فرانت‌اند، اطلاعات در قسمت
          بک‌اند با استفاده از MongoDB مدیریت شده است.
        </div>
        <div
          className="relative w-[80%] mx-auto"
          data-aos="fade-up"
          data-aos-duration="1200"
          data-aos-delay="200">
          <img
            src="/images/alborz.jpg"
            className="w-full h-auto rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent flex items-center justify-start p-4">
            <h2 className="text-white sm:font-bold text-lg sm:text-xl md:text-2xl text-center">
              فارغ التحصیل رشته ریاضی از{" "}
              <span className="block text-orange-300 xxs:text-lg xs:text-xl sm:text-3xl md:text-5xl">
                دبیرستان ماندگار البرز
              </span>
              با معدل 19 در سال 1400
            </h2>
          </div>
        </div>
        <div
          data-aos="fade-up"
          data-aos-duration="1200"
          data-aos-delay="100"
          className="w-[80%] mx-auto py-10 md:py-16 tracking-wide md:text-lg lg:text-xl xl:text-2xl">
          دوران دبیرستان خود را در دبیرستان ماندگار البرز، یکی از قدیمی‌ترین و
          معتبرترین دبیرستان‌های ایران، گذراندم. این دبیرستان با سابقه‌ای بیش از
          یک قرن، همواره به‌عنوان نمادی از آموزش باکیفیت و پرورش دانش‌آموزان
          برتر شناخته شده است. تحصیل در این محیط نه تنها پایه علمی من را تقویت
          کرد، بلکه فرصت‌های بسیاری برای رشد مهارت‌های اجتماعی و خلاقیت فراهم
          آورد. دوران تحصیل در البرز به من این امکان را داد تا زیر نظر اساتید
          برجسته، اصولی قوی در علوم پایه و فناوری کسب کنم که تأثیر زیادی بر
          موفقیت‌های فعلی من در حوزه فناوری اطلاعات داشته است.
        </div>
        <div
          className="relative w-[80%] mx-auto"
          data-aos="fade-up"
          data-aos-duration="1200"
          data-aos-delay="300">
          <img
            src="/images/srbiau.jpeg"
            className="w-full h-auto rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent flex items-center justify-start p-4">
            <h2 className="text-white font-bold text-base xs:text-lg sm:text-xl md:text-2xl text-center">
              دانشجوی رشته مهندسی کامپیوتر از
              <span className="block text-orange-300 text-lg xs:text-xl sm:text-3xl md:text-5xl">
                دانشگاه علوم تحقیقات
              </span>
              ترم آخر مقطع کارشناسی
            </h2>
          </div>
        </div>
        <div
          data-aos="fade-up"
          data-aos-duration="1200"
          data-aos-delay="100"
          className="w-[80%] mx-auto py-10 md:py-16 tracking-wide md:text-lg lg:text-xl xl:text-2xl mb-8">
          در حال حاضر، ترم آخر رشته مهندسی کامپیوتر در مقطع کارشناسی در دانشگاه
          علوم و تحقیقات هستم. این دانشگاه به عنوان یکی از برترین مراکز آموزش
          عالی ایران، با تمرکز بر توسعه مهارت‌های عملی و تحقیقاتی، فرصتی عالی
          برای گسترش دانش و تسلط بر مفاهیم پیشرفته برنامه‌نویسی و فناوری اطلاعات
          برایم فراهم کرده است. تجربه‌های متنوعی که در این مدت کسب کرده‌ام، از
          جمله پروژه‌های دانشگاهی و فعالیت‌های گروهی، مرا برای ورود به دنیای
          حرفه‌ای و حل مسائل واقعی آماده کرده است.
        </div>

        {/* Footer Section */}
        <Footer />
      </div>
    </>
  );
};

export default page;
