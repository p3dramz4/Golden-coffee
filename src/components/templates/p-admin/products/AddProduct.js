"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

function AddProduct() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [weight, setWeight] = useState("");
  const [suitableFor, setSuitableFor] = useState("");
  const [smell, setSmell] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImg] = useState({});

  const addProduct = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("shortDescription", shortDescription);
    formData.append("longDescription", longDescription);
    formData.append("weight", weight);
    formData.append("suitableFor", suitableFor);
    formData.append("smell", smell);
    formData.append("tags", tags.split("،"));

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }


    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      console.log("Response Status:", res.status);

      if (!res.ok) {
        const errorData = await res.json();
        console.log("Error Response:", errorData);
        Swal.fire({
          title: "خطا!",
          text: errorData.message || "مشکلی رخ داده است!",
          icon: "error",
        });
        return;
      }

      Swal.fire({
        title: "محصول مورد نظر با موفقیت ایجاد شد",
        icon: "success",
        buttons: "فهمیدم",
      }).then(() => {
        router.refresh();
      });
    } catch (err) {
      console.log("Fetch Error:", err);
      Swal.fire({
        title: "خطا!",
        text: "مشکلی در ارتباط با سرور پیش آمده است.",
        icon: "error",
      });
    }
  };

  return (
    <section className="p-6 bg-gray-100 rounded-lg shadow-md">
      <p className="text-2xl font-semibold text-right text-gray-800 mb-6">
        افزودن محصول جدید
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-lg font-medium">نام محصول</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="لطفا نام محصول را وارد کنید"
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-lg font-medium">مبلغ محصول</label>
          <input
            value={price}
            onChange={e => setPrice(e.target.value)}
            placeholder="لطفا مبلغ محصول را وارد کنید"
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-lg font-medium">توضیحات کوتاه</label>
          <input
            value={shortDescription}
            onChange={e => setShortDescription(e.target.value)}
            placeholder="توضیحات کوتاه محصول"
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-lg font-medium">توضیحات بلند</label>
          <input
            value={longDescription}
            onChange={e => setLongDescription(e.target.value)}
            placeholder="توضیحات بلند محصول"
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-lg font-medium">وزن</label>
          <input
            value={weight}
            onChange={e => setWeight(e.target.value)}
            placeholder="وزن محصول"
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-lg font-medium">مناسب برای</label>
          <input
            value={suitableFor}
            onChange={e => setSuitableFor(e.target.value)}
            placeholder="مناسب برای ..."
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-lg font-medium">میزان بو</label>
          <input
            value={smell}
            onChange={e => setSmell(e.target.value)}
            placeholder="میزان بو"
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-lg font-medium">تگ‌های محصول</label>
          <input
            value={tags}
            onChange={e => setTags(e.target.value)}
            placeholder="مثال: قهوه،قهوه ترک، قهوه اسپرسو"
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-lg font-medium">تصویر محصول</label>
          <input
            onChange={e => setImg(e.target.files)}
            type="file"
            multiple
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>
      </div>
      <button
        onClick={addProduct}
        className="w-full mt-6 p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">
        افزودن
      </button>
    </section>
  );
}

export default AddProduct;
