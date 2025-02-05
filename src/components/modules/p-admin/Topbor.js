"use client";
import { useState, useEffect } from "react";
import { IoIosNotifications } from "react-icons/io";

const Topbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
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

    fetchUser();
  }, []);

  if (!user) {
    return (
      <div className="text-white text-center py-4">در حال بارگذاری...</div>
    );
  }

  return (
    <div className="w-full bg-stone-800 h-[82px] px-6 flex justify-between items-center border-b-2 border-[#b8860b] text-white shadow-lg">
      {/* پروفایل کاربر */}
      <div className="flex items-center gap-4 flex-row-reverse">
        <div className="relative w-[55px] h-[55px] rounded-full bg-[#b8860b] p-1">
          <img
            src={user.image || "/images/unknown.jpg"}
            alt="User Profile"
            className="w-full h-full rounded-full object-cover shadow-xl border-2 border-[#b8860b] backdrop-blur-md"
          />
        </div>
        <div>
          <p className="text-lg font-bold">{user.name}</p>
          <span className="text-sm text-[#b8860b]">
            {user.role === "ADMIN" ? "مدیر کافه" : "کاربر عزیز"}
          </span>
        </div>
      </div>

      {/* نوتیفیکیشن */}
      <div className="relative cursor-pointer">
        <IoIosNotifications className="text-3xl transition-all duration-200 hover:text-[#b8860b] hover:scale-110" />
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full shadow-md animate-pulse">
          3
        </span>
      </div>
    </div>
  );
};

export default Topbar;
