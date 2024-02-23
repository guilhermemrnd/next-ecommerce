import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { Types } from "mongoose";

export type CartContextValue = {
  cartProducts: Types.ObjectId[];
  setCartProducts: Dispatch<SetStateAction<Types.ObjectId[]>>;
  addProduct: (productId: Types.ObjectId) => void;
  removeProduct: (productId: Types.ObjectId) => void;
};

export const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const value = useContext(CartContext);

  if (!value) {
    throw new Error("useCart has to be used within <CreateCartContext.Provider>");
  }

  return value;
}

export function CartContextProvider({ children }) {
  const [cartProducts, setCartProducts] = useState<Types.ObjectId[]>([]);

  useEffect(() => {
    if (cartProducts.length > 0) {
      window.localStorage.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const lsData = window.localStorage.getItem("cart");
      if (lsData) setCartProducts(JSON.parse(lsData));
      else setCartProducts([]);
    }
  }, []);

  const addProduct = (productId: Types.ObjectId) => {
    setCartProducts((prev) => [...prev, productId]);
  };
  const removeProduct = (productId: Types.ObjectId) => {
    setCartProducts((prev) => {
      const productIdx = prev.indexOf(productId);
      if (productIdx !== -1) {
        return prev.filter((id, idx) => idx !== productIdx);
      }
      return prev;
    });
  };

  return (
    <CartContext.Provider value={{ cartProducts, setCartProducts, addProduct, removeProduct }}>
      {children}
    </CartContext.Provider>
  );
}
