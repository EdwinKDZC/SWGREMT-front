import React from 'react';

export default function CotizacionModal({ isOpen, cotizacion, onClose, onChangeStatus }) {
  if (!isOpen || !cotizacion) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-4">
        <h3 className="text-xl font-bold mb-4">Detalles de la Cotización</h3>
        <p><strong>Proveedor:</strong> {cotizacion.companyName}</p>
        <p><strong>Fecha:</strong> {cotizacion.fechaCotizacion}</p>
        <p><strong>Estado:</strong> {cotizacion.estado}</p>
        <div className="mt-4">
          <h4 className="font-semibold">Productos</h4>
          <ul className="list-disc list-inside">
            {cotizacion.productos.map((p, idx) => (
              <li key={idx}>
                {p.marca} - {p.modelo} | {p.tipo} | {p.calidad} | S/. {p.precio}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-end mt-6 space-x-2">
          <button
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            onClick={() => onChangeStatus('Aprobado')}
          >
            Aprobar
          </button>
          <button
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            onClick={() => onChangeStatus('Rechazado')}
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
