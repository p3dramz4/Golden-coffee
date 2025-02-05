import UserPanelLayout from "@/components/layouts/UserPanelLayout";
import Product from "@/components/templates/p-user/wishlist/Product";
import connectToDB from "@/configs/db";
import { authUser } from "@/utils/serverHelpers";
import WishlistModel from "@/models/Wishlist";

const page = async () => {
  connectToDB();
  const user = await authUser();
  const wishlist = await WishlistModel.find({ user: user._id }).populate(
    "product"
  );

  return (
    <UserPanelLayout>
      <main>
        <h1 className="relative text-right text-2xl uppercase font-medium mt-8 mb-4 z-10">
          <span className="bg-white px-4 relative z-20 ml-16">
            علاقه مندی ها
          </span>
          <span className="absolute left-0 right-0 top-1/2 border-b border-[#711d1c] shadow-[0_1px_0_0_#711d1c] -z-10"></span>
        </h1>

        <div className="flex flex-wrap gap-5 justify-around px-8">
          {wishlist.length > 0 &&
            wishlist
              .filter(wish => wish.product) 
              .map(wish => (
                <Product
                  key={wish._id}
                  productID={String(wish.product._id)}
                  name={wish.product.name}
                  price={wish.product.price}
                  score={wish.product.score}
                />
              ))}
        </div>

        {wishlist.length === 0 && (
          <p className="text-white bg-[#711d1c] py-3 px-8 w-max mx-auto mt-60 text-2xl rounded-md">
            محصولی وجود ندارد
          </p>
        )}
      </main>
    </UserPanelLayout>
  );
};

export default page;
