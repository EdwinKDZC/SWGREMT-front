import React, { useState, useEffect } from "react";

const StockDashboardPage = () => {
  const [products, setProducts] = useState([]);
  const [stockTransactions, setStockTransactions] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedQuality, setSelectedQuality] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [transactionType, setTransactionType] = useState(""); // "Ingreso" o "Salida"

  // Cargar productos y transacciones desde localStorage
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const storedTransactions = JSON.parse(localStorage.getItem("stockTransactions")) || [];
    setProducts(storedProducts);
    setStockTransactions(storedTransactions);
  }, []);

  // Guardar productos actualizados en localStorage
  useEffect(() => {
    if (products.length > 0) {
      console.log("Guardando productos en localStorage:", products);
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products]);

  // Guardar transacciones en localStorage
  useEffect(() => {
    if (stockTransactions.length > 0) {
      console.log("Guardando movimientos en localStorage:", stockTransactions);
      localStorage.setItem("stockTransactions", JSON.stringify(stockTransactions));
    }
  }, [stockTransactions]);

  // Manejar la transacción (Ingreso o Salida)
  const handleTransaction = () => {
    if (!selectedModel || !transactionType || quantity <= 0) {
      alert("Por favor, completa todos los campos correctamente.");
      return;
    }

    // Buscar el producto seleccionado
    const product = products.find((p) => p.model === selectedModel && p.type === selectedType && p.quality === selectedQuality);
    if (!product) {
      alert("Producto no encontrado.");
      return;
    }

    // Calcular el nuevo stock
    const newStock =
      transactionType === "Ingreso" ? product.cantidadActual + quantity : product.cantidadActual - quantity;

    if (newStock < 0) {
      alert("No puedes realizar una salida mayor al stock disponible.");
      return;
    }

    // Actualizar el stock del producto
    const updatedProduct = { ...product, cantidadActual: newStock };
    const updatedProducts = products.map((p) => (p.id === product.id ? updatedProduct : p));

    setProducts(updatedProducts);

    // Registrar la transacción
    const transaction = {
      id: Date.now(),
      productId: product.id,
      type: transactionType,
      quantity,
      date: new Date().toLocaleString(),
    };

    setStockTransactions([...stockTransactions, transaction]);

    // Resetear campos
    setQuantity(0);
    setTransactionType("");
    setSelectedType("");
    setSelectedModel("");
    setSelectedQuality("");
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-blue-800">Gestión de Stock</h1>

      {/* Formulario de transacciones */}
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Tipo de Producto */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Tipo de Producto</label>
            <select
              className="w-full p-2 border rounded-md"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">Seleccione el tipo</option>
              {[...new Set(products.map((product) => product.type))].map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Modelo */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Modelo</label>
            <select
              className="w-full p-2 border rounded-md"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              disabled={!selectedType}
            >
              <option value="">Seleccione el modelo</option>
              {products
                .filter((product) => product.type === selectedType)
                .map((product) => (
                  <option key={product.model} value={product.model}>
                    {product.model}
                  </option>
                ))}
            </select>
          </div>

          {/* Calidad */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Calidad</label>
            <select
              className="w-full p-2 border rounded-md"
              value={selectedQuality}
              onChange={(e) => setSelectedQuality(e.target.value)}
              disabled={!selectedModel}
            >
              <option value="">Seleccione la calidad</option>
              {products
                .filter(
                  (product) =>
                    product.type === selectedType && product.model === selectedModel
                )
                .map((product) => (
                  <option key={product.quality} value={product.quality}>
                    {product.quality}
                  </option>
                ))}
            </select>
          </div>

          {/* Tipo de Transacción */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Tipo de Transacción</label>
            <select
              className="w-full p-2 border rounded-md"
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
            >
              <option value="">Seleccione</option>
              <option value="Ingreso">Ingreso</option>
              <option value="Salida">Salida</option>
            </select>
          </div>

          {/* Cantidad */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Cantidad</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1"
            />
          </div>
        </div>

        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleTransaction}
        >
          Registrar Transacción
        </button>
      </div>

      {/* Reporte de transacciones */}
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-4">Reporte de Transacciones</h3>
        <table className="w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2">Tipo</th>
              <th className="p-2">Modelo</th>
              <th className="p-2">Calidad</th>
              <th className="p-2">Tipo de Transacción</th>
              <th className="p-2">Cantidad</th>
              <th className="p-2">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {stockTransactions.map((transaction) => {
              const product = products.find((p) => p.id === transaction.productId);
              return (
                <tr key={transaction.id} className="border-t">
                <td className="p-2">{product?.type}</td>
                <td className="p-2">{product?.model}</td>
                <td className="p-2">{product?.quality}</td>
                <td className="p-2">{transaction.type}</td>
                <td className="p-2">{transaction.quantity}</td>
                <td className="p-2">{transaction.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockDashboardPage;
