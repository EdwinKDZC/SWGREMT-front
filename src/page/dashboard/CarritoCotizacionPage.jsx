import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CarritoCotizacionPage() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cotizacion_cart")) || [];
    setCart(storedCart);
  }, []);

  const handleRemove = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem("cotizacion_cart", JSON.stringify(updatedCart));
  };

  const total = cart.reduce((sum, item) => sum + parseFloat(item.precio), 0);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Mi Cotización</h2>
      {cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <table className="w-full table-auto bg-white shadow rounded">
            <thead className="bg-blue-800 text-white">
              <tr>
                <th className="p-2">Marca</th>
                <th className="p-2">Modelo</th>
                <th className="p-2">Precio</th>
                <th className="p-2">Acción</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item._id} className="text-center border-t">
                  <td className="p-2">{item.marca}</td>
                  <td className="p-2">{item.modelo}</td>
                  <td className="p-2">S/ {item.precio}</td>
                  <td className="p-2">
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleRemove(item._id)}
                    >
                      Quitar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 text-right">
            <p className="font-bold text-xl">Total: S/ {total.toFixed(2)}</p>
            <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Generar Cotización
            </button>
            <button
              className="ml-4 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              onClick={() => navigate("/dashboard/cotizacion")}
            >
              Volver
            </button>
          </div>
        </>
      )}
    </div>
  );
}
