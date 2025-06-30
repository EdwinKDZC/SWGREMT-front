import React from 'react'
import PropTypes from 'prop-types';

const MisBoletasModal = ({ isOpen, onClose, boleta }) => {
  if (!isOpen || !boleta) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded shadow-lg max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Detalles de la Boleta</h3>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 text-2xl"
          >
            &times;
          </button>
        </div>

        <div className="mb-4">
          <p><strong>Número:</strong> {boleta.numero}</p>
          <p><strong>Fecha:</strong> {new Date(boleta.createdAt).toLocaleDateString("es-PE")}</p>
          <p><strong>Total:</strong> S/ {boleta.total.toFixed(2)}</p>
        </div>

        <div>
          <h4 className="font-bold mb-2">Productos:</h4>
          <table className="w-full text-sm border">
            <thead className="bg-gray-200">
              <tr>
                {/* <th className="p-1 border">Código</th> */}
                <th className="p-1 border">Marca</th>
                <th className="p-1 border">Modelo</th>
                <th className="p-1 border">Cantidad</th>
                <th className="p-1 border">Precio</th>
              </tr>
            </thead>
            <tbody>
              {boleta.productos.map((prod, index) => (
                <tr key={index}>
                  {/* <td className="p-1 border">{prod.codigo}</td> */}
                  <td className="p-1 border">{prod.brand}</td>
                  <td className="p-1 border">{prod.model}</td>
                  <td className="p-1 border">{prod.cantidad}</td>
                  <td className="p-1 border">S/ {prod.precio.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
            <tr>
              <td colSpan="3" className="border p-2 text-right font-semibold">Total</td>
              <td className="border p-2 text-right font-semibold">S/ {boleta.total.toFixed(2)}</td>
            </tr>
          </tfoot>
          </table>
        </div>

        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
MisBoletasModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  boleta: PropTypes.shape({
    numero: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
    total: PropTypes.number.isRequired,
    productos: PropTypes.arrayOf(
      PropTypes.shape({
        codigo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        brand: PropTypes.string.isRequired,
        model: PropTypes.string.isRequired,
        cantidad: PropTypes.number.isRequired,
        precio: PropTypes.number.isRequired,
      })
    ).isRequired,
  }),
};

export default MisBoletasModal
// export default MisBoletasModal