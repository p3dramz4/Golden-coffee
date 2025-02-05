import React from "react";
import styles from './dataTable.module.css'
export default function DataTable({ children, title }) {
  return (
    <div> 
      <div>
        <h1 className={styles.title}>
          <span>{title}</span>
        </h1>
      </div>
      <div className={styles.table_container}>
        {children}
      </div> 
    </div>
  );
}
