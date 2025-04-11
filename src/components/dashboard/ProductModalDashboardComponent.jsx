import { createProduct } from "../../service/productService";

const ProductModalDashboardComponent = ({
    isOpen,
    onClose,
    productData,
    fetchProducts,
    setProductData,
}) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleImageChange = (e) => {
        setProductData({ ...productData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // onSave(productData);
        // onClose();

        try {
            const response = await createProduct(productData);
            console.log("Producto guardado:", response);
            fetchProducts(); // Actualiza la lista de productos después de guardar
            onClose(); // Cierra el modal después de guardar
        } catch (error) {
            console.error("Error al guardar el producto:", error);
        }
    };

    return isOpen ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">
                    {productData._id ? "Editar Producto" : "Registrar Producto"}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            className="block text-sm font-medium"
                            htmlFor="brand"
                        >
                            Marca
                        </label>
                        <input
                            type="text"
                            id="brand"
                            name="brand"
                            value={productData.brand}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-sm font-medium"
                            htmlFor="model"
                        >
                            Modelo
                        </label>
                        <input
                            type="text"
                            id="model"
                            name="model"
                            value={productData.model}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-sm font-medium"
                            htmlFor="category"
                        >
                            Categoria
                        </label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={productData.category}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-sm font-medium"
                            htmlFor="description"
                        >
                            Descripcion
                        </label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={productData.description}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-sm font-medium"
                            htmlFor="quality"
                        >
                            Calidad
                        </label>
                        <select
                            id="quality"
                            name="quality"
                            value={productData.quality}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md"
                        >
                            <option value="">Seleccione</option>
                            <option value="Original">Original</option>
                            <option value="Genérico">Genérico</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-sm font-medium"
                            htmlFor="purchasePrice"
                        >
                            Precio de Compra
                        </label>
                        <input
                            type="number"
                            id="purchasePrice"
                            name="purchasePrice"
                            value={productData.purchasePrice}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-sm font-medium"
                            htmlFor="price"
                        >
                            Precio de Venta
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={productData.price}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-sm font-medium"
                            htmlFor="image"
                        >
                            Imagen del Producto
                        </label>
                        <input
                            type="file"
                            id="image"
                            onChange={handleImageChange}
                            className="w-full"
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    ) : null;
};

export default ProductModalDashboardComponent;
