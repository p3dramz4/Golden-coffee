"use client"; 

import { useEffect } from "react";
import { useTheme } from "@/context/CartContext";

export default function ThemeWrapper({ children }) {
  const { theme } = useTheme(); 

  useEffect(() => {

    const html = document.documentElement; 
    html.classList.remove("light", "dark"); 
    html.classList.add(theme); 
  }, [theme]); 

  return <>{children}</>; 
}
