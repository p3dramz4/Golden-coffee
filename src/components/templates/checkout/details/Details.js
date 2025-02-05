"use client";
import stateData from "@/utils/stateData";
import { useEffect, useState } from "react";
import Select from "react-select";

const stateOptions = stateData();

const Details = () => {
  const [stateSelectedOption, setStateSelectedOption] = useState(null);
  const [citySelectedOption, setCitySelectedOption] = useState(null);
  const [citySelectorDisabel, setCitySelectorDisabel] = useState(true);
  const [cityOption, setCityOption] = useState([]);

  useEffect(() => {
    setCitySelectedOption(null);
    if (stateSelectedOption?.value) {
      const city = stateSelectedOption?.value.map(data => {
        return {
          value: data,
          label: data,
        };
      });
      setCityOption(city);
      setCitySelectorDisabel(false);
    }
  }, [stateSelectedOption]);

  return (
    <div className="p-8 w-full lg:w-1/2 text-right text-zinc-700 dark:text-gray-100">
      <p className="text-xl py-3">جزئیات صورتحساب</p>

      <form className="space-y-4">
        <div className="flex gap-2">
          <div className="w-full space-y-2">
            <label>
              نام خانوادگی <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="outline-none border border-gray-300 h-10 w-full rounded-md text-black"
            />
          </div>
          <div className="w-full space-y-2">
            <label>
              نام <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="outline-none border border-gray-300 h-10 w-full rounded-md text-black"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label>نام شرکت (اختیاری)</label>
          <input
            type="text"
            className="outline-none border border-gray-300 h-10 w-full rounded-md text-black"
          />
        </div>
        <div className="space-y-2">
          <label>
            استان <span className="text-red-500">*</span>
          </label>
          <Select
            defaultValue={stateSelectedOption}
            onChange={setStateSelectedOption}
            isClearable={true}
            placeholder={""}
            isRtl={true}
            isSearchable={true}
            options={stateOptions}
          />
        </div>
        <div className="space-y-2">
          <label>
            شهر <span className="text-red-500">*</span>
          </label>
          <Select
            defaultValue={citySelectedOption}
            onChange={setCitySelectedOption}
            isDisabled={citySelectorDisabel}
            isClearable={true}
            isRtl={true}
            isSearchable={true}
            options={cityOption}
            placeholder={""}
          />
        </div>
        <div className="space-y-2">
          <label>
            آدرس خیابان <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="outline-none border border-gray-300 h-10 w-full rounded-md text-black"
          />
        </div>
        <div className="space-y-2">
          <label>
            کدپستی (بدون فاصله) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="outline-none border border-gray-300 h-10 w-full rounded-md text-black"
          />
        </div>
        <div className="space-y-2">
          <label>
            شماره موبایل <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="outline-none border border-gray-300 h-10 w-full rounded-md text-black"
          />
        </div>

        <div className="space-y-2">
          <label>
            ایمیل <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="outline-none border border-gray-300 h-10 w-full rounded-md text-black"
          />
        </div>
        <div className="mt-8">
          <label>توضیحات سفارش (اختیاری)</label>
          <textarea
            cols="30"
            rows="8"
            placeholder="اگر توضیحی در مورد سفارش خود دارید در اینجا ثبت کنید"
            className="p-4 w-full border border-gray-300 rounded-md text-black resize-none mt-2"></textarea>
        </div>
      </form>
    </div>
  );
};

export default Details;
