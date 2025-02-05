import React from "react";

const MoreInfoes = ({product}) => {
  return (
    <div className="font-DanaMedium text-zinc-700 dark:text-white">
      <p>اطلاعات بیشتر :</p>
      <hr />
      <main>
        <div className="flex justify-between">
          <p>وزن</p>
          <p>{product.weight} گرم</p>
        </div>
        <div className="flex justify-between">
          <p>مناسب برای:</p>
          <p>{product.suitableFor}</p>
        </div>
        <div className="flex justify-between">
          <p>میزان بو:</p>
          <p>{product.smell}</p>
        </div>
      </main>
    </div>
  );
};

export default MoreInfoes;
