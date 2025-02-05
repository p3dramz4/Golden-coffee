import React, { useState } from "react";
import Link from "next/link";
import styles from "./login.module.css";
import Sms from "./Sms";
import { showSwal } from "@/utils/helpers";
import Swal from "sweetalert2";
import { validateEmail, validatePassword } from "@/utils/auth";
import axios from "axios";
import { useRouter } from "next/navigation";

const Login = ({ showRegisterForm }) => {
  const [isLoginWithOtp, setIsLoginWithOtp] = useState(false);
  const [password, setPassword] = useState("");
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const hideOtpForm = () => setIsLoginWithOtp(false);
  const router = useRouter()

  const resetFields = () => {
    setPhoneOrEmail("");
    setPassword("");
  };

  const handleResponseStatus = status => {
    switch (status) {
      case 200:
        Swal.fire({
          title: "با موفقیت لاگین شدین",
          icon: "success",
          confirmButtonText: "ورود به صفحه اصلی",
        }).then(() => router.replace("/"));

        break;
      case 401:
        showSwal("ایمیل یا پسورد صحیح نیست", "error", "تلاش مجدد");
        break;
      case 422:
        showSwal("کاربری با این اطلاعات یافت نشد", "error", "تلاش مجدد");
        break;
      case 419:
        showSwal("توکن منقضی شده یا نامعتبر است", "error", "تلاش مجدد");
        break;
      default:
        showSwal("خطایی در سرور رخ داده است", "error", "تلاش مجدد");
        break;
    }
  };

  const loginWithPassword = async () => {
    if (!phoneOrEmail) {
      return showSwal("لطفا شماره تماس یا ایمیل را وارد کنید", "error", "باشه");
    }

    const isValidEmail = validateEmail(phoneOrEmail);
    const isValidPhone = phoneOrEmail.length >= 10 && !isNaN(phoneOrEmail); 

    if (!isValidEmail && !isValidPhone) {
      return showSwal(
        "لطفا ایمیل یا شماره تلفن معتبر وارد کنید",
        "error",
        "تلاش مجدد"
      );
    }

    if (!password) {
      return showSwal("پسورد را وارد کنید", "error", "تلاش مجدد");
    }

    const isValidPassword = validatePassword(password);
    if (!isValidPassword) {
      return showSwal("لطفا پسورد مرغوب تری وارد کنید", "error", "تلاش مجدد");
    }

    const user = {
      email: isValidEmail ? phoneOrEmail : undefined,
      phone: isValidPhone ? phoneOrEmail : undefined,
      password,
    };

    try {
      setLoading(true);
      const res = await axios.post("/api/auth/signin", user, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      handleResponseStatus(res.status); 
    } catch (error) {
      console.error("Error ->", error);

      if (error.response?.status) {
        handleResponseStatus(error.response.status); 
      } else {
        showSwal("خطایی در سرور رخ داده است", "error", "تلاش مجدد");
      }
    } finally {
      setLoading(false);
      resetFields(); 
    }
  };

  return (
    <>
      {!isLoginWithOtp ? (
        <div
          autoComplete="off"
          className="grid w-[55%] max-w-[600px] min-w-[300px] bg-white py-2.5 px-[25px] mt-[7rem] mx-auto mb-3 lg:mb-[1rem] rounded-md shadow-login text-center text-black">
          <input
            className="p-2 lg:p-3 bg-white text-black rounded mt-5 outline-brown-300 border border-gray-400"
            type="text"
            value={phoneOrEmail}
            onChange={e => setPhoneOrEmail(e.target.value)}
            placeholder="ایمیل/شماره موبایل"
          />
          <input
            className="p-2 lg:p-3 bg-white text-black rounded-md border border-gray-400 mt-5 outline-brown-300"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="رمز عبور"
          />
          <div
            className={`flex mt-5 mx-0 mb-2.5 justify-start items-center gap-1 lg:gap-[6px] ${styles.checkbox}`}>
            <input
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded-md webkit-none outline-none"
            />
            <p className="text-sm">مرا به یاد داشته باش</p>
          </div>
          <button
            className="p-2.5 lg:p-3.5 cursor-pointer bg-brown-900 text-white rounded-md"
            onClick={loginWithPassword}
            disabled={loading}>
            {loading ? "در حال ورود..." : "ورود"}
          </button>
          <Link
            href={"/forget-password"}
            className="text-sm my-4 mx-0 cursor-pointer">
            رمز عبور را فراموش کرده اید؟
          </Link>
          <button
            onClick={() => setIsLoginWithOtp(true)}
            className="p-2.5 lg:p-3.5 cursor-pointer bg-brown-900 text-white rounded-md">
            ورود با کد یکبار مصرف
          </button>
          <span className="text-start mt-4 mb-2 lg:mt-7 lg:mb-5 text-sm">
            ایا حساب کاربری ندارید؟
          </span>
          <button
            onClick={showRegisterForm}
            className="text-gray-500 border border-gray-300 mb-3 lg:mb-12 cursor-pointer p-2.5 lg:p-4 bg-slate-100 rounded-md">
            ثبت نام
          </button>
        </div>
      ) : (
        <Sms hideOtpForm={hideOtpForm} />
      )}
      <Link
        href={"/"}
        className="w-max my-0 mx-auto cursor-pointer text-sm text-brown-100 lg:text-black">
        لغو
      </Link>
    </>
  );
};

export default Login;
