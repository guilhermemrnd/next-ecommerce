import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
import { Types } from "mongoose";

export type CartContextValue = {
  cartProducts: Types.ObjectId[];
  setCartProducts: Dispatch<SetStateAction<Types.ObjectId[]>>;
  addProduct: (productId: Types.ObjectId) => void;
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

  const addProduct = (productId: Types.ObjectId) => {
    setCartProducts((prev) => [...prev, productId]);
  };

  return (
    <CartContext.Provider value={{ cartProducts, setCartProducts, addProduct }}>
      {children}
    </CartContext.Provider>
  );
}
