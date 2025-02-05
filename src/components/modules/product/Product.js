import Link from "next/link";
import styles from "./product.module.css";
import { FaRegStar, FaStar } from "react-icons/fa";
import { CiSearch, CiHeart } from "react-icons/ci";

const Card = ({ name, price, className="" }) => {
  return (
    <div className={`font-Dana text-zinc-700 dark:text-white w-full relative pt-5 ${className}`}>
      <div className={styles.details_container}>
        <img
          className="w-full h-[312px] object-cover"
          src="/images/capsule/b1-1.webp"
          alt=""
        />
        <div className={styles.icons}>
          <Link href="/">
            <CiSearch />
            <p className={styles.tooltip}>مشاهده سریع</p>
          </Link>
          <div>
            <CiHeart />
            <p className={styles.tooltip}>افزودن به علاقه مندی ها </p>
          </div>
        </div>
        <button>افزودن به سبد خرید</button>
      </div>

      <div className="flex flex-col gap-1 text-center pt-1 justify-center">
        <Link className="mt-2 mb-2" href={"/"}>
          {name}
        </Link>
        <div className="flex justify-around items-center">
          <div className="flex child:text-orange-500">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaRegStar />
            <FaRegStar />
          </div>
          <span className="text-teal-500 text-lg">
            {price?.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
