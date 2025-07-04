import ClientAxios from "../config/ClientAxios";

export const createOrder = async (orderData) => {
    try {
        const response = await ClientAxios.post("/orders/createOrder", orderData);
        return response.data;
    } catch (error) {
        console.error("Error al crear la orden:", error);
        throw error;
    }
};

export const verifyPayment = async (paymentId) => {
    try {
        const response = await ClientAxios.get(`/orders/verifyPayment/${paymentId}`);
        return response.data;
    } catch (error) {
        console.error("Error al verificar el pago:", error);
        throw error;
    }
}