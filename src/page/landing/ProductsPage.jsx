import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { getProducts } from "../../service/productService";

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filterType, setFilterType] = useState("");
    const [priceRange, setPriceRange] = useState({ min: 0, max: 3000 });

    const { addToCart } = useCart();

    const fetchProducts = async () => {
        try {
            const response = await getProducts();
            const stockProducts = response.filter(
                (product) => product.stock > 0  
            );
            console.log("Filtered products with stock:", stockProducts);
            setProducts(stockProducts);
            setFilteredProducts(stockProducts);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    // Cargar productos desde localStorage
    useEffect(() => {
        fetchProducts();
    }, []);

    // Filtrar productos dinámicamente
    useEffect(() => {
        const filtered = products.filter((product) => {
            const matchesType = filterType ? product.category === filterType : true;
            const matchesPrice =
                parseFloat(product.priceSold) >= priceRange.min &&
                parseFloat(product.priceSold) <= priceRange.max;
            return matchesType && matchesPrice;
        });
        setFilteredProducts(filtered);
    }, [filterType, priceRange, products]);

    // Manejar cambios de rango de precio
    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        setPriceRange((prev) => ({
            ...prev,
            [name]: value ? parseFloat(value) : 0,
        }));
    };

    // Agregar al carrito
    const handleAddToCart = (product) => {
        addToCart(product);
    };

    return (
        <div className="p-10">
            {/* Filtros */}
            <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-gray-700 font-bold mb-2">
                        Tipo de Producto
                    </label>
                    <select
                        className="w-full p-2 border rounded-md"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <option value="">Todos</option>
                        <option value="Batería">Batería</option>
                        <option value="Zócalo">Zócalo</option>
                        <option value="Pantalla">Pantalla</option>
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700 font-bold mb-2">
                        Rango de Precio
                    </label>
                    <div className="flex items-center space-x-2">
                        <input
                            type="number"
                            name="min"
                            placeholder="Mínimo"
                            className="w-full p-2 border rounded-md"
                            onChange={handlePriceChange}
                        />
                        <input
                            type="number"
                            name="max"
                            placeholder="Máximo"
                            className="w-full p-2 border rounded-md"
                            onChange={handlePriceChange}
                        />
                    </div>
                </div>
            </div>

            {/* Productos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredProducts.length === 0 ? (
                    <p className="text-center text-gray-500">
                        No hay productos disponibles.
                    </p>
                ) : (
                    filteredProducts.map((product) => (
                        <div
                            key={product._id}
                            className="border rounded-lg p-4 flex flex-col items-center"
                        >
                            <img
                                src={
                                    product.image || "/images/default-image.png"
                                }
                                alt={product.brand}
                                className="h-32 mb-4"
                            />
                            <h2 className="font-bold text-lg">
                                {product.brand} - {product.model}
                            </h2>
                            <p className="text-gray-700">
                                ${parseFloat(product.priceSold).toFixed(2)}
                            </p>
                            <button
                                className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
                                onClick={() => handleAddToCart(product)}
                            >
                                Agregar al Carrito
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProductsPage;
