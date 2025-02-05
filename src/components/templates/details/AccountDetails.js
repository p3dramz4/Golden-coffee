"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

function AccountDetails() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (res.ok) {
          setName(data.name || "");
          setEmail(data.email || "");
          setPhone(data.phone || "");
        }
      } catch (error) {
        console.error("خطا در دریافت اطلاعات کاربر:", error);
      }
    };
    getUser();
  }, []);

  const updateUser = async () => {
    const userNewInfos = { name, email, phone };

    const res = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userNewInfos),
    });

    if (res.ok) {
      Swal.fire("اطلاعات با موفقیت به‌روز شد!", "", "success").then(
        async () => {
          await fetch("/api/auth/signout", { method: "POST" });
          router.push("/login-register");
        }
      );
    }
  };

  const handlePasswordChange = async () => {
    if (!password) {
      Swal.fire("لطفا رمز جدید را وارد کنید!", "", "warning");
      return;
    }

    const res = await fetch("/api/user/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      Swal.fire("رمز عبور تغییر کرد!", "", "success");
      setPassword("");
    } else {
      Swal.fire("مشکلی پیش آمد!", "لطفا دوباره تلاش کنید", "error");
    }
  };

  return (
    <main className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-semibold text-center border-b pb-4">
        جزئیات اکانت
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <section className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-700 font-medium">
              نام کاربری
            </label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              type="text"
              className="w-full p-3 mt-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">ایمیل</label>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="text"
              className="w-full p-3 mt-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">
              شماره تماس
            </label>
            <input
              value={phone}
              onChange={e => setPhone(e.target.value)}
              type="number"
              className="w-full p-3 mt-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none"
            />
          </div>
        </section>

        <section className="flex flex-col items-center gap-6">
          <img
            src="/images/unknown.jpg"
            alt="Profile"
            className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-red-600"
          />
          <div className="w-full">
            <label className="block text-gray-700 font-medium">رمز عبور</label>
            <div className="flex gap-3">
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full h-10 border rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none"
              />
              <button
                onClick={handlePasswordChange}
                className="bg-red-600 text-white h-10 w-1/3 rounded-lg">
                تغییر رمز
              </button>
            </div>
          </div>
        </section>
      </div>

      <button
        onClick={updateUser}
        className="block w-full md:w-1/3 mx-auto bg-red-600 text-white text-lg p-3 rounded-lg mt-8 hover:bg-red-700 transition">
        ثبت تغییرات
      </button>
    </main>
  );
}

export default AccountDetails;
