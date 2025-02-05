"use client";
import { useState, useEffect } from "react";
import { ImReply } from "react-icons/im";
import { FaComments, FaHeart, FaShoppingBag, FaUsers } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import { MdSms, MdLogout } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import { TbListDetails } from "react-icons/tb";
import Link from "next/link";
import Swal from "sweetalert2";

const Sidebar = () => {
  const path = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);

  // گرفتن اطلاعات کاربر
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (res.ok) {
          setUser(data); // ذخیره داده‌های کاربر در state
        }
      } catch (error) {
        console.error("خطا در دریافت اطلاعات کاربر:", error);
      }
    };

    getUser();
  }, []);

  const logoutHandler = () => {
    Swal.fire({
      title: "آیا از خروج اطمینان دارید؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "آره",
      cancelButtonText: "نه",
    }).then(async result => {
      if (result.isConfirmed) {
        const res = await fetch("/api/auth/signout", {
          method: "POST",
        });

        if (res.status === 200) {
          Swal.fire({
            title: "با موفقیت از اکانت خارج شدین",
            icon: "success",
            confirmButtonText: "فهمیدم",
          }).then(() => {
            router.replace("/");
          });
        }
      }
    });
  };

  if (!user) {
    return <div>در حال بارگذاری...</div>; // صفحه لودینگ وقتی اطلاعات کاربر در حال بارگذاری است
  }

  return (
    <aside className="w-[350px] h-screen bg-[#711d1c] text-white p-4 sticky top-0 flex flex-col">
      {/* هدر سایدبار */}
      <div className="text-center mt-2 pb-6 border-b border-white">
        <p>خوش اومدی {user.name} عزیز</p>
      </div>

      {/* لینک‌های اصلی سایدبار */}
      <ul className="flex flex-col gap-8 py-8">
        {path.includes("/p-user") ? (
          <>
            <Link
              href="/p-user"
              className={`flex items-center gap-3 text-lg ${
                path === "/p-user" ? "opacity-100" : "opacity-70"
              }`}>
              <ImReply />
              پیشخوان
            </Link>
            <Link
              href="/p-user/orders"
              className="flex items-center gap-3 text-lg opacity-70">
              <FaShoppingBag />
              سفارش‌ها
            </Link>
            <Link
              href="/p-user/tickets"
              className="flex items-center gap-3 text-lg opacity-70">
              <MdSms />
              تیکت‌های پشتیبانی
            </Link>
            <Link
              href="/p-user/comments"
              className="flex items-center gap-3 text-lg opacity-70">
              <FaComments />
              کامنت‌ها
            </Link>
            <Link
              href="/p-user/wishlist"
              className="flex items-center gap-3 text-lg opacity-70">
              <FaHeart />
              علاقه‌مندی‌ها
            </Link>
            <Link
              href="/p-user/account-details"
              className="flex items-center gap-3 text-lg opacity-70">
              <TbListDetails />
              جزئیات اکانت
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/p-admin"
              className={`flex items-center gap-3 text-lg ${
                path === "/p-admin" ? "opacity-100" : "opacity-70"
              }`}>
              <ImReply />
              پیشخوان
            </Link>
            <Link
              href="/p-admin/products"
              className="flex items-center gap-3 text-lg opacity-70">
              <FaShoppingBag />
              محصولات
            </Link>
            <Link
              href="/p-admin/users"
              className="flex items-center gap-3 text-lg opacity-70">
              <FaUsers />
              کاربران
            </Link>
            <Link
              href="/p-admin/comments"
              className="flex items-center gap-3 text-lg opacity-70">
              <FaComments />
              کامنت‌ها
            </Link>
            <Link
              href="/p-admin/tickets"
              className="flex items-center gap-3 text-lg opacity-70">
              <MdSms />
              تیکت‌ها
            </Link>
            <Link
              href="/p-admin/discount"
              className="flex items-center gap-3 text-lg opacity-70">
              <MdOutlineAttachMoney />
              تخفیفات
            </Link>
          </>
        )}
      </ul>

      {/* دکمه خروج */}
      <div
        onClick={logoutHandler}
        className="flex items-center justify-between mt-auto py-3 text-xl border-t-2 border-white cursor-pointer">
        <MdLogout />
        خروج
      </div>
    </aside>
  );
};

export default Sidebar;
