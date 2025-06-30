import { useEffect, useState } from "react";
import { getOrdenCompraByPage } from "../../service/ordenCompraService";
import OrdenCompraModal from "../../components/dashboard/OrdenCompraModal";

export default function OrdenesCompraPage() {
  const [ordenes, setOrdenes] = useState([]);
  const [selectedOrden, setSelectedOrden] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPage = async (newPage) => {
    try {
      const data = await getOrdenCompraByPage(newPage);
      setOrdenes(data.ordenes);
      setTotalPages(data.totalPages);
      setPage(parseInt(data.page));
    } catch (error) {
      console.error("Error cargando cotizaciones:", error);
    }
  };
  useEffect(() => {
    fetchPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openModal = (orden) => {
    setSelectedOrden(orden);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrden(null);
    setIsModalOpen(false);
  };

  const handleUpdateEstados = async () => {
    await fetchPage();
    closeModal();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Órdenes de Compra</h2>
      <table className="w-full bg-white shadow rounded table-auto">
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="p-2">Proveedor</th>
            <th className="p-2">Fecha</th>
            <th className="p-2">Estado Orden</th>
            <th className="p-2">Estado Pago</th>
            <th className="p-2">Acción</th>
          </tr>
        </thead>
        <tbody>
          {ordenes.map((orden) => (
            <tr key={orden._id} className="text-center border-t">
              <td className="p-2">{orden.companyName}</td>
              <td className="p-2">
                {new Date(orden.fechaOrden).toLocaleDateString("es-PE")}
              </td>
              <td className="p-2">{orden.estadoOrden}</td>
              <td className="p-2">{orden.estadoPago}</td>
              <td className="p-2">
                <button
                  className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                  onClick={() => openModal(orden)}
                >
                  Ver
                </button>
              </td>
            </tr>
          ))}
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

      <OrdenCompraModal
        isOpen={isModalOpen}
        orden={selectedOrden}
        onClose={closeModal}
        onUpdated={handleUpdateEstados}
      />
    </div>
  );
}
