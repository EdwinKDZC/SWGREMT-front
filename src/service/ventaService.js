import clientAxios from "../config/ClientAxios";

const registrarVenta = async (venta) => {
  try {
    const response = await clientAxios.post("/ventas/registrarVenta", venta);
    return response.data;
  } catch (error) {
    console.error("Error al registrar la venta:", error);
    throw error;
  }
}

export {registrarVenta};
