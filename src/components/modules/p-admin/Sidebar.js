"use client";
import { useState, useEffect } from "react";
import { ImReply } from "react-icons/im";
import { FaComments, FaHeart, FaShoppingBag, FaUsers } from "react-icons/fa";
import { MdOutlineAttachMoney, MdSms, MdLogout } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import { TbListDetails } from "react-icons/tb";
import Link from "next/link";
import Swal from "sweetalert2";

const Sidebar = () => {
  const path = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (res.ok) {
          setUser(data);
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
        const res = await fetch("/api/auth/signout", { method: "POST" });

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
    return <div className="text-center text-white">در حال بارگذاری...</div>;
  }

  return (
    <aside className="w-[350px] h-screen bg-[#3e2723] text-[#f1e0c5] p-5 sticky top-0 flex flex-col shadow-lg">
      <div className="text-center mt-2 pb-6 border-b border-[#c7a17a]">
        <p className="text-lg font-semibold">خوش اومدی {user.name} عزیز ☕</p>
      </div>

      <ul className="flex flex-col gap-6 py-6">
        {path.includes("/p-user") ? (
          <>
            <Link
              href="/p-user"
              className={`flex items-center gap-3 text-lg px-4 py-3 rounded-lg transition ${
                path === "/p-user"
                  ? "bg-[#6d4c41] text-[#fff] shadow-md"
                  : "hover:bg-[#5d4037] hover:text-white"
              }`}>
              <ImReply />
              پیشخوان
            </Link>
            <Link
              href="/p-user/orders"
              className="flex items-center gap-3 text-lg px-4 py-3 rounded-lg hover:bg-[#5d4037] transition">
              <FaShoppingBag />
              سفارش‌ها
            </Link>
            <Link
              href="/p-user/tickets"
              className="flex items-center gap-3 text-lg px-4 py-3 rounded-lg hover:bg-[#5d4037] transition">
              <MdSms />
              تیکت‌های پشتیبانی
            </Link>
            <Link
              href="/p-user/comments"
              className="flex items-center gap-3 text-lg px-4 py-3 rounded-lg hover:bg-[#5d4037] transition">
              <FaComments />
              کامنت‌ها
            </Link>
            <Link
              href="/p-user/wishlist"
              className="flex items-center gap-3 text-lg px-4 py-3 rounded-lg hover:bg-[#5d4037] transition">
              <FaHeart />
              علاقه‌مندی‌ها
            </Link>
            <Link
              href="/p-user/account-details"
              className="flex items-center gap-3 text-lg px-4 py-3 rounded-lg hover:bg-[#5d4037] transition">
              <TbListDetails />
              جزئیات اکانت
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/p-admin"
              className={`flex items-center gap-3 text-lg px-4 py-3 rounded-lg transition ${
                path === "/p-admin"
                  ? "bg-[#6d4c41] text-[#fff] shadow-md"
                  : "hover:bg-[#5d4037] hover:text-white"
              }`}>
              <ImReply />
              پیشخوان
            </Link>
            <Link
              href="/p-admin/products"
              className="flex items-center gap-3 text-lg px-4 py-3 rounded-lg hover:bg-[#5d4037] transition">
              <FaShoppingBag />
              محصولات
            </Link>
            <Link
              href="/p-admin/users"
              className="flex items-center gap-3 text-lg px-4 py-3 rounded-lg hover:bg-[#5d4037] transition">
              <FaUsers />
              کاربران
            </Link>
            <Link
              href="/p-admin/comments"
              className="flex items-center gap-3 text-lg px-4 py-3 rounded-lg hover:bg-[#5d4037] transition">
              <FaComments />
              کامنت‌ها
            </Link>
            <Link
              href="/p-admin/tickets"
              className="flex items-center gap-3 text-lg px-4 py-3 rounded-lg hover:bg-[#5d4037] transition">
              <MdSms />
              تیکت‌ها
            </Link>
            <Link
              href="/p-admin/discount"
              className="flex items-center gap-3 text-lg px-4 py-3 rounded-lg hover:bg-[#5d4037] transition">
              <MdOutlineAttachMoney />
              تخفیفات
            </Link>
          </>
        )}
      </ul>

      <div
        onClick={logoutHandler}
        className="flex items-center justify-between text-lg border-t-2 border-[#c7a17a] cursor-pointer mt-auto pt-4 px-4 transition hover:bg-[#5d4037] hover:text-white rounded-lg">
        <MdLogout />
        خروج
      </div>
    </aside>
  );
};

export default Sidebar;
