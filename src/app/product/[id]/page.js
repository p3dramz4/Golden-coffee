import styles from "@/styles/product.module.css";
import Gallery from "@/components/templates/product/Gallery";
import Details from "@/components/templates/product/Details";
import Tabs from "@/components/templates/product/Tabs";
import MoreProducts from "@/components/templates/product/MoreProducts";
import Footer from "@/components/modules/Footer/footer";
import Navbar from "@/components/modules/Navbar/Navbar";
import { authUser } from "@/utils/serverHelpers";
import ProductModel from "@/models/Product";
import connectToDB from "@/configs/db";

const product = async ({ params }) => {
  const user = await authUser();
  connectToDB();
  const productID = params.id;
  const product = await ProductModel.findOne({ _id: productID }).populate(
    "comments"
  );

  const relatedProducts = await ProductModel.find({ smell: product.smell });

  return (
    <div className={styles.container}>
      <Navbar isLogin={user ? true : false} />
      <div data-aos="fade-up" className={styles.contents}>
        <div className="gap-12 flex-col-reverse flex md:flex-row-reverse mx-auto w-[90%] xxl:w-full">
          <Details product={JSON.parse(JSON.stringify(product))} />
          <Gallery product={JSON.parse(JSON.stringify(product))} />
        </div>
        <Tabs product={JSON.parse(JSON.stringify(product))} />
        <MoreProducts
          relatedProducts={JSON.parse(JSON.stringify(relatedProducts))}
        />
      </div>
      <Footer />
    </div>
  );
};

export default product;
