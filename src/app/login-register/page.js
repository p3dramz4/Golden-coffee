"use client";
import { useState } from "react";
import { authTypes } from "@/utils/constants";
import Login from "@/components/templates/login-register/Login";
import Register from "@/components/templates/login-register/Register";

const login_register = () => {
  const [authType, setAuthType] = useState(authTypes.LOGIN);

  const showRegisterForm = () => setAuthType(authTypes.REGISTER);
  const showloginForm = () => setAuthType(authTypes.LOGIN);

  return (
    <div className="font-DanaMedium flex flex-col-reverse relative lg:flex-row h-screen overflow-hidden w-full bg-custom-gradient">
      <div
        className="absolute inset-0 lg:relative lg:w-1/2 lg:h-full flex flex-col justify-center items-center z-10 m-auto"
        data-aos="fade-up">
        {authType === authTypes.LOGIN ? (
          <Login showRegisterForm={showRegisterForm} />
        ) : (
          <Register showloginForm={showloginForm} />
        )}
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
  );
};

export default login_register;
