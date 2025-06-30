import { useEffect, useState } from "react";
import { getProducts } from "../../service/productService";
import { reducirStock } from "../../service/stockService";
import { ShoppingCart } from "lucide-react";
import BoletaModal from "../../components/dashboard/BoletaModal";
import { registrarVenta } from "../../service/ventaService";
import { createBoleta } from "../../service/boletaService";

const StockDashboardPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchBrand, setSearchBrand] = useState("");
  const [searchModel, setSearchModel] = useState("");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [boletaNum, setBoletaNum] = useState(1);

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
    try {
      const total = cart.reduce(
        (acc, item) => acc + item.quantity * item.priceSold,
        0
      );

      const productosVendidos = cart.map(async (item) => {
        await reducirStock(item.codigo, item.quantity);

        return {
          codigo: item.codigo,
          brand: item.brand,
          model: item.model,
          category: item.category,
          quality: item.quality,
          cantidad: item.quantity,
          precio: item.priceSold,
        };
      });
      const venta = {
        tipo: "Boleta",
        numero: `B-${String(boletaNum).padStart(4, "0")}`,
        productos: await Promise.all(productosVendidos),
        total,
      };
      console.log("Venta a registrar:", venta);
      await registrarVenta(venta);

      // const transformDataBoleta = {
      //   serie: `B-${String(boletaNum).padStart(4, "0")}`,
      //   empresa: "SWGREMT S.A.C.",
      //   ruc: "12345678901",
      //   direccion: "Av. Ejemplo 123, Lima, Perú",
      //   telefono: "(01) 234-5678",
      //   email: "aticona19@gmail.com",
      //   productos: cart.map((item) => ({
      //     codigo: item.codigo,
      //     brand: item.brand,
      //     model: item.model,
      //     category: item.category,
      //     quality: item.quality,
      //     cantidad: item.quantity,
      //     precio: item.priceSold,
      //   })),
      //   total,
      //   fecha: new Date().toISOString(),
      // };

      // await createBoleta(transformDataBoleta);

      setCart([]);
      setIsModalOpen(false);
      setBoletaNum((prev) => prev + 1);
      const updated = await getProducts();
      setProducts(updated);
    } catch (err) {
      alert("Error al procesar venta: " + err.message);
    }
  };

  const openModal = () => {
    if (cart.length === 0) {
      alert("El carrito está vacío");
      return;
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full min-h-screen p-6 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-800">Gestión de Stock</h1>
        <button className="relative" onClick={() => setShowCart(!showCart)}>
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
              <td className="p-2">S/ {product.priceSold}</td>
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
                {item.brand} {item.model} x{item.quantity} = S/{" "}
                {item.priceSold * item.quantity}
              </li>
            ))}
          </ul>
          <p className="mt-2 font-semibold">
            Total: S/{" "}
            {cart.reduce((acc, p) => acc + p.quantity * p.priceSold, 0)}
          </p>
          <div className="flex gap-2 mt-3">
            <button
              className="bg-green-600 text-white px-2 py-1 rounded w-full"
              onClick={openModal}
              disabled={cart.length === 0}
            >
              Generar Boleta
            </button>
          </div>
        </div>
      )}

      {/* Modal Boleta */}
      <BoletaModal
        isOpen={isModalOpen}
        cart={cart}
        setCart={setCart}
        boletaNum={boletaNum}
        setBoletaNum={setBoletaNum}
        onClose={closeModal}
        action={handleConfirmSale}
      />
    </div>
  );
};

export default StockDashboardPage;
