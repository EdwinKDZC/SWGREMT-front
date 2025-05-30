import React, { useEffect, useState } from 'react';
import { getCotizarProductos } from '../../service/cotizarProductoService';

export default function MisCotizacionesPage() {

    const [cotizacion,setCotizacion] = useState([]);

    const fetchCotizarProductos = async () => {
        try {
            const response = await getCotizarProductos();
            setCotizacion(response);
        } catch (error) {
            console.error("Error fetching cotizar productos:", error);
        }
    }
    useEffect(() => {
        fetchCotizarProductos();
    }, []);


    return (
    <div>

      <div className="mt-6">
        <h3 className="text-lg font-bold mb-4">Productos del Proveedor</h3>
        <table className="w-full table-auto bg-white shadow rounded">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2">Marca</th>
              <th className="p-2">Modelo</th>
              <th className="p-2">Tipo</th>
              <th className="p-2">Calidad</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Garantía</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cotizacion.map((item) => (
              <tr key={item._id} className="text-center border-t">
                <td className="p-2">{item.companyName}</td>
                {item.productos.map((product, index) => (
                  <React.Fragment key={index}>
                    <td className="p-2">{product.marca}</td>
                    <td className="p-2">{product.modelo}</td>
                    <td className="p-2">{product.tipo}</td>
                    <td className="p-2">{product.calidad}</td>
                    <td className="p-2">{product.precio}</td>
                    <td className="p-2">{product.fechaGarantia}</td>
                  </React.Fragment>
                ))}
                <td className="p-2">
                  {/* <button
                    className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                    onClick={() => handleAddToCart(product)}
                  >
                    Agregar
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
