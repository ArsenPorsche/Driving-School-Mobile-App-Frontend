import React, { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]); // [{ id, title, qty, pricePLN }]

  const addItem = (product, qty = 1) => {
    if (!product?.id) return;
    setItems((prev) => {
      const found = prev.find((it) => it.id === product.id);
      if (found) {
        return prev.map((it) =>
          it.id === product.id ? { ...it, qty: (it.qty || 0) + qty } : it
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          pricePLN: product.pricePLN || 0,
          type: product.type,
          baseQuantity: product.quantity || 1,
          qty: Math.max(1, qty),
        },
      ];
    });
  };

  const updateQty = (id, delta) => {
    setItems((prev) => {
      return prev
        .map((it) =>
          it.id === id ? { ...it, qty: (it.qty || 0) + delta } : it
        )
        .filter((it) => (it.qty || 0) > 0);
    });
  };

  const clearCart = () => setItems([]);

  const totalQty = useMemo(
    () => items.reduce((sum, it) => sum + (it.qty || 0), 0),
    [items]
  );
  const totalPrice = useMemo(
    () => items.reduce((sum, it) => sum + (it.pricePLN || 0) * (it.qty || 0), 0),
    [items]
  );

  const value = {
    items,
    addItem,
    updateQty,
    clearCart,
    totalQty,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
