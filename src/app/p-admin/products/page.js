import React from "react";
import Layout from "@/components/layouts/AdminPanelLayout";
import Table from "@/components/templates/p-admin/products/Table";
import connectToDB from "@/configs/db";
import ProductModel from "@/models/Product";
import AddProduct from "@/components/templates/p-admin/products/AddProduct";

const page = async () => {
  connectToDB();
  const products = await ProductModel.find({}).sort({ _id: -1 }).lean();

  return (
    <Layout>
      <main>
        <AddProduct />

        {products.length === 0 ? (
          <p className="text-white bg-[#711d1c] py-3 px-8 w-max mx-auto my-[15rem] text-2xl rounded-lg">
            محصولی وجود ندارد
          </p>
        ) : (
          <Table
            products={JSON.parse(JSON.stringify(products))}
            title="لیست محصولات"
          />
        )}
      </main>
    </Layout>
  );
};

export default page;
