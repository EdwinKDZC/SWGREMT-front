import { useEffect, useState } from "react";
import { getCatalogSuppliers, getSuppliers } from "../../service/supplierService";
import { useNavigate } from "react-router-dom";

const dateFormatter = new Intl.DateTimeFormat("es-PE", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export default function CotizacionDashboardPage() {
  const [suppliers, setSuppliers] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({}); // Estado para cantidades
  const navigate = useNavigate();

  const handleChange = (e) => {
    const supplierId = e.target.value;
    setSelectedSupplier(supplierId);
    if (supplierId) {
      fetchCatalogSuppliers(supplierId);
    } else {
      setFilteredProducts([]);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const response = await getSuppliers();
      setSuppliers(response);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const fetchCatalogSuppliers = async (supplierId) => {
    try {
      const response = await getCatalogSuppliers(supplierId);
      setFilteredProducts(response);

      // Inicializa las cantidades en 1 por defecto
      const initialQuantities = {};
      response.forEach((product) => {
        initialQuantities[product._id] = 1;
      });
      setQuantities(initialQuantities);
    } catch (error) {
      console.error("Error fetching catalog suppliers:", error);
    }
  };

  const handleQuantityChange = (productId, value) => {
    const newQuantities = { ...quantities, [productId]: Number(value) };
    setQuantities(newQuantities);
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product._id] || 1;
    const productWithQuantity = { ...product, quantity };

    const existing = cart.find((p) => p._id === product._id);
    if (!existing) {
      const updatedCart = [...cart, productWithQuantity];
      setCart(updatedCart);
      localStorage.setItem("cotizacion_cart", JSON.stringify(updatedCart));
    }
  };

  useEffect(() => {
    fetchSuppliers();
    const storedCart = JSON.parse(localStorage.getItem("cotizacion_cart")) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    if (suppliers.length > 0) {
      fetchCatalogSuppliers(suppliers[0]._id);
    }
  }, [suppliers]);

  return (
    <div className="w-full p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center">
        <select
          onChange={handleChange}
          className="w-1/2 p-2 border border-gray-300 rounded-md"
        >
          <option value="">Seleccione una Opción</option>
          {suppliers.map((supplier) => (
            <option key={supplier._id} value={supplier._id}>
              {supplier.companyName}
            </option>
          ))}
        </select>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => navigate("/dashboard/cotizacion/carrito")}
        >
          Ver Cotización ({cart.length})
        </button>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-bold mb-4">Productos del Proveedor</h3>
        <table className="w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2">Marca</th>
              <th className="p-2">Modelo</th>
              <th className="p-2">Tipo</th>
              <th className="p-2">Calidad</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Garantía</th>
              <th className="p-2">Cantidad</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product._id} className="text-center border-t">
                <td className="p-2">{product.marca}</td>
                <td className="p-2">{product.modelo}</td>
                <td className="p-2">{product.tipo}</td>
                <td className="p-2">{product.calidad}</td>
                <td className="p-2">S/ {product.precio}</td>
                <td className="p-2">{dateFormatter.format(new Date(product.fechaGarantia))}</td>
                <td className="p-2">
                  <input
                    type="number"
                    min="1"
                    className="w-16 p-1 border rounded"
                    value={quantities[product._id] || 1}
                    onChange={(e) =>
                      handleQuantityChange(product._id, e.target.value)
                    }
                  />
                </td>
                <td className="p-2">
                  <button
                    className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                    onClick={() => handleAddToCart(product)}
                  >
                    Agregar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
