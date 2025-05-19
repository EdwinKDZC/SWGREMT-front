// StockDashboardPage.jsx
import { useEffect, useState } from "react";
import { getProducts } from "../../service/productService";
import { updateStock } from "../../service/stockService";
import { ShoppingCart } from "lucide-react";

const StockDashboardPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchBrand, setSearchBrand] = useState("");
  const [searchModel, setSearchModel] = useState("");
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProducts();
      setProducts(response);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = products.filter(
      (p) =>
        p.brand.toLowerCase().includes(searchBrand.toLowerCase()) &&
        p.model.toLowerCase().includes(searchModel.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchBrand, searchModel, products]);

  const handleAddToCart = (product, quantity) => {
    const existing = cart.find((item) => item._id === product._id);
    if (existing) {
      const updatedCart = cart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const handleConfirmSale = async () => {
    for (const item of cart) {
      await updateStock(item._id, item.stock - item.quantity);
    }
    setCart([]);
    setPaymentMethod("");
    const updated = await getProducts();
    setProducts(updated);
    setShowCart(false);
  };

  return (
    <div className="w-full min-h-screen p-6 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-800">
          Gestión de Stock
        </h1>
        <button
          className="relative"
          onClick={() => setShowCart(!showCart)}
        >
          <ShoppingCart className="text-blue-800 w-8 h-8" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar por marca"
          className="p-2 border rounded"
          value={searchBrand}
          onChange={(e) => setSearchBrand(e.target.value)}
        />
        <input
          type="text"
          placeholder="Buscar por modelo"
          className="p-2 border rounded"
          value={searchModel}
          onChange={(e) => setSearchModel(e.target.value)}
        />
      </div>

      {/* Tabla productos */}
      <table className="w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="p-2">Marca</th>
            <th className="p-2">Modelo</th>
            <th className="p-2">Categoría</th>
            <th className="p-2">Calidad</th>
            <th className="p-2">Precio</th>
            <th className="p-2">Stock</th>
            <th className="p-2">Vender</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product._id} className="border-t text-center">
              <td className="p-2">{product.brand}</td>
              <td className="p-2">{product.model}</td>
              <td className="p-2">{product.category}</td>
              <td className="p-2">{product.quality}</td>
              <td className="p-2">S/ {product.price}</td>
              <td className="p-2">{product.stock}</td>
              <td className="p-2">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => {
                    const quantity = parseInt(
                      prompt("¿Cuántas unidades desea vender?"),
                      10
                    );
                    if (quantity > 0 && quantity <= product.stock) {
                      handleAddToCart(product, quantity);
                    } else {
                      alert("Cantidad no válida o supera el stock disponible");
                    }
                  }}
                >
                  Vender
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Carrito */}
      {showCart && (
        <div className="fixed top-20 right-10 bg-white shadow-lg border rounded-xl p-4 w-80 z-50">
          <h2 className="text-lg font-bold mb-2">Carrito de Venta</h2>
          <ul>
            {cart.map((item) => (
              <li key={item._id} className="mb-1">
                {item.brand} {item.model} x{item.quantity} = S/ {item.price * item.quantity}
              </li>
            ))}
          </ul>
          <p className="mt-2 font-semibold">
            Total: S/ {cart.reduce((acc, p) => acc + p.quantity * p.price, 0)}
          </p>
          <input
            type="text"
            placeholder="Método de pago"
            className="mt-2 p-1 border rounded w-full"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <button
            className="mt-2 w-full bg-green-600 text-white p-2 rounded hover:bg-green-500"
            onClick={handleConfirmSale}
            disabled={cart.length === 0 || !paymentMethod}
          >
            Confirmar Venta
          </button>
        </div>
      )}
    </div>
  );
};

export default StockDashboardPage;