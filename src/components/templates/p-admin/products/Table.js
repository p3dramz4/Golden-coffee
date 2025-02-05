"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function DataTable({ products, title }) {
  const router = useRouter();

  return (
    <div className="p-5">
      <h1 className="relative text-2xl font-medium uppercase text-right mt-8">
        <span className="bg-white px-4 pr-16">{title}</span>
        <div className="absolute top-1/2 left-0 right-0 border-b-2 border-[#711d1c] -z-10"></div>
      </h1>

      <div className="overflow-x-auto bg-[#f2f7fd] p-5 mt-6 rounded-lg shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#711d1c] text-white">
              <th className="p-3">شناسه</th>
              <th className="p-3">نام</th>
              <th className="p-3">قیمت</th>
              <th className="p-3">امتیاز</th>
              <th className="p-3">مشاهده جزئیات</th>
              <th className="p-3">ویرایش</th>
              <th className="p-3">حذف</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id} className="border-b last:border-none">
                <td className="p-3 text-center">{index + 1}</td>
                <td className="p-3 text-center">{product.name}</td>
                <td className="p-3 text-center">
                  {product.price.toLocaleString()}
                </td>
                <td className="p-3 text-center">{product.score}</td>
                <td className="p-3 text-center">
                  <button className="bg-black text-white px-4 py-1 rounded hover:bg-gray-800 transition">
                    مشاهده جزئیات
                  </button>
                </td>
                <td className="p-3 text-center">
                  <button className="bg-black text-white px-4 py-1 rounded hover:bg-gray-800 transition">
                    ویرایش
                  </button>
                </td>
                <td className="p-3 text-center">
                  <button className="bg-[#711d1c] text-white px-4 py-1 rounded hover:bg-red-800 transition">
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
