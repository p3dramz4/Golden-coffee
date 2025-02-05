const Sms = ({hideOtpForm}) => {
  return (
    <>
      <div className="grid w-[55%] max-w-[600px] min-w-[300px] bg-white py-2.5 px-[25px] mt-[7rem] mx-auto mb-3 lg:mb-[1rem] rounded-md shadow-login text-center text-black">
        <p className="py-1">کد تایید</p>
        <span className="text-sm mt-4.5 text-gray-800 opacity-60 whitespace-nowrap">
          لطفاً کد تأیید ارسال شده را تایپ کنید
        </span>
        <span className="text-sm mt-2 text-gray-800 opacity-60 whitespace-nowrap">
          09106163341
        </span>
        <input
          className="p-2 lg:p-3 bg-white text-black rounded-md border border-gray-400 mt-5 outline-brown-300"
          type="text"
        />
        <button className="p-2.5 lg:p-3.5 cursor-pointer bg-brown-900 text-white rounded-md mt-4">
          ثبت کد تایید
        </button>
        <p className="text-sm py-3 cursor-pointer opacity-60 whitespace-nowrap">
          ارسال مجدد کد یکبار مصرف
        </p>
      </div>
      <p
        onClick={hideOtpForm}
        className="block w-max my-0 mx-auto cursor-pointer text-sm text-white lg:text-black">
        لغو
      </p>
    </>
  );
};

export default Sms;
