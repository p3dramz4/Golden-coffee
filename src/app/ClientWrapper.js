"use client"
import React, { useRef } from "react";
import ScrollToTop from "@/utils/ScrollToTop";

const ClientWrapper = ({ children }) => {
  const footerRef = useRef(null); 

  return (
    <>
      {children}
      <ScrollToTop footerRef={footerRef} />
      <footer ref={footerRef} />
    </>
  );
};

export default ClientWrapper;
