import React from 'react'
import { useCart } from '../../context/CartContext';

const CartPage = () => {

    const { cartItems, removeFromCart } = useCart();

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-blue-800">Carrito de Compras</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">El carrito está vacío.</p>
      ) : (
        <table className="w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2">Tipo</th>
              <th className="p-2">Marca</th>
              <th className="p-2">Modelo</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Cantidad</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-2">{item.type}</td>
                <td className="p-2">{item.brand}</td>
                <td className="p-2">{item.model}</td>
                <td className="p-2">${item.salePrice}</td>
                <td className="p-2">{item.quantity}</td>
                <td className="p-2">
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CartPage
