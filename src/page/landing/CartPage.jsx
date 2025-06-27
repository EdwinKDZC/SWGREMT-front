import React from 'react';
import { useCart } from '../../context/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();

  const totalGeneral = cartItems.reduce(
    (acc, item) => acc + item.priceSold * item.cantidad,
    0
  );

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-blue-800">Carrito de Compras</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">El carrito está vacío.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-800 text-white">
              <tr>
                <th className="p-2">Tipo</th>
                <th className="p-2">Marca</th>
                <th className="p-2">Modelo</th>
                <th className="p-2">Calidad</th>
                <th className="p-2">Precio Unitario</th>
                <th className="p-2">Cantidad</th>
                <th className="p-2">Subtotal</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id} className="border-t text-center">
                  <td className="p-2">{item.category}</td>
                  <td className="p-2">{item.brand}</td>
                  <td className="p-2">{item.model}</td>
                  <td className="p-2">{item.quality}</td>
                  <td className="p-2">S/ {item.priceSold.toFixed(2)}</td>
                  <td className="p-2">{item.cantidad}</td>
                  <td className="p-2">
                    S/ {(item.priceSold * item.cantidad).toFixed(2)}
                  </td>
                  <td className="p-2">
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => removeFromCart(item._id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Total general */}
          <div className="mt-6 text-right font-bold text-lg">
            Total General: S/ {totalGeneral.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
