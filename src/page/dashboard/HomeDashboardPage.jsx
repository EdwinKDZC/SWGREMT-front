import React, { useState, useEffect } from 'react';

const HomeDashboardPage = () => {
  const [productType, setProductType] = useState('');
  const [searchModel, setSearchModel] = useState('');
  const [products, setProducts] = useState([]);

  // Cargar productos desde localStorage al montar el componente
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
  }, []);

  // Filtrar productos según el tipo y el modelo
  const filteredProducts = products.filter((product) => {
    const matchesType = productType ? product.type === productType : true;
    const matchesModel = product.model.toLowerCase().includes(searchModel.toLowerCase());
    return matchesType && matchesModel;
  });

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-blue-800">Inicio - Gestión de Productos</h1>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Selector de tipo de producto */}
        <div>
          <label className="block text-lg font-medium mb-2" htmlFor="productType">
            Filtrar por tipo de producto:
          </label>
          <select
            id="productType"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="Batería">Batería</option>
            <option value="Zócalo">Zócalo</option>
            <option value="Pantalla">Pantalla</option>
          </select>
        </div>

        {/* Campo de búsqueda por modelo */}
        <div>
          <label className="block text-lg font-medium mb-2" htmlFor="searchModel">
            Buscar por modelo:
          </label>
          <input
            id="searchModel"
            type="text"
            placeholder="Ej: Galaxy S21"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchModel}
            onChange={(e) => setSearchModel(e.target.value)}
          />
        </div>
      </div>

      {/* Tabla de productos */}
      <div className="mt-6">
        <h3 className="text-lg font-bold mb-4">Productos Registrados</h3>
        <table className="w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2">Marca</th>
              <th className="p-2">Modelo</th>
              <th className="p-2">Calidad</th>
              <th className="p-2">Precio Compra</th>
              <th className="p-2">Precio Venta</th>
              <th className="p-2">Tipo</th>
              <th className="p-2">Cantidad Actual</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="p-2">{product.brand}</td>
                <td className="p-2">{product.model}</td>
                <td className="p-2">{product.quality}</td>
                <td className="p-2">${product.purchasePrice}</td>
                <td className="p-2">${product.salePrice}</td>
                <td className="p-2">{product.type}</td>
                <td className="p-2">{product.quantity}</td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No se encontraron productos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomeDashboardPage;
