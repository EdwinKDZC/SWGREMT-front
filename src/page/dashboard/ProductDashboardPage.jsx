import React, { useState, useEffect } from 'react';
import ProductModalDashboardComponent from '../../components/dashboard/ProductModalDashboardComponent';

const ProductDashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productType, setProductType] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState([]);

  // Cargar productos desde localStorage cuando el componente se monta
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    console.log("Cargando productos desde localStorage:", storedProducts);
    setProducts(storedProducts);
  }, []);

  // Guardar productos en localStorage cada vez que cambien
  useEffect(() => {
    if (products.length > 0) {
      console.log("Guardando productos en localStorage:", products);
      localStorage.setItem('products', JSON.stringify(products));
    }
  }, [products]);

  const handleOpenModal = (product = null) => {
    setEditingProduct(
      product || {
        brand: '',
        model: '',
        quality: '',
        purchasePrice: '',
        salePrice: '',
        image: null,
        type: productType, // Asigna el tipo seleccionado al producto
      }
    );
    setIsModalOpen(true);
  };

  const handleSaveProduct = (product) => {
    if (product.id) {
      // Actualizar producto existente
      setProducts(products.map((p) => (p.id === product.id ? product : p)));
    } else {
      // Agregar nuevo producto
      product.id = Date.now(); // Asigna un ID único
      setProducts([...products, product]);
    }
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-blue-800">Gestión de Productos</h1>

      {/* Selector de tipo de producto */}
      <div className="mb-6">
        <label className="block text-lg font-medium mb-2" htmlFor="productType">
          Selecciona un tipo de producto:
        </label>
        <select
          id="productType"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
        >
          <option value="">Seleccione</option>
          <option value="Batería">Batería</option>
          <option value="Zócalo">Zócalo</option>
          <option value="Pantalla">Pantalla</option>
        </select>
      </div>

      {/* Botón para abrir el modal */}
      <button
        className={`px-4 py-2 rounded-md mb-4 ${
          productType
            ? 'bg-blue-800 text-white hover:bg-blue-700'
            : 'bg-gray-400 text-gray-700 cursor-not-allowed'
        }`}
        disabled={!productType} // Botón deshabilitado si no se selecciona un tipo
        onClick={() => handleOpenModal()}
      >
        Registrar Producto
      </button>

      {/* Tabla de productos */}
      <div className="mt-6">
        <h3 className="text-lg font-bold mb-4">Productos Registrados</h3>
        <table className="w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2">Tipo</th>
              <th className="p-2">Marca</th>
              <th className="p-2">Modelo</th>
              <th className="p-2">Calidad</th>
              <th className="p-2">Precio Compra</th>
              <th className="p-2">Precio Venta</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="p-2">{product.type}</td>
                <td className="p-2">{product.brand}</td>
                <td className="p-2">{product.model}</td>
                <td className="p-2">{product.quality}</td>
                <td className="p-2">${product.purchasePrice}</td>
                <td className="p-2">${product.salePrice}</td>
                <td className="p-2">
                  <button
                    className="text-blue-600 hover:underline mr-2"
                    onClick={() => handleOpenModal(product)}
                  >
                    Editar
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <ProductModalDashboardComponent
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
        productData={editingProduct}
        setProductData={setEditingProduct}
      />
    </div>
  );
};

export default ProductDashboardPage;
