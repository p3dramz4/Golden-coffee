"use client";
import { useState, useEffect } from "react";
import { IoIosSearch, IoIosNotifications } from "react-icons/io";
import Modal from "./Modal";

const Topbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);

  const hideModal = () => setShowModal(false);

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

  if (!user) {
    return <div>در حال بارگذاری...</div>;
  }

  return (
    <>
      <div className="w-full bg-[#111] h-[70px] px-5 flex justify-between items-center text-white border-b-4 border-[#711d1c]">
        <div className="flex items-center gap-3 flex-row-reverse">
          <div>
            <p>{user.name}</p>
            <span className="text-sm text-gray-500">
              {user.role === "ADMIN"
                ? "ادمین"
                : user.role === "USER"
                ? "کاربر"
                : "ناشناس"}
            </span>
          </div>
          <img
            src="/images/unknown.jpg"
            alt="User Profile"
            className="w-[50px] rounded-full"
          />
        </div>

        <section className="flex items-center gap-5">
          <div className="relative">
            <input
              type="text"
              placeholder="جستجو کنید"
              className="bg-white px-4 py-2 rounded-full w-[300px] focus:outline-none"
            />
            <div className="bg-[#711d1c] text-white absolute left-2 top-[6px] flex items-center justify-center h-[30px] w-[30px] text-xl rounded-full cursor-pointer">
              <IoIosSearch />
            </div>
          </div>

          <div
            onClick={() => setShowNotifications(true)}
            className="relative bg-[#711d1c] text-white flex items-center h-[34px] px-2 text-xl cursor-pointer rounded-[20%]">
            <IoIosNotifications />
            <span className="absolute -top-1 -right-1 bg-white text-[#711d1c] text-[9px] px-1 w-5 h-5 text-center rounded-full">
              0
            </span>
          </div>
        </section>
      </div>

      {showNotifications && (
        <div>
          <div
            onClick={() => setShowNotifications(false)}
            className="fixed w-full h-screen top-0 right-0 bg-black/40 z-50"></div>
          <section className="absolute top-[50px] left-[50px] bg-[#711d1c] w-[300px] rounded-lg p-4 text-white flex flex-col gap-3 z-[9999]">
            <div className="flex justify-between items-center w-full">
              <p
                onClick={() => {
                  setShowNotifications(false);
                  setShowModal(true);
                }}
                className="cursor-pointer">
                سلام ادمین محترم
              </p>
              <button
                onClick={() => setShowNotifications(false)}
                className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer">
                دیدم
              </button>
            </div>
            <div className="flex justify-between items-center w-full">
              <p
                onClick={() => {
                  setShowNotifications(false);
                  setShowModal(true);
                }}
                className="cursor-pointer">
                سلام ادمین محترم
              </p>
              <button
                onClick={() => setShowNotifications(false)}
                className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer">
                دیدم
              </button>
            </div>
          </section>
        </div>
      )}

      {showModal && (
        <Modal title="از واحد پشتیبانی" hideModal={hideModal}>
          <p className="mt-12 mb-12 text-center">عالی هستی ادمین عزیز</p>
        </Modal>
      )}
    </>
  );
};

export default Topbar;
