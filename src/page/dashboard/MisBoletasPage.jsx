import React, { useState, useEffect } from "react";
import { getVentasByPage } from "../../service/ventaService";

const dateFormatter = new Intl.DateTimeFormat("es-PE", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export default function MisBoletasPage() {
  const [boletas, setBoletas] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPage = async (newPage) => {
    try {
      const data = await getVentasByPage(newPage);
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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Mis Boletas</h2>
      <table className="w-full bg-white shadow rounded mb-4 table-auto">
        <thead className="bg-green-800 text-white">
          <tr>
            <th className="p-2">Boleta</th>
            <th className="p-2">Fecha</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
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
                  onClick={() => openModal(cot)}
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
    </div>
  );
}
