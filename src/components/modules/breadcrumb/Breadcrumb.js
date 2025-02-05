import Link from "next/link";

const Breadcrumb = ({ route }) => {
  return (
    <div className="bg-[url('/images/w.jpg')] bg-cover bg-center mb-10 px-[60px] pt-[182px] text-white font-bold lg:font-extrabold ">
      <p className="text-center text-[2.3rem] sm:text-[3rem] lg:text-[4.4rem]">{route}</p>
      <div className="flex items-center justify-center flex-row-reverse gap-[6px] pb-[3.8rem]">
        <Link
          href={"/articles"}
          className="inline-block mt-[5px] mb-[5px] uppercase text-[14px] leading-[1.2]">
          مقاله ها
        </Link>
        <span>/</span>
        <p className="inline-block mt-[5px] mb-[5px] uppercase text-[14px] leading-[1.2]">
          {route}
        </p>
      </div>
    </div>
  );
};

export default Breadcrumb;
