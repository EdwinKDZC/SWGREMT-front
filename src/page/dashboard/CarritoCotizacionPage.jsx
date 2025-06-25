import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCotizarProducto } from "../../service/cotizarProductoService";

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

  const handleQuantityChange = (id, newQuantity) => {
    const updatedCart = cart.map((item) =>
      item._id === id
        ? { ...item, quantity: Math.max(1, parseInt(newQuantity) || 1) }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cotizacion_cart", JSON.stringify(updatedCart));
  };

  const total = cart.reduce(
    (sum, item) => sum + parseFloat(item.precio) * (item.quantity || 1),
    0
  );

  const handleGuardarCotizacion = async () => {
    if (cart.length === 0) {
      alert("El carrito está vacío. No se puede generar una cotización.");
      return;
    }

    const supplier = cart[0]?.supplierId;

    if (!supplier || !supplier.companyName) {
      alert("No se pudo identificar el proveedor para la cotización.");
      return;
    }

    const cotizacionPayload = {
      companyName: supplier.companyName,
      productos: cart.map((item) => ({
        marca: item.marca,
        modelo: item.modelo,
        tipo: item.tipo,
        calidad: item.calidad,
        precio: item.precio,
        cantidad: item.quantity || 1,
        fechaGarantia: item.fechaGarantia,
      })),
    };

    try {
      const response = await createCotizarProducto(cotizacionPayload);
      console.log("Cotización guardada:", response);
      alert("Cotización generada exitosamente.");
      localStorage.removeItem("cotizacion_cart");
      setCart([]);
      navigate("/dashboard/cotizacion");
    } catch (error) {
      console.error("Error al guardar la cotización:", error);
      alert("Ocurrió un error al generar la cotización. Por favor, inténtelo de nuevo.");
    }
  };

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
                <th className="p-2">Cantidad</th>
                <th className="p-2">Precio Unitario</th>
                <th className="p-2">Subtotal</th>
                <th className="p-2">Acción</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item._id} className="text-center border-t">
                  <td className="p-2">{item.marca}</td>
                  <td className="p-2">{item.modelo}</td>
                  <td className="p-2">
                    <input
                      type="number"
                      min="1"
                      className="w-16 text-center border rounded"
                      value={item.quantity || 1}
                      onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                    />
                  </td>
                  <td className="p-2">S/ {item.precio}</td>
                  <td className="p-2">
                    S/ {(item.precio * (item.quantity || 1)).toFixed(2)}
                  </td>
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
            <button
              className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={handleGuardarCotizacion}
            >
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
