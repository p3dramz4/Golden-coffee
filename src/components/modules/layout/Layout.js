import React from "react";
import styles from "./layout.module.css";
import Sidebar from "../sidebar/Sidebar";
import Topbar from "../topbar/Topbar";

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <section className={styles.section}>
        <Sidebar />
        <div className={styles.contents}>
          <Topbar />
          {children}
        </div>
      </section>
    </div>
  );
};

export default Layout;
