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

export {
    updateStock,

};