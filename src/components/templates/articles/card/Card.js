import Link from "next/link";

const Card = ({ title, description, image, link }) => {
  return (
    <div className="gap-4 p-4 rounded-lg shadow-md bg-gray-100 dark:bg-zinc-700">
      <Link href={link}>
        <img
          className="w-full h-48 object-cover rounded-lg"
          src={image}
          alt={title}
        />
      </Link>
      <Link
        href={link}
        className="text-xl font-semibold text-zinc-700 dark:text-gray-200 block mt-3 mb-1">
        {title}
      </Link>
      <p className="text-zinc-600 dark:text-gray-400 leading-relaxed line-clamp-2 ">
        {description}
      </p>
      <Link href={link} className="text-teal-600 block text-left">
        ادامه مطلب
      </Link>
    </div>
  );
};

export default Card;
