import Navbar from "@/components/modules/Navbar/Navbar";
import Mainhome from "@/components/templates/HomePage/home";
import Latest from "@/components/templates/LatestProduct/latest";
import Category from "@/components/templates/Category/category";
import ProductsCategory from "@/components/templates/ProductsCategory/ProductsCategory";
import BestSellSwiper from "@/components/templates/Best-Selling/BestSellSwiper";
import CoffeeClub from "@/components/templates/CoffeeClub/CoffeeClub";
import Blogs from "@/components/templates/Blogs/blogs";
import ContactUs from "@/components/modules/ContactUs/ContactUs";
import Services from "@/components/modules/ServicesPart/ServicesPart";
import Footer from "@/components/modules/Footer/footer";
import { authUser } from "@/utils/serverHelpers";


export default async function Home() {
  const user = await authUser();


  return (
    <>
      <Navbar isLogin={user ? true : false} />
      <Mainhome />
      <Latest />
      <Category />
      <ProductsCategory />
      <BestSellSwiper />
      <CoffeeClub />
      <Blogs />
      <ContactUs />
      <Services />
      <Footer />
    </>
  );
};

