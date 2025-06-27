import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find((item) => item._id === product._id);

      if (existingProduct) {
        // Si ya existe, aumentar cantidad
        return prevItems.map((item) =>
          item._id === product._id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        // Si no existe, agregar nuevo producto con cantidad inicial
        return [...prevItems, { ...product, cantidad: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find((item) => item._id === productId);

      if (existingProduct && existingProduct.cantidad > 1) {
        // Si hay más de uno, reducir cantidad
        return prevItems.map((item) =>
          item._id === productId
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        );
      } else {
        // Si hay solo uno, eliminar
        return prevItems.filter((item) => item._id !== productId);
      }
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
