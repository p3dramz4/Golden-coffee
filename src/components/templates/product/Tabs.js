"use client";
import React from "react";
import styles from "./tabs.module.css";
import { useState } from "react";
import Description from "./Description";
import MoreInfoes from "./MoreInfoes";
import Comments from "./Comments";

const Tabs = ({ product }) => {
  const [tab, setTab] = useState("description");

  const handleTabChange = tabName => {
    setTab(tabName); 
  };

  return (
    <div
      data-aos="fade-left"
      className={`${styles.tabs} font-Dana text-zinc-700 dark:text-white`}>
      <input
        onChange={() => handleTabChange("description")}
        type="radio"
        id="description"
        name="tab-control"
        checked={tab === "description"}
      />
      <input
        onChange={() => handleTabChange("moreInfoes")}
        type="radio"
        id="moreInfoes"
        name="tab-control"
        checked={tab === "moreInfoes"}
      />
      <input
        onChange={() => handleTabChange("comments")}
        type="radio"
        id="comments"
        name="tab-control"
        checked={tab === "comments"}
      />

      <ul className="font-DanaDemiBold">
        <li title="Features">
          <label htmlFor="description" role="button">
            توضیحات
          </label>
        </li>
        <li title="Delivery Contents">
          <label htmlFor="moreInfoes" role="button">
            اطلاعات بیشتر
          </label>
        </li>
        <li title="Shipping">
          <label htmlFor="comments" role="button">
            نظرات ({product.comments.filter(comment => comment.isAccept).length}
            )
          </label>
        </li>
      </ul>

      <div className={styles.contents}>
        <section className={styles.tabs_content}>
          {tab === "description" && (
            <Description product={JSON.parse(JSON.stringify(product))} />
          )}
        </section>
        <section className={styles.tabs_content}>
          {tab === "moreInfoes" && (
            <MoreInfoes product={JSON.parse(JSON.stringify(product))} />
          )}
        </section>
        <section className={styles.tabs_content}>
          {tab === "comments" && (
            <Comments
              product={product}
              productID={product._id}
              comments={JSON.parse(JSON.stringify(product.comments))}
            />
          )}
        </section>
      </div>
    </div>
  );
};

export default Tabs;
