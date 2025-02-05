"use client";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext"; 
import Link from "next/link";

const Order = () => {
  const { cart, discountCode } = useCart(); 
  const [totalAmount, setTotalAmount] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0); 
  const shippingCost = 80000;

  useEffect(() => {
    console.log("Discount Code: ", discountCode);

    const calculatedTotal = cart.reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    const discount =
      discountCode && discountCode.percent
        ? (calculatedTotal * discountCode.percent) / 100
        : 0;
    console.log("Calculated Discount: ", discount);

    const discountedTotal = calculatedTotal - discount;

    const calculatedTax = discountedTotal * 0.1;

    const finalTotal = discountedTotal + calculatedTax + shippingCost;

    setTotalAmount(calculatedTotal); 
    setTaxAmount(calculatedTax); 
    setFinalAmount(finalTotal); 
    setDiscountAmount(discount);
  }, [cart, discountCode]); 

  return (
    <div className="text-black w-full lg:w-1/2 text-right relative bg-white rounded-md p-8 direction-ltr">
      <p className="text-center text-xl">سفارش شما</p>
      <main className="bg-white mt-8 shadow-sm p-4">
        <div className="flex justify-between items-center border-b border-gray-200 p-5">
          <p>جمع جزء</p>
          <p>محصول</p>
        </div>
        {cart.map(item => (
          <div
            key={item._id || item.name}
            className="flex justify-between items-center border-b border-gray-200 p-5">
            <p>{(item.count * item.price).toLocaleString()} تومان</p>
            <p className="w-1/2 text-right">
              {item.name} × {item.count}
            </p>
          </div>
        ))}
        <div className="flex justify-between items-center border-b border-gray-200 p-5">
          <p>جمع جزء</p>
          <p>{totalAmount.toLocaleString()} تومان</p>
        </div>
        <div className="flex justify-between items-center border-b border-gray-200 p-5">
          <p>تخفیف</p>
          <p className="text-red-600">
            -{discountAmount.toLocaleString()} تومان
          </p>
        </div>

        <div className="flex justify-between items-center border-b border-gray-200 p-5">
          <p>
            پیک موتوری: <strong>{shippingCost.toLocaleString()} تومان</strong>
          </p>
          <p>حمل و نقل</p>
        </div>
        <div className="flex justify-between items-center p-5">
          <div className="text-left">
            <h2 className="text-xl">{finalAmount.toLocaleString()} تومان</h2>
            <p>
              (شامل <strong>{taxAmount.toLocaleString()}</strong> تومان ارزش
              افزوده)
            </p>
          </div>
          <h3 className="text-xl">مجموع</h3>
        </div>
      </main>
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex items-center gap-2 justify-end direction-rtl flex-row-reverse">
          <input type="radio" name="payment_method" value="melli" />
          <label> بانک ملی</label>
          <img width={24} height={40} src="/images/meli.png" alt="بانک ملی" />
        </div>
        <div className="flex items-center gap-2 justify-end direction-rtl flex-row-reverse">
          <input type="radio" name="payment_method" value="zarinpal" />
          <label>پرداخت امن زرین پال </label>
          <img
            width={40}
            height={40}
            src="/images/zarinpal.webp"
            alt="زرین پال"
          />
        </div>
        <div className="mt-5 mb-5 pt-5 pb-5 border-t border-b border-gray-200 text-gray-700">
          <p>
            اطلاعات شخصی شما برای پردازش سفارش و پشتیبانی از تجربه شما در این
            وبسایت و برای اهداف دیگری که در{" "}
            <strong>سیاست حفظ حریم خصوصی</strong> توضیح داده شده است استفاده
            می‌شود.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-row-reverse">
          <input type="checkbox" name="" id="" />
          <p>
            {" "}
            من<strong> شرایط و مقررات</strong> سایت را خوانده ام و آن را می
            پذیرم. <span className="text-red-500">*</span>
          </p>
        </div>
        <Link href={"/complate-order"}>
          <button className="bg-green-700 text-white p-2 rounded-md w-full mt-4 hover:bg-red-700 transition-all">
            ثبت سفارش
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Order;
