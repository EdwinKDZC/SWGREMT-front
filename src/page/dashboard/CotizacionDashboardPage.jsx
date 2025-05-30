import { useEffect, useState } from "react";
import { getCatalogSuppliers, getSuppliers } from "../../service/supplierService";
import { useNavigate } from "react-router-dom";

export default function CotizacionDashboardPage() {
  const [suppliers, setSuppliers] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [cart, setCart] = useState([]);
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
    } catch (error) {
      console.error("Error fetching catalog suppliers:", error);
    }
  };

  const handleAddToCart = (product) => {
    const existing = cart.find((p) => p._id === product._id);
    if (!existing) {
      const updatedCart = [...cart, product];
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
    <div className="p-4">
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
        <table className="w-full table-auto bg-white shadow rounded">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2">Marca</th>
              <th className="p-2">Modelo</th>
              <th className="p-2">Tipo</th>
              <th className="p-2">Calidad</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Garantía</th>
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
                <td className="p-2">{product.fechaGarantia}</td>
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
