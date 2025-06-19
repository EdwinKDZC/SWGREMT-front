import React, { useEffect, useState } from 'react';
import { getCotizarProductos, updateCotizarProducto } from '../../service/cotizarProductoService';
import CotizacionModal from '../../components/dashboard/CotizacionModal';

// Formateador de fechas
const dateFormatter = new Intl.DateTimeFormat('es-PE', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
});

export default function MisCotizacionesPage() {
  const [cotizacion, setCotizacion] = useState([]);
  const [selectedCotizacion, setSelectedCotizacion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCotizarProductos = async () => {
    try {
      const response = await getCotizarProductos();
      setCotizacion(response);
    } catch (error) {
      console.error("Error fetching cotizar productos:", error);
    }
  };

  useEffect(() => {
    fetchCotizarProductos();
  }, []);

  const openModal = (cotizacion) => {
    setSelectedCotizacion(cotizacion);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCotizacion(null);
    setIsModalOpen(false);
  };

  const changeStatus = async (newStatus) => {
  if (selectedCotizacion) {
    await updateCotizarProducto(selectedCotizacion._id, {
      ...selectedCotizacion,
      estado: newStatus,
    });
    // Actualiza en el frontend
    const updated = cotizacion.map((c) =>
      c._id === selectedCotizacion._id ? { ...c, estado: newStatus } : c
    );
    setCotizacion(updated);
    closeModal();
  }
};

console.log("error que necesito cotizacion",cotizacion);
  return (
    <div>
      <div className="mt-6">
        <h3 className="text-lg font-bold mb-4">Productos del Proveedor</h3>
        <table className="w-full table-auto bg-white shadow rounded">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2">Proveedor</th>
              <th className="p-2">Fecha</th>
              <th className="p-2">Estado</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cotizacion.map((item) => (
              <tr key={item._id} className="text-center border-t">
                <td className="p-2">{item.companyName}</td>
                <td className="p-2">
                  {item.fechaCotizacion
                    ? dateFormatter.format(new Date(item.fechaCotizacion))
                    : 'Sin fecha'}
                </td>
                <td className="p-2">{item.estado}</td>
                <td className="p-2">
                  <button
                    className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                    onClick={() => openModal(item)}
                  >
                    Ver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CotizacionModal
        isOpen={isModalOpen}
        cotizacion={selectedCotizacion}
        onClose={closeModal}
        onChangeStatus={changeStatus}
      />
    </div>
  );
}
