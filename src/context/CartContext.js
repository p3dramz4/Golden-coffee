"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const useCart = () => {
  const {
    cart,
    addToCart,
    removeFromCart,
    increaseCount,
    decreaseCount,
    setCart,
    discountCode,
    finalPrice,
    applyDiscount,
    discount,
  } = useContext(AppContext);
  return {
    cart,
    addToCart,
    removeFromCart,
    increaseCount,
    decreaseCount,
    setCart,
    discountCode,
    finalPrice,
    applyDiscount,
    discount,
  };
};

export const useTheme = () => {
  const { theme, toggleTheme } = useContext(AppContext);
  return { theme, toggleTheme };
};

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    return savedCart;
  });

  const [discountCode, setDiscountCode] = useState(() => {
    return JSON.parse(localStorage.getItem("discountCode")) || null;
  });
  const [discount, setDiscount] = useState(() => {
    return JSON.parse(localStorage.getItem("discount")) || 0;
  });
  const [finalPrice, setFinalPrice] = useState(() => {
    return JSON.parse(localStorage.getItem("finalPrice")) || 0;
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const total = cart.reduce(
      (prev, current) => prev + current.price * current.count,
      0
    );
    const calculatedFinalPrice = discountCode
      ? total - (total * discountCode.percent) / 100 + 80000
      : total + 80000;

    setFinalPrice(calculatedFinalPrice);
    localStorage.setItem("finalPrice", JSON.stringify(calculatedFinalPrice));
  }, [cart, discountCode]);

  const addToCart = product => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item._id === product._id);
      return existingProduct
        ? prevCart.map(item =>
            item._id === product._id
              ? { ...item, count: (item.count || 0) + (product.count || 1) }
              : item
          )
        : [...prevCart, { ...product, count: product.count || 1 }];
    });
  };

  const removeFromCart = productId => {
    setCart(prevCart => prevCart.filter(item => item._id !== productId));
  };

  const increaseCount = productId => {
    setCart(prevCart =>
      prevCart.map(item =>
        item._id === productId ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  const decreaseCount = productId => {
    setCart(prevCart =>
      prevCart.map(item =>
        item._id === productId && item.count > 1
          ? { ...item, count: item.count - 1 }
          : item
      )
    );
  };

  const applyDiscount = code => {
    if (typeof code === "number") {
      code = { percent: code };
    }
    if (!code || !code.percent || isNaN(code.percent)) {
      setDiscount(0);
      setFinalPrice(
        cart.reduce(
          (prev, current) => prev + current.price * current.count,
          0
        ) + 80000
      );
      return;
    }

    const total = cart.reduce(
      (prev, current) => prev + current.price * current.count,
      0
    );
    const discountAmount = (total * code.percent) / 100;
    const finalPriceWithDiscount = total - discountAmount + 80000;

    setDiscountCode(code);
    setDiscount(discountAmount);
    setFinalPrice(finalPriceWithDiscount);

    localStorage.setItem("discountCode", JSON.stringify(code));
    localStorage.setItem("discount", JSON.stringify(discountAmount));
    localStorage.setItem("finalPrice", JSON.stringify(finalPriceWithDiscount));
  };

  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) return storedTheme;
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        increaseCount,
        decreaseCount,
        theme,
        toggleTheme,
        discountCode,
        finalPrice,
        applyDiscount,
        discount,
      }}>
      <div className={theme}>{children}</div>
    </AppContext.Provider>
  );
};
