import { useState } from "react";
import Sms from "./Sms";
import { showSwal } from "@/utils/helpers";
import { validateEmail, validatePassword, validatePhone } from "@/utils/auth";
import Link from "next/link";
import axios from "axios"; 

const Register = ({ showloginForm }) => {
  const [isRegisterWithPass, setIsRegisterWithPass] = useState(false);
  const [isRegisterWithOtp, setIsRegisterWithOtp] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 

  const hideOtpForm = () => setIsRegisterWithOtp(false);

  const resetFields = () => {
    setName("");
    setPhone("");
    setEmail("");
    setPassword("");
  };

  const signUp = async () => {
    if (!name.trim()) {
      return showSwal("نام را وارد بکنید", "error", "تلاش مجدد");
    }

    const isValidPhone = validatePhone(phone);
    if (!isValidPhone) {
      return showSwal("شماره تماس وارد شده معتبر نیست", "error", "تلاش مجدد");
    }

     if (email) {
       const isValidEmail = validateEmail(email);
       if (!isValidEmail) {
         return showSwal("ایمیل وارد شده معتبر نیست", "error", "تلاش مجدد ");
       }
     }

    const isValidPassword = validatePassword(password);
    if (!isValidPassword) {
      return showSwal("پسورد وارد شده قابل حدس هست", "error", "تلاش مجدد ");
    }

    const user = { name, phone, email, password };

    try {
      setLoading(true);
      const res = await axios.post("/api/auth/signup", user, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 201) {
        showSwal("ثبت نام با موفقیت انجام شد", "success", "ورود به پنل کاربری");
        resetFields(); 
      }
    } catch (error) {
      if (error.response?.status === 422) {
        showSwal(
          "کاربری با این اطلاعات از قبل وجود دارد",
          "error",
          "تلاش مجدد"
        );
      } else {
        showSwal("خطایی در سرور رخ داده است", "error", "تلاش مجدد");
      }
    } finally {
      setLoading(false); 
    }
  };

  return (
    <>
      {!isRegisterWithOtp ? (
        <div className="grid w-[55%] max-w-[600px] min-w-[300px] bg-white py-2.5 px-[25px] mt-[7rem] mx-auto mb-3 lg:mb-[1rem] rounded-md shadow-login text-center text-black">
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            className="p-2 lg:p-3 bg-white text-black rounded mt-5 outline-brown-300 border border-gray-400"
            type="text"
            placeholder="نام"
            disabled={loading}
          />
          <input
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="p-2 lg:p-3 bg-white text-black rounded mt-5 outline-brown-300 border border-gray-400"
            type="text"
            placeholder="شماره موبایل"
            disabled={loading}
          />
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="p-2 lg:p-3 bg-white text-black rounded-md border border-gray-400 mt-5 outline-brown-300"
            type="email"
            placeholder="ایمیل (دلخواه)"
            disabled={loading}
          />
          {isRegisterWithPass && (
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="p-2 lg:p-3 bg-white text-black rounded-md border border-gray-400 mt-5 outline-brown-300"
              type="password"
              placeholder="رمز عبور"
              disabled={loading}
            />
          )}
          <button
            onClick={() => {
              if (isRegisterWithPass) {
                signUp();
              } else {
                setIsRegisterWithPass(true);
              }
            }}
            className="p-2.5 lg:p-3.5 cursor-pointer bg-brown-900 text-white rounded-md mt-3"
            disabled={loading}>
            {loading ? "در حال ثبت‌نام..." : "ثبت نام با رمزعبور"}
          </button>
          <p
            onClick={() => setIsRegisterWithOtp(true)}
            className="p-2.5 lg:p-3.5 cursor-pointer bg-brown-900 text-white rounded-md mt-4">
            ثبت نام با کد تایید
          </p>
          <p
            onClick={showloginForm}
            className="text-sm text-center my-3 cursor-pointer py-1">
            برگشت به ورود
          </p>
          <Link
            href="/"
            className="block w-max my-0 mx-auto cursor-pointer text-sm text-brown-900">
            لغو
          </Link>
        </div>
      ) : (
        <Sms hideOtpForm={hideOtpForm} />
      )}
    </>
  );
};

export default Register;
