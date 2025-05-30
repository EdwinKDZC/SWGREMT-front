import ClientAxios from "../config/ClientAxios";

const createCotizarProducto = async (cotizacion) => {
    try {
        const response = await ClientAxios.post("/cotizarProductos/createCotizarProducto", cotizacion);
        return response.data;
    } catch (error) {
        console.error("Error fetching suppliers:", error);
        throw error;
    }
};

const getCotizarProductos = async () => {
    try {
        const response = await ClientAxios.get("/cotizarProductos/getCotizarProductos");
        return response.data;
    } catch (error) {
        console.error("Error fetching cotizar productos:", error);
        throw error;
    }
}

export { createCotizarProducto, getCotizarProductos };