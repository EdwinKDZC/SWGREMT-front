import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../../context/CartContext";
initMercadoPago(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY || "", {
    locale: "es-PE",
});

const PaymentPage = () => {
    const { cartItems, setCartItems } = useCart();
    const [preferenceId, setPreferenceId] = useState(null);

    const totalGeneral = cartItems.reduce(
        (acc, item) => acc + item.priceSold * item.cantidad,
        0
    );

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
        if (storedCartItems) {
            setCartItems(storedCartItems);
        }
    }, []);

    useEffect(() => {
        const preference = localStorage.getItem("preferenceId") || null;
        setPreferenceId(preference);
    }, []);

    return (
        <div className="min-h-screen pt-6 bg-gray-100">
            <div className='w-4/5 mx-auto flex justify-between gap-8'>
                <div className='bg-white shadow-md rounded-lg p-4 w-full'>
                    <h1 className="font-bold text-xl">Método de Pago</h1>
                    {preferenceId ? (
                        <div className="w-96 flex flex-col gap-4 my-4">
                            <Wallet
                                initialization={{
                                    preferenceId: preferenceId,
                                    // redirectMode: "redirect",
                                    // redirectMode: "modal",
                                }}
                                customization={{
                                    texts: { valueProp: "smart_option" },
                                }}
                                locale="es-PE"
                            />
                        </div>
                        ) : <p>Cargando MercadoPago...</p>}
                </div>

                {/* Resumen de la compra */}
                <div className='w-2/6'>
                    <div className='w-full bg-white shadow-md rounded-lg p-4'>
                        <h2 className='text-xl'>Resumen de compra</h2>
                        <div>
                            <ul className="space-y-2">
                                {cartItems.map((item, index) => (
                                    <li key={index} className='flex justify-between items-center p-2 border rounded-lg'>
                                        <div className='flex flex-col'>
                                            <span className="text-gray-700">{item.brand} {item.model}</span>
                                            <span className="text-gray-500 text-sm">Cantidad: {item.cantidad}</span>
                                            <span className="text-gray-500 text-sm">Precio: S/ {item.priceSold.toFixed(2)}</span>
                                        </div>
                                        <span>S/ {(item.priceSold * item.cantidad).toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="font-bold text-end text-lg mt-6">
                            Total: S/ {totalGeneral.toFixed(2)}
                        </div>
                    </div>

                    {/* <button className='mt-4 w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-700'>
                        <NavLink to="/payment">
                            Finalizar Compra
                        </NavLink>
                    </button> */}
                    <button className='mt-4 w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-400'>
                        <NavLink to="/info">
                            Volver
                        </NavLink>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PaymentPage