import ClientAxios from "../config/ClientAxios";

const createBoleta = async (boleta) => {
  try {
    const response = await ClientAxios.post("/boletas/createBoleta", boleta);
    return response.data;
  } catch (error) {
    console.error("Error creating boleta:", error);
    throw error;
  }
}

const getBoletas = async () => {
  try {
    const response = await ClientAxios.get("/boletas/getBoletas");
    return response.data;
  } catch (error) {
    console.error("Error fetching boletas:", error);
    throw error;
  }
}

const getBoletaById = async (id) => {
  try {
    const response = await ClientAxios.get(`/boletas/getBoletaById/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching boleta:", error);
    throw error;
  }
}

export { createBoleta, getBoletas, getBoletaById };