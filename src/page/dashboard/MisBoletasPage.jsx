import React, { useState, useEffect } from "react";
import { getVentaById, getVentasByPage } from "../../service/ventaService";
import MisBoletasModal from "../../components/dashboard/MisBoletasModal";

const dateFormatter = new Intl.DateTimeFormat("es-PE", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export default function MisBoletasPage() {
  const [boletas, setBoletas] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedBoleta, setSelectedBoleta] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPage = async (newPage) => {
    try {
      const data = await getVentasByPage(newPage);
      console.log("Datos de ventas:", data);
      setBoletas(data.ventas);
      setTotalPages(data.totalPages);
      setPage(parseInt(data.page));
    } catch (error) {
      console.error("Error al cargar boletas", e);
    }
  }

  useEffect(() => {
    fetchPage(1);
  }, []);

  const openModal = async (boleta) => {
    // setSelectedBoleta(boleta);
    // setIsModalOpen(true);

    try {
      const data = await getVentaById(boleta._id);
      setSelectedBoleta(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error al cargar boleta:", error);
      alert("Ocurrió un error al cargar los detalles de la boleta.");
    }
  };

  const closeModal = () => {
    setSelectedBoleta(null);
    setIsModalOpen(false);
  };

  return (
    <div className="w-full min-h-screen p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Mis Boletas</h2>
      <table className="w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-green-800 text-white">
          <tr>
            <th className="p-2">Boleta</th>
            <th className="p-2">Fecha</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {boletas.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center p-4">
                No hay boletas.
              </td>
            </tr>
          ) : (
            boletas.map((boleta) => (
              <tr key={boleta._id} className="border-t hover:bg-gray-50">
                <td className="p-2 font-mono">{boleta.numero}</td>
                <td className="p-2">
                  {dateFormatter.format(new Date(boleta.createdAt))}
                </td>
                <button
                  className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                  onClick={() => openModal(boleta)}
                >
                  Ver
                </button>
                {/* <td className="p-2 text-left">
                  {boleta.productos.map((p) => (
                    <div key={p.codigo}>
                      <strong>
                        {p.brand} {p.model}
                      </strong>{" "}
                      x{p.cantidad}
                    </div>
                  ))}
                </td>
                <td className="p-2 text-right">S/ {boleta.total.toFixed(2)}</td> */}
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="flex justify-center items-center space-x-4 mt-4">
        <button
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => fetchPage(page - 1)}
          disabled={page <= 1}
        >
          Anterior
        </button>
        <span>
          Página {page} de {totalPages}
        </span>
        <button
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => fetchPage(page + 1)}
          disabled={page >= totalPages}
        >
          Siguiente
        </button>
      </div>
      <MisBoletasModal
        isOpen={isModalOpen}
        onClose={closeModal}
        boleta={selectedBoleta}
      />
    </div>
  );
}
