import React from "react";
import { createOrdenCompra } from "../../service/ordenCompraService";

// Formateador de fechas
const dateFormatter = new Intl.DateTimeFormat("es-PE", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export default function CotizacionModal({
  isOpen,
  cotizacion,
  onClose,
  onChangeStatus,
}) {
  if (!isOpen || !cotizacion) return null;

  //   {item.fechaCotizacion
  //                     ? dateFormatter.format(new Date(item.fechaCotizacion))
  //                     : 'Sin fecha'}
const handleAprobar = async () => {
    try {
      // 1. Cambiar estado de cotización
      await onChangeStatus("Aprobado");

      // 2. Crear orden de compra
      const ordenPayload = {
        cotizacionId: cotizacion._id,
        companyName: cotizacion.companyName,
        productos: cotizacion.productos,
        estadoPago: "Pendiente Pago",
        estadoOrden: "Solicitado",
      };

      await createOrdenCompra(ordenPayload);
      alert("Cotización aprobada y orden de compra creada exitosamente.");
    } catch (error) {
      console.error("Error al aprobar y generar orden:", error);
      alert("Error al generar orden de compra.");
    }
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-4">
        <h3 className="text-xl font-bold mb-4">Detalles de la Cotización</h3>
        <div className="overflow-y-auto max-h-96">
          <p>
            <strong>Proveedor:</strong> {cotizacion.companyName}
          </p>
          <p>
            <strong>Fecha:</strong>{" "}
            {cotizacion.fechaCotizacion
              ? dateFormatter.format(new Date(cotizacion.fechaCotizacion))
              : "Sin fecha"}
          </p>
          <p>
            <strong>Estado:</strong> {cotizacion.estado}
          </p>
          <div className="mt-4">
            <h4 className="font-semibold">Productos</h4>
            <div>
              {cotizacion.productos.map((p, idx) => (
                <div key={idx} className="border p-4 rounded-lg mb-2 ">
                  <ul>
                    <li>
                      <strong>Producto {idx + 1}:</strong>
                      <ul className="list-disc pl-5">
                        <li>Marca: {p.marca}</li>
                        <li>Modelo: {p.modelo}</li>
                        <li>Tipo: {p.tipo}</li>
                        <li>Calidad: {p.calidad}</li>
                        <li>Cantidad: {p.cantidad}</li>
                        <li>Precio Unitario: S/. {p.precio}</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-6 space-x-2">
          <button
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            onClick={handleAprobar}
          >
            Aprobar
          </button>
          <button
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            onClick={() => onChangeStatus("Rechazado")}
          >
            Rechazar
          </button>
          <button
            className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
