import ClientAxios from "../config/ClientAxios";

const createOrdenCompra = async (ordencompra) => {
    try {
        const response = await ClientAxios.post("/ordenCompras/createOrdenCompra", ordencompra);
        return response.data;
    } catch (error) {
        console.error("Error Orden de Compra:", error);
        throw error;
    }
};

const getOrdenesCompra = async () => {
    try {
        const response = await ClientAxios.get("/ordenCompras/getOrdenesCompra");
        return response.data;
    } catch (error) {
        console.error("Error fetching ordenes de compra:", error);
        throw error;
    }
}

const updateEstadoPago = async (idOrdenCompra, estadoPago) => {
    try {
        const response = await ClientAxios.put(
            `/ordenCompras/updateEstadoPago/${idOrdenCompra}`,
            { estadoPago }
        );
        return response.data;
    } catch (error) {
        console.error("Error updating orden de compra:", error);
        throw error;
    }
}

const updateEstadoOrden = async (idOrdenCompra, estadoOrden) => {
    try {
        const response = await ClientAxios.put(
            `/ordenCompras/updateEstadoOrden/${idOrdenCompra}`,
            { estadoOrden }
        );
        return response.data;
    } catch (error) {
        console.error("Error updating orden de compra:", error);
        throw error;
    }
}

export { createOrdenCompra, getOrdenesCompra, updateEstadoPago, updateEstadoOrden };