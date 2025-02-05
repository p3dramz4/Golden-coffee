const Comment = () => {
  return (
    <div className="mt-12 text-zinc-700 dark:text-gray-100">
      <p className="font-extrabold text-[22px] mt-12 mb-5">
        دیدگاهتان را بنویسید
      </p>
      <p className="rtl">
        نشانی ایمیل شما منتشر نخواهد شد. بخش‌های موردنیاز علامت‌گذاری شده‌اند{" "}
        <span className="text-red-500">*</span>
      </p>
      <div className="flex flex-col gap-[3px] mt-4">
        <label className="rtl">
          دیدگاه <span className="text-red-500">*</span>
        </label>
        <textarea
          className="resize-none w-full border-[1px] border-gray-400 rounded-[5px] bg-white text-black rtl"
          cols="30"
          rows="10"></textarea>
      </div>
      <div className="flex gap-[20px] w-full mt-4">
        <div className="flex flex-col gap-[3px] w-full">
          <label className="rtl">وب‌سایت</label>
          <input
            type="text"
            className="px-4 py-3 rtl bg-white border-[1px] border-gray-400 rounded-[5px] text-black"
          />
        </div>
        <div className="flex flex-col gap-[3px] w-full">
          <label className="rtl">
            ایمیل <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            className="px-4 py-3 rtl bg-white border-[1px] border-gray-400 rounded-[5px] text-black"
          />
        </div>
        <div className="flex flex-col gap-[3px] w-full">
          <label className="rtl">
            دیدگاه <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="px-4 py-3 rtl bg-white border-[1px] border-gray-400 rounded-[5px] text-black"
          />
        </div>
      </div>
      <div className="flex gap-[10px] flex-row-reverse items-center mt-5">
        <input
          type="checkbox"
          className="w-4 h-4 border-[1px] border-gray-300 rounded-[1px] appearance-none checked:bg-[#34180E] checked:border-[#34180E] focus:ring-[3px] focus:ring-gray-200"
        />
        <p className="rtl">
          ذخیره نام، ایمیل و وبسایت من در مرورگر برای زمانی که دوباره دیدگاهی
          می‌نویسم.
        </p>
      </div>
      <button className="px-5 py-3 text-[13px] leading-[18px] bg-[#008979] text-white mt-5 rounded-[5px] font-semibold uppercase transition-all duration-200 hover:bg-[#711D1C]">
        ارسال دیدگاه
      </button>
    </div>
  );
};

export default Comment;
