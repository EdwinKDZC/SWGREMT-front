import React, { useState, useEffect } from 'react';
import {
  getCotizarProductosByPage,
  updateCotizarProducto,
} from '../../service/cotizarProductoService';
import CotizacionModal from '../../components/dashboard/CotizacionModal';

const dateFormatter = new Intl.DateTimeFormat('es-PE', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

export default function MisCotizacionesPage() {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [selectedCotizacion, setSelectedCotizacion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPage = async (p = 1) => {
    try {
      const data = await getCotizarProductosByPage(p);
      setCotizaciones(data.cotizarProductos);
      setTotalPages(data.totalPages);
      setPage(data.page);
    } catch (error) {
      console.error('Error cargando cotizaciones:', error);
    }
  };

  useEffect(() => {
    fetchPage(page);
  }, [page]);

  

  const openModal = (cot) => {
    setSelectedCotizacion(cot);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCotizacion(null);
    setIsModalOpen(false);
  };

  const changeStatus = async (newStatus) => {
    if (!selectedCotizacion) return;
    try {
      await updateCotizarProducto(selectedCotizacion._id, {
        ...selectedCotizacion,
        estado: newStatus,
      });
      setCotizaciones((prev) =>
        prev.map((c) =>
          c._id === selectedCotizacion._id ? { ...c, estado: newStatus } : c
        )
      );
    } catch (err) {
      console.error('Error actualizando estado:', err);
    }
    closeModal();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Mis Cotizaciones</h2>

      <table className="w-full bg-white shadow rounded mb-4 table-auto">
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="p-2">Proveedor</th>
            <th className="p-2">Fecha</th>
            <th className="p-2">Estado</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cotizaciones.map((cot) => (
            <tr key={cot._id} className="text-center border-t">
              <td className="p-2">{cot.companyName}</td>
              <td className="p-2">
                {cot.fechaCotizacion
                  ? dateFormatter.format(new Date(cot.fechaCotizacion))
                  : 'Sin fecha'}
              </td>
              <td className="p-2">{cot.estado}</td>
              <td className="p-2">
                <button
                  className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                  onClick={() => openModal(cot)}
                >
                  Ver
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="flex justify-center items-center gap-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Anterior
        </button>
        <span className="font-medium">
          Página {page} de {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Siguiente
        </button>
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
