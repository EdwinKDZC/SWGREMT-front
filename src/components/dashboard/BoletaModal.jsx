import React, { useRef } from "react";

const BoletaModal = ({ cart, setCart, boletaNum, setBoletaNum, isOpen, onClose, action }) => {
  const boletaRef = useRef(null);

  const total = cart.reduce(
    (acc, item) => acc + item.priceSold * item.quantity,
    0
  );

  const handlePrintBoleta = () => {
    if (boletaRef.current) {
      const printWindow = window.open("", "_blank");
      printWindow.document.write(`
        <html>
          <head>
            <title>Boleta de Venta</title>
            <style>
              body { font-family: Arial, sans-serif; }
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid #000; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
              .text-right { text-align: right; }
            </style>
          </head>
          <body>
            <h2 style="text-align: center;">BOLETA DE VENTA ELECTRÓNICA</h2>
            <p style="text-align: right; font-weight: bold;">Serie: B-${String(boletaNum).padStart(4, "0")}</p>
            <div style="margin-bottom: 16px;">
              <p><strong>Empresa:</strong> SWGREMT S.A.C.</p>
              <p><strong>RUC:</strong> 12345678901</p>
              <p><strong>Dirección:</strong> Av. Ejemplo 123, Lima, Perú</p>
              <p><strong>Teléfono:</strong> (01) 234-5678</p>
              <p><strong>Email:</strong> aticona19@gmail.com</p>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio Unitario</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                ${cart
                  .map(
                    (item) => `
                      <tr>
                        <td>${item.brand} ${item.model}</td>
                        <td>${item.quantity}</td>
                        <td>S/ ${item.priceSold.toFixed(2)}</td>
                        <td>S/ ${(item.priceSold * item.quantity).toFixed(2)}</td>
                      </tr>`
                  )
                  .join("")}
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3" class="text-right"><strong>Total</strong></td>
                  <td class="text-right"><strong>S/ ${total.toFixed(2)}</strong></td>
                </tr>
              </tfoot>
            </table>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();

      // Acciones luego de imprimir
      setBoletaNum(boletaNum + 1);
      setCart([]);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div ref={boletaRef} className="bg-white p-6 rounded shadow-md w-[600px]">
        <h2 className="text-center text-xl font-bold">BOLETA DE VENTA ELECTRÓNICA</h2>
        <p className="text-right font-semibold">
          Serie: B-{String(boletaNum).padStart(4, "0")}
        </p>
        <div className="mb-4 text-sm">
          <p><strong>Empresa:</strong> SWGREMT S.A.C.</p>
          <p><strong>RUC:</strong> 12345678901</p>
          <p><strong>Dirección:</strong> Av. Ejemplo 123, Lima, Perú</p>
          <p><strong>Teléfono:</strong> (01) 234-5678</p>
          <p><strong>Email:</strong> aticona19@gmail.com</p>
        </div>

        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Producto</th>
              <th className="border p-2">Cantidad</th>
              <th className="border p-2">Precio Unitario</th>
              <th className="border p-2">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, idx) => (
              <tr key={idx}>
                <td className="border p-2">{item.brand} {item.model}</td>
                <td className="border p-2 text-center">{item.quantity}</td>
                <td className="border p-2 text-right">S/ {item.priceSold.toFixed(2)}</td>
                <td className="border p-2 text-right">S/ {(item.priceSold * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" className="border p-2 text-right font-semibold">Total</td>
              <td className="border p-2 text-right font-semibold">S/ {total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>

        <div className="flex justify-end gap-2 mt-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={action}
          >
            Confirmar Venta
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handlePrintBoleta}
          >
            Imprimir
          </button>
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoletaModal;
