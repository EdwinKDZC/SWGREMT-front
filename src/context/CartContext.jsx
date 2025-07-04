import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find((item) => item._id === product._id);
      const updatedItems = existingProduct
        ? prevItems.map((item) =>
            item._id === product._id
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          )
        : [...prevItems, { ...product, cantidad: 1 }];

      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems
        .map((item) =>
          item._id === productId
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter((item) => item.cantidad > 0);

      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
