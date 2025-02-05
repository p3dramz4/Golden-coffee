import Icons from "@/components/icons/icon";
import React from "react";
import Link from "next/link";

export default function Blogs() {
  return (
    <section className="blogs mb-8 md:mb-28">
      <div className="container">
        {/* <!-- section head --> */}
        <div className="flex justify-between items-end mb-5 md:mb-12">
          <div>
            <h3 className="section-title">مطالب خواندنی</h3>
          </div>
          <Link href="/articles" className="section-link">
            <span className="hidden md:inline-block">مشاهده همه مطالب</span>
            <span className="inline-block md:hidden">مشاهده همه</span>
            <Icons.ChevronLeft />
          </Link>
        </div>
        {/* <!-- section content --> */}
        <div
          data-aos="fade-up"
          data-aos-anchor-placement="center-bottom"
          data-aos-duration="1000"
          className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-3">
          <div className="group flex sm:block gap-x-2.5 p-2.5 md:pb-2 bg-white dark:bg-zinc-700 shadow-normal rounded-2xl">
            <Link href={"/articles/mocha"}>
              <div className="relative sm:mb-4 rounded-2xl rounded-bl-4xl shrink-0 overflow-hidden w-[130px] h-[130px] sm:w-auto sm:h-auto cursor-pointer">
                <img
                  src="/images/blogs/blog-1.png"
                  className="h-full sm:h-auto object-cover"
                  alt="Blog 1"
                />
                <div className="absolute inset-0 w-full h-full hidden md:flex-center invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all delay-100 bg-gradient-to-r from bg-orange-200/70 to-orange-300/70">
                  <Icons.MobileLogoBlogs />
                </div>
              </div>
            </Link>
            <div className="w-full flex flex-col sm:flex-row items-start justify-between">
              <Link
                href={"/articles/mocha"}
                className="ml-1.5 md:ml-0 font-DanaMedium md:font-Dana text-sm/7 md:text-lg line-clamp-2 max-w-[193px] text-zinc-700 dark:text-white">
                نکاتی راجب موکاچینو
              </Link>
              {/* <!-- desktop --> */}
              <div className="hidden sm:flex gap-3">
                <span className="block w-px h-[61px] bg-gray-100 dark:bg-white/10"></span>
                <div className="flex flex-col -mt-1 ml-[18px] text-teal-600 dark:text-emerald-500 text-sm text-left">
                  <span className="font-Dana font-semibold text-2xl">24</span>
                  <span>دی</span>
                  <span>1403</span>
                </div>
              </div>
              {/* <!-- mobile --> */}
              <div className="flex items-end justify-between w-full sm:hidden border-t border-t-gray-100 dark:border-t-white/10 pb-1.5 pt-[18px]">
                <div className="flex items-center gap-x-1 text-teal-600 dark:text-emerald-500">
                  <span className="font-Dana font-semibold">24</span>
                  <span>دی</span>
                  <span>1403</span>
                </div>
                <Link
                  href={"/articles/mocha"}
                  className="flex items-center gap-x-1 ml-1.5 font-DanaMedium text-xs h-5 rounded-full pr-2.5 pl-2 bg-orange-200/20 text-orange-300">
                  مطالعه
                  <Icons.ArrowLeftMini />
                </Link>
              </div>
            </div>
          </div>
          <div className="group flex sm:block gap-x-2.5 p-2.5 md:pb-2 bg-white dark:bg-zinc-700 shadow-normal rounded-2xl">
            <Link href={"/articles/icecoffee"}>
              <div className="relative sm:mb-4 rounded-2xl rounded-bl-4xl shrink-0 overflow-hidden w-[130px] h-[130px] sm:w-auto sm:h-auto">
                <img
                  src="/images/blogs/blog-1.png"
                  className="h-full sm:h-auto object-cover"
                  alt="Blog 1"
                />
                <div className="absolute inset-0 w-full h-full hidden md:flex-center invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all delay-100 bg-gradient-to-r from bg-orange-200/70 to-orange-300/70">
                  <Icons.MobileLogoBlogs />
                </div>
              </div>
            </Link>
            <div className="w-full flex flex-col sm:flex-row items-start justify-between">
              <Link
                href={"/articles/icecoffee"}
                className="ml-1.5 md:ml-0 font-DanaMedium md:font-Dana text-sm/7 md:text-lg line-clamp-2 max-w-[193px] text-zinc-700 dark:text-white">
                آیس کافی و قهوه های سرد
              </Link>
              {/* <!-- desktop --> */}
              <div className="hidden sm:flex gap-3">
                <span className="block w-px h-[61px] bg-gray-100 dark:bg-white/10"></span>
                <div className="flex flex-col -mt-1 ml-[18px] text-teal-600 dark:text-emerald-500 text-sm text-left">
                  <span className="font-Dana font-semibold text-2xl">17</span>
                  <span>آذر</span>
                  <span>1403</span>
                </div>
              </div>
              {/* <!-- mobile --> */}
              <div className="flex items-end justify-between w-full sm:hidden border-t border-t-gray-100 dark:border-t-white/10 pb-1.5 pt-[18px]">
                <div className="flex items-center gap-x-1 text-teal-600 dark:text-emerald-500">
                  <span className="font-Dana font-semibold">17</span>
                  <span>آذز</span>
                  <span>1403</span>
                </div>
                <Link
                  href={"/articles/icecoffee"}
                  className="flex items-center gap-x-1 ml-1.5 font-DanaMedium text-xs h-5 rounded-full pr-2.5 pl-2 bg-orange-200/20 text-orange-300">
                  مطالعه
                  <Icons.ArrowLeftMini />
                </Link>
              </div>
            </div>
          </div>
          <div className="group flex sm:block gap-x-2.5 p-2.5 md:pb-2 bg-white dark:bg-zinc-700 shadow-normal rounded-2xl">
            <Link href={"/articles/turkishcoffee"}>
              <div className="relative sm:mb-4 rounded-2xl rounded-bl-4xl shrink-0 overflow-hidden w-[130px] h-[130px] sm:w-auto sm:h-auto">
                <img
                  src="/images/blogs/blog-1.png"
                  className="h-full sm:h-auto object-cover"
                  alt="Blog 1"
                />
                <div className="absolute inset-0 w-full h-full hidden md:flex-center invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all delay-100 bg-gradient-to-r from bg-orange-200/70 to-orange-300/70">
                  <Icons.MobileLogoBlogs />
                </div>
              </div>
            </Link>
            <div className="w-full flex flex-col sm:flex-row items-start justify-between">
              <Link
                href={"/articles/turkishcoffee"}
                className="ml-1.5 md:ml-0 font-DanaMedium md:font-Dana text-sm/7 md:text-lg line-clamp-2 max-w-[193px] text-zinc-700 dark:text-white">
                قهوه ترک و فوت های کوزه گری آن
              </Link>
              {/* <!-- desktop --> */}
              <div className="hidden sm:flex gap-3">
                <span className="block w-px h-[61px] bg-gray-100 dark:bg-white/10"></span>
                <div className="flex flex-col -mt-1 ml-[18px] text-teal-600 dark:text-emerald-500 text-sm text-left">
                  <span className="font-Dana font-semibold text-2xl">3</span>
                  <span>بهمن</span>
                  <span>1403</span>
                </div>
              </div>
              {/* <!-- mobile --> */}
              <div className="flex items-end justify-between w-full sm:hidden border-t border-t-gray-100 dark:border-t-white/10 pb-1.5 pt-[18px]">
                <div className="flex items-center gap-x-1 text-teal-600 dark:text-emerald-500">
                  <span className="font-Dana font-semibold">3</span>
                  <span>بهمن</span>
                  <span>1403</span>
                </div>
                <Link
                  href={"/articles/turkishcoffee"}
                  className="flex items-center gap-x-1 ml-1.5 font-DanaMedium text-xs h-5 rounded-full pr-2.5 pl-2 bg-orange-200/20 text-orange-300">
                  مطالعه
                  <Icons.ArrowLeftMini />
                </Link>
              </div>
            </div>
          </div>
          <div className="group flex sm:block gap-x-2.5 p-2.5 md:pb-2 bg-white dark:bg-zinc-700 shadow-normal rounded-2xl">
            <Link href={"/articles/americano"}>
              <div className="relative sm:mb-4 rounded-2xl rounded-bl-4xl shrink-0 overflow-hidden w-[130px] h-[130px] sm:w-auto sm:h-auto">
                <img
                  src="/images/blogs/blog-1.png"
                  className="h-full sm:h-auto object-cover"
                  alt="Blog 1"
                />
                <div className="absolute inset-0 w-full h-full hidden md:flex-center invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all delay-100 bg-gradient-to-r from bg-orange-200/70 to-orange-300/70">
                  <Icons.MobileLogoBlogs />
                </div>
              </div>
            </Link>
            <div className="w-full flex flex-col sm:flex-row items-start justify-between">
              <Link
                href={"/articles/americano"}
                className="ml-1.5 md:ml-0 font-DanaMedium md:font-Dana text-sm/7 md:text-lg line-clamp-2 max-w-[193px] text-zinc-700 dark:text-white">
                قهوه با استایل آمریکایی
              </Link>
              {/* <!-- desktop --> */}
              <div className="hidden sm:flex gap-3">
                <span className="block w-px h-[61px] bg-gray-100 dark:bg-white/10"></span>
                <div className="flex flex-col -mt-1 ml-[18px] text-teal-600 dark:text-emerald-500 text-sm text-left">
                  <span className="font-Dana font-semibold text-2xl">13</span>
                  <span>آبان</span>
                  <span>1403</span>
                </div>
              </div>
              {/* <!-- mobile --> */}
              <div className="flex items-end justify-between w-full sm:hidden border-t border-t-gray-100 dark:border-t-white/10 pb-1.5 pt-[18px]">
                <div className="flex items-center gap-x-1 text-teal-600 dark:text-emerald-500">
                  <span className="font-Dana font-semibold">13</span>
                  <span>آبان</span>
                  <span>1403</span>
                </div>
                <Link
                  href={"/articles/americano"}
                  className="flex items-center gap-x-1 ml-1.5 font-DanaMedium text-xs h-5 rounded-full pr-2.5 pl-2 bg-orange-200/20 text-orange-300">
                  مطالعه
                  <Icons.ArrowLeftMini />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
