import Breadcrumb from "@/components/templates/product/Breadcrumb";
import Footer from "@/components/modules/Footer/footer";
import Navbar from "@/components/modules/Navbar/Navbar";
import Form from "@/components/templates/contact-us/Form";
import Information from "@/components/templates/contact-us/Information";
import Map from "@/components/templates/contact-us/Map";
import Link from "next/link";
import { authUser } from "@/utils/serverHelpers";

const page = async () => {
  const user = await authUser();

  return (
    <>
      <Navbar isLogin={user ? true : false} />
      <div className="md:w-[90%] lg:w-[85%] mx-auto px-4 mt-20 md:mt-[150px] text-zinc-700 dark:text-white">
        <div className="flex items-center justify-between border-b border-gray-300 dark:border-zinc-600 pb-2 sm:mb-2 md:mb-4">
          <Breadcrumb route={"تماس با ما"} />
        </div>
        <div className="text-black text-right max-w-[1400px] w-full px-[15px] mx-auto mb-[4rem] mt-4">
          <div className="flex flex-wrap sm:flex-nowrap justify-center gap-[25px]">
            <section className="w-full sm:w-[50%]">
              <Map
                position={[35.785886, 51.438471]}
                center={[35.785886, 51.438471]}>
                <span> فروشگاه ما</span>
                <h3>آدرس فروشگاه حضوری قهوه طلایی (شعبه شرق بزودی)</h3>
                <p>
                  تهران - خیابان شریعتی- روبروی متروی شهید صدر - کوچه اخوان -
                  پلاک 10
                </p>
                <p>021-88305827</p>
                <Link href="/about-us">درباره فروشگاه</Link>
              </Map>
            </section>
            <section className="w-full sm:w-[50%]">
              <Map
                position={[35.747378, 51.328573]}
                center={[35.747378, 51.328573]}>
                <span> فروشگاه ما</span>
                <h3>آدرس فروشگاه حضوری قهوه طلایی (شعبه غرب)</h3>
                <p>
                  تهران – اشرفی اصفهانی - روبروی پاساژ تیراژه - خیابان نیکزارع -
                  پلاک 12
                </p>
                <p>021-33814721</p>
                <Link href="/about-us">درباره فروشگاه</Link>
              </Map>
            </section>
          </div>
        </div>
        <div className="text-black text-right max-w-[1400px] w-full px-[15px] mx-auto mb-[4rem]">
          <div className="flex flex-wrap-reverse sm:flex-nowrap gap-[50px]">
            <section className="w-full sm:w-[50%] mt-[3rem]">
              <Form />
            </section>
            <section className="w-full sm:w-[50%] mt-[3rem]">
              <Information />
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default page;
