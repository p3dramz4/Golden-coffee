import Breadcrumb from "@/components/templates/product/Breadcrumb";
import Footer from "@/components/modules/Footer/footer";
import Navbar from "@/components/modules/Navbar/Navbar";
import Product from "@/components/modules/product/Product";
import connectToDB from "@/configs/db";
import { authUser } from "@/utils/serverHelpers";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import WishlistModel from "@/models/Wishlist";

const page = async () => {
  let wishes = [];
  connectToDB();
  const user = await authUser();
  if (user) {
    wishes = await WishlistModel.find({ user: user._id })
      .populate("product", "name price score")
      .lean();
  }

  return (
    <>
      <Navbar isLogin={user ? true : false} />
      <div className="md:w-[90%] lg:w-[85%] mx-auto px-4 mt-20 md:mt-[150px] text-zinc-700 dark:text-white">
        <div className="flex items-center justify-between border-b border-gray-300 dark:border-zinc-600 pb-2 sm:mb-2 md:mb-4">
          <Breadcrumb
            className="text-sm sm:text-base mb-0"
            route={"علاقه مندی ها"}
          />
          <p className="text-base sm:text-xl lg:text-2xl font-semibold">
            محصولات مورد علاقه شما
          </p>
        </div>

        {wishes.length > 0 ? (
          <section className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xxl:grid-cols-5 gap-4 xs:gap-6 md:gap-10 py-4 md:py-5 lg:py-6 xl:py-8 mb-5 md:mb-10 xl:mb-14 justify-items-center items-center">
            {wishes.map(wish => (
              <Product
                className="max-w-[280px] xs:max-w-[300px] md:max-w-none"
                key={wish._id}
                {...wish.product}
              />
            ))}
          </section>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 sm:py-[140px] text-center mt-4 sm:mt-20 space-y-4">
            <FaRegHeart className="text-5xl xs:text-7xl md:text-[140px] xl:text-[200px] text-gray-200" />
            <p className="text-xl xs:text-2xl md:text-4xl font-semibold">
              محصولی یافت نشد
            </p>
            <span className="text-gray-500">
              شما هنوز هیچ محصولی در لیست علاقه مندی های خود ندارید.
            </span>
            <span className="text-gray-500 mb-6">
              در صفحه "فروشگاه" محصولات جالب زیادی پیدا خواهید کرد.
            </span>
            <Link
              href="/category"
              className="bg-teal-600 text-white px-6 py-3 rounded hover:bg-red-700 transition duration-150">
              بازگشت به فروشگاه
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default page;
