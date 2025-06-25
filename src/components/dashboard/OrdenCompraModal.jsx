import React from "react";
import { updateEstadoOrden, updateEstadoPago } from "../../service/ordenCompraService";

export default function OrdenCompraModal({ isOpen, orden, onClose, onUpdated }) {
  if (!isOpen || !orden) return null;
  console.log("Orden recibida en el modal:", orden);

  const handlePago = async () => {
    try {
      await updateEstadoPago(orden._id, "Pagado");
      alert("Estado de pago actualizado.");
      onUpdated();
    } catch (error) {
      alert("Error al actualizar el estado de pago.");
    }
  };

  const handleConforme = async () => {
    try {
      await updateEstadoOrden(orden._id, "Conforme");
      alert("Orden marcada como conforme y stock actualizado.");
      onUpdated();
    } catch (error) {
      alert("Error al actualizar el estado de la orden.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Detalle de Orden</h2>

        <p className="mb-2"><strong>Proveedor:</strong> {orden.companyName}</p>
        <p className="mb-2"><strong>Fecha:</strong> {new Date(orden.fechaOrden).toLocaleDateString("es-PE")}</p>
        <p className="mb-2"><strong>Estado de Orden:</strong> {orden.estadoOrden}</p>
        <p className="mb-2"><strong>Estado de Pago:</strong> {orden.estadoPago}</p>

        <table className="w-full mt-4 table-auto text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Marca</th>
              <th className="p-2">Modelo</th>
              <th className="p-2">Cantidad</th>
              <th className="p-2">Precio</th>
            </tr>
          </thead>
          <tbody>
            {orden.productos.map((p, index) => (
              <tr key={index} className="text-center">
                <td className="p-2">{p.marca}</td>
                <td className="p-2">{p.modelo}</td>
                <td className="p-2">{p.cantidad}</td>
                <td className="p-2">S/ {p.precio.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end gap-2 mt-6">
          {orden.estadoPago === "Pendiente Pago" && (
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              onClick={handlePago}
            >
              Marcar como Pagado
            </button>
          )}
          {orden.estadoOrden === "Solicitado" && (
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={handleConforme}
            >
              Marcar como Conforme
            </button>
          )}
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
