import { IoMdStar } from "react-icons/io";
import { useEffect, useState } from "react";
import { showSwal } from "@/utils/helpers";

const CommentForm = ({ productID }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [score, setScore] = useState(5);
  const [isSaveUserInfo, setIsSaveUserInfo] = useState(false);

  useEffect(() => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo) {
        setUsername(userInfo?.username || "");
        setEmail(userInfo?.email || "");
      }
    } catch (error) {
      console.error("Error parsing userInfo from localStorage:", error);
      setUsername("");
      setEmail("");
    }
  }, []);

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const setCommentScore = score => {
    setScore(score);
  };

  const submitComment = async () => {
    if (isSaveUserInfo) {
      const userInfo = {
        username,
        email,
      };
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }

    if (username.length < 3) {
      showSwal("نام باید حداقل ۳ حرف باشد", "error", "فهمیدم");
      return;
    }

    if (!validateEmail(email)) {
      showSwal("لطفاً یک ایمیل معتبر وارد کنید", "error", "فهمیدم");
      return;
    }

    if (body.length < 4) {
      showSwal("متن دیدگاه باید حداقل ۴ حرف باشد", "error", "فهمیدم");
      return;
    }

    const comment = {
      username,
      email,
      body,
      score,
      productID,
    };

    const res = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });

    console.log("Response ->", res);
    if (res.status === 201) {
      showSwal("کامنت مورد نظر با موفقیت ثبت شد", "success", "فهمیدم");

      setUsername("");
      setEmail("");
      setBody("");
      setScore(5);
    } else {
      showSwal("خطایی در ثبت کامنت رخ داده است", "error", "فهمیدم");
    }
  };

  return (
    <div className="w-full">
      <p className="text-sm font-bold font-shabnam mb-2">
        دیدگاه خود را بنویسید
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
        نشانی ایمیل شما منتشر نخواهد شد. بخش‌های موردنیاز علامت‌گذاری شده‌اند{" "}
        <span className="text-red-500">*</span>
      </p>

      <div className="flex items-center gap-3 mb-4">
        <p className="text-sm">امتیاز شما :</p>
        <div className="flex items-center gap-1 text-lg text-gray-400">
          {[5, 4, 3, 2, 1].map(value => (
            <IoMdStar
              key={value}
              onClick={() => setCommentScore(value)}
              className={`cursor-pointer transition-colors duration-300 ${
                score >= value ? "text-yellow-400" : "text-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          دیدگاه شما <span className="text-red-500">*</span>
        </label>
        <textarea
          value={body}
          onChange={event => setBody(event.target.value)}
          className="w-full bg-white text-black border border-gray-300 rounded-lg p-4 resize-none focus:outline-none focus:ring focus:ring-teal-300"
          rows="6"></textarea>
      </div>

      <div className="flex gap-6 mb-6">
        <div className="w-1/2">
          <label className="block text-sm font-medium mb-2">
            نام <span className="text-red-500">*</span>
          </label>
          <input
            value={username}
            onChange={event => setUsername(event.target.value)}
            type="text"
            className="w-full bg-white text-black border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring focus:ring-teal-300"
          />
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium mb-2">
            ایمیل <span className="text-red-500">*</span>
          </label>
          <input
            value={email}
            onChange={event => setEmail(event.target.value)}
            type="email"
            className="w-full bg-white text-black border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring focus:ring-teal-300"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <input
          type="checkbox"
          checked={isSaveUserInfo}
          onChange={e => setIsSaveUserInfo(prevValue => !prevValue)}
          className="w-5 h-5 border border-gray-300 rounded-lg focus:ring focus:ring-teal-300"
        />
        <p className="text-sm text-gray-700 dark:text-white">
          ذخیره نام، ایمیل و وبسایت من در مرورگر برای زمانی که دوباره دیدگاهی
          می‌نویسم.
        </p>
      </div>

      <button
        onClick={submitComment}
        className="mt-4 w-auto bg-teal-600 hover:bg-teal-800 text-white py-2 px-6 rounded-lg font-medium transition-all duration-200">
        ثبت
      </button>
    </div>
  );
};

export default CommentForm;
