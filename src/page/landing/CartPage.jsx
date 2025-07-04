import React, { useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { NavLink } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, setCartItems, removeFromCart } = useCart();
  console.log(cartItems)

  const totalGeneral = cartItems.reduce(
    (acc, item) => acc + item.priceSold * item.cantidad,
    0
  );

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }
  }, []);

  return (
    <div className="min-h-screen pt-6 bg-gray-100">
      <div className='w-4/5 mx-auto'>

        <h1 className="text-2xl font-bold mb-6 text-blue-800">Carrito de Compras</h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-600">El carrito está vacío.</p>
        ) : (
          <div className='flex justify-between gap-8'>
            <div className="w-full overflow-x-auto">
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
            </div>
            
            {/* Total general */}
            <div className='w-1/5'>
              <div className='w-full bg-white shadow-md rounded-lg p-4'>
                <h2 className='text-xl'>Resumen de compra</h2>
                <div className="font-bold text-lg mt-6">
                  Total: S/ {totalGeneral.toFixed(2)}
                </div>
              </div>

              <button className='mt-4 w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-700'>
                <NavLink to="/info">
                  Ir a comprar
                </NavLink>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
