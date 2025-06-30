import clientAxios from "../config/ClientAxios";

const updateStock = async () => {
    try {
        const response = await clientAxios.get("/products/getProducts");
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

const reducirStock = async (codigo, cantidad) => {
    try {
        const response = await clientAxios.put("/products/reducirStock", {
            codigo,
            cantidad
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

export {
    updateStock,
    reducirStock
};