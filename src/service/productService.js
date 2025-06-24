import clientAxios from "../config/ClientAxios";

const createProduct = async (product) => {
    try {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };

        const response = await clientAxios.post(
            "/products/createProduct",
            product,
            config
        );
        return response.data;
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
};

const getProducts = async () => {
    try {
        const response = await clientAxios.get("/products/getProducts");
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

const getProductById = async (idProduct) => {
    try {
        const response = await clientAxios.get(
            `/products/getProductById/${idProduct}`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        throw error;
    }
};

const updateProduct = async (idProduct, product) => {
    try {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };
        const response = await clientAxios.put(
            `/products/updateProduct/${idProduct}`,
            product,
            config
        );
        return response.data;
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
};

const deleteProduct = async (idProduct) => {
    try {
        const response = await clientAxios.delete(
            `/products/deleteProduct/${idProduct}`
        );
        return response.data;
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
};

export {
    createProduct,
    deleteProduct,
    getProductById,
    getProducts,
    updateProduct,
};
