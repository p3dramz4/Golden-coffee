import { FaStar, FaRegStar } from "react-icons/fa";

const Comment = ({ username, date, score, body, image }) => {
  const profileImage = image || "/images/comments/nouser.webp";

  return (
    <section className="flex gap-2 py-2">
      <img
        src={profileImage}
        className="w-[60px] h-[60px] rounded-full"
        alt=""
      />
      <div className="flex flex-col w-full">
        <div className="flex items-baseline justify-between">
          <div className="flex gap-2 items-baseline">
            <strong>{username}</strong>
            <p className="text-sm">{new Date(date).toLocaleDateString("fa-IR")}</p>
          </div>
          <div className="flex gap-1">
            {new Array(score).fill(0).map((item, index) => (
              <FaStar className="text-orange-400" key={index} />
            ))}

            {new Array(5 - score).fill(0).map((item, index) => (
              <FaRegStar className="text-gray-300" key={index} />
            ))}
          </div>
        </div>
        <p className="mt-1 line-clamp-2">{body}</p>
      </div>
    </section>
  );
};
export default Comment;