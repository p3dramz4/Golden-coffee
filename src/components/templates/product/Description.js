import React from "react";

const Description = ({product}) => {
  return (
    <div className="font-Dana text-zinc-700 dark:text-white">
      <p className="py-6">{product.longDescription}</p>
    </div>
  );
};

export default Description;