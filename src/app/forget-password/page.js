import React from "react";
import Link from "next/link";

const ForgotPassword = () => {
  return (
    <>
      <div className="flex flex-col-reverse relative lg:flex-row h-screen overflow-hidden w-full bg-custom-gradient">
        <div
          data-aos="fade-up"
          className="absolute inset-0 lg:relative lg:w-1/2 lg:h-full flex flex-col justify-center items-center z-10 m-auto">
          <div className="grid w-[55%] max-w-[600px] min-w-[300px] bg-white py-2.5 px-5 m-auto rounded-md shadow-login text-center text-black">
            <input
              className="p-2 lg:p-3 bg-white text-black rounded-md border border-gray-400 mt-5 outline-brown-300 "
              type="text"
              placeholder="ایمیل / شماره موبایل"
            />
            <button className="p-2.5 lg:p-3.5 cursor-pointer bg-brown-900 text-white rounded-md mt-3">
              بازنشانی رمزعبور
            </button>
            <Link
              href={"/login-register"}
              className="text-sm cursor-pointer text-center my-4">
              برگشت به ورود
            </Link>
          </div>
          <Link
            href={"/login-register"}
            className="block w-max my-0 mx-auto cursor-pointer text-sm text-brown-900">
            لغو
          </Link>
        </div>
        <section className="relative w-full h-full lg:w-1/2">
          <img
            className="hidden lg:block object-cover w-full h-full xxl:object-contain"
            src="../images/login-register-img.jpg"
            alt=""
          />
          <img
            className="lg:hidden object-cover w-full h-full xxl:object-contain"
            src="../images/login-register-mobile.jpg"
            alt=""
          />
        </section>
      </div>
    </>
  );
};

export default ForgotPassword;
