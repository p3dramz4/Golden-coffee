import React from "react";
const Breadcrumb = ({ title, className = "" }) => {
  return (
    <section
      className={`flex items-center gap-2 text-zinc-700 dark:text-gray-300 ${className}`}>
      <a href="/">خانه </a>
      <span className="relative top-1/2">/</span>
      <a href="/">همه موارد </a>
      <span className="relative top-1/2">/</span>
      <p>{title}</p>
    </section>
  );
};

export default Breadcrumb;
