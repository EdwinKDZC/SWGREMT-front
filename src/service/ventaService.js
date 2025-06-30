import clientAxios from "../config/ClientAxios";

const registrarVenta = async (venta) => {
    try {
        const response = await clientAxios.post(
            "/ventas/registrarVenta",
            venta
        );
        return response.data;
    } catch (error) {
        console.error("Error al registrar la venta:", error);
        throw error;
    }
};

const getVentasByPage = async (page) => {
    try {
        const resp = await clientAxios.get(
            `/ventas/getVentasByPage?page=${page}`
        );
        return resp.data;
    } catch (error) {
        console.error("Error al obtener las ventas por página:", error);
    }
};

const getVentaById = async (id) => {
    try {
        const resp = await clientAxios.get(`/ventas/getVentaById/${id}`);
        return resp.data;
    } catch (error) {
        console.error("Error al obtener la venta por ID:", error);
    }
};

export { registrarVenta, getVentasByPage, getVentaById };
