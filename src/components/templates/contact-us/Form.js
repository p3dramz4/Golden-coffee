"use client";
import { useState } from "react";
import { showSwal } from "@/utils/helpers";

const Form = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const submitMessage = async event => {
    event.preventDefault();

    const contact = {
      name,
      email,
      phone,
      company,
      message,
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });

    if (res.status === 201) {
      setEmail("");
      setName("");
      setCompany("");
      setPhone("");
      setMessage("");
      showSwal("پیغام شما با موفقیت ثبت شد", "success", "فهمیدم");
    }
    console.log("Res ->", res);
  };

  return (
    <form className="text-zinc-700 dark:text-gray-200">
      <span className="text-gray-500 text-[14px]">فرم تماس با ما</span>
      <p className="text-[22px] mt-4 mb-8">
        برای تماس با ما می توانید فرم زیر را تکمیل کنید
      </p>
      <div className="flex gap-[15px]">
        <div className="flex flex-col w-full mb-[14px] gap-[7px]">
          <label>نام و نام خانوادگی</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="shadow-md outline-none border-none bg-white w-full text-[16px] rounded-[5px] text-black resize-none p-[0.8rem_1rem] border border-[rgba(0,0,0,0.199)]"
          />
        </div>
        <div className="flex flex-col w-full mb-[14px] gap-[7px]">
          <label>آدرس ایمیل</label>
          <input
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="shadow-md outline-none border-none bg-white w-full text-[16px] rounded-[5px] text-black resize-none p-[0.8rem_1rem] border border-[rgba(0,0,0,0.199)]"
          />
        </div>
      </div>
      <div className="flex gap-[15px]">
        <div className="flex flex-col w-full mb-[14px] gap-[7px]">
          <label>شماره تماس</label>
          <input
            type="text"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="shadow-md outline-none border-none bg-white w-full text-[16px] rounded-[5px] text-black resize-none p-[0.8rem_1rem] border border-[rgba(0,0,0,0.199)]"
          />
        </div>
        <div className="flex flex-col w-full mb-[14px] gap-[7px]">
          <label>نام شرکت</label>
          <input
            type="text"
            value={company}
            onChange={e => setCompany(e.target.value)}
            className="shadow-md outline-none border-none bg-white w-full text-[16px] rounded-[5px] text-black resize-none p-[0.8rem_1rem] border border-[rgba(0,0,0,0.199)]"
          />
        </div>
      </div>
      <div className="flex flex-col mb-[14px] gap-[7px]">
        <label>درخواست شما</label>
        <textarea
          name=""
          id=""
          cols="30"
          rows="5"
          className="shadow-md outline-none border-none bg-white w-full text-[16px] rounded-[5px] text-black resize-none p-[0.8rem_1rem] border border-[rgba(0,0,0,0.199)]"></textarea>
      </div>
      <button
        onClick={submitMessage}
        className="p-[12px_20px] text-[13px] leading-[18px] rounded-[4px] bg-[#008979] text-white inline-flex items-center justify-center w-full font-semibold uppercase transition-colors duration-200 ease-in-out hover:bg-[#34180e] hover:text-white">
        ارسال
      </button>
    </form>
  );
};

export default Form;
