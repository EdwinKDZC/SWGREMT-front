import { useEffect, useRef, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import { verifyPayment } from "../../service/orderService";

const ConfirmationPage = () => {
  const [searchParams] = useSearchParams()
  const [order, setOrder] = useState({});
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchVerifyPayment = async () => {
      try {
        const paymentId = searchParams.get('payment_id');
        if (!paymentId || hasFetched.current) return;

        const alreadyVerified = localStorage.getItem(`verified-${paymentId}`);
        if (alreadyVerified) return;

        hasFetched.current = true;

        const result = await verifyPayment(paymentId);
        console.log("Payment verification result:", result);
        setOrder(result);

        if (result.status === 'completed') {
          localStorage.removeItem('cartItems');
          localStorage.removeItem('preferenceId');
        }

        localStorage.setItem(`verified-${paymentId}`, "true");
      } catch (error) {
        console.error("Error verifying payment:", error);
      }
    };

    fetchVerifyPayment();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">¡Gracias por tu compra!</h1>
        <p className="text-sm text-gray-700 mb-6">
          Hemos recibido tu solicitud de compra. Tu pedido está siendo procesado y recibirás un correo electrónico de confirmación en breve.
        </p>

        <div className="border-t border-gray-200 pt-6 text-left">
          <h2 className="text-xl text-center font-semibold mb-4">Resumen del pedido</h2>
          <ul className="text-gray-600 space-y-1">
            <div className="flex text-center font-semibold">
              <span className="flex-1">Producto</span>
              <span className="flex-1">Precio</span>
              <span className="flex-1">Cantidad</span>
              <span className="flex-1">Subtotal</span>
            </div>

            <div className="flex flex-col gap-4">
              {order.items?.map((item, index) => (
                <div key={index} className="flex text-center mb-2 border border-gray-200 rounded-lg p-2">
                  <span className="text-gray-700 flex-1">{item.brand} {item.model}</span>
                  <span className="text-gray-700 flex-1">S/. {item.priceSold.toFixed(2)}</span>
                  <span className="text-gray-700 flex-1">{item.quantity}</span>
                  <span className="text-gray-700 flex-1">S/. {(item.priceSold * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <li className="mt-4">
              <strong>Total Pagado:</strong> S/. {order.totalAmount?.toFixed(2) || '0.00'}
            </li>
          </ul>
        </div>

        <div className="mt-8">
          <NavLink
            to="/"
            className="inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            Volver al inicio
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationPage