import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { createOrder } from "../../service/orderService";

const InfoPage = () => {
    const { cartItems, setCartItems } = useCart();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        identificationType: "",
        identificationNumber: "",
        phoneNumber: "",
        addressStreetName: "",
    });
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePayment = async () => {
        const transformData = {
            items: cartItems.map(item => ({
                productId: item._id,
                brand: item.brand,
                model: item.model,
                category: item.category,
                description: item.description,
                quality: item.quality,
                priceSold: item.priceSold,
                codigo: item.codigo,
                stock: item.stock,
                quantity: item.cantidad,
            })),
            payer: {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                identification: {
                    identificationType: formData.identificationType,
                    identificationNumber: formData.identificationNumber
                },
                phone: {
                    phoneNumber: formData.phoneNumber
                },
                address: {
                    addressStreetName: formData.addressStreetName
                }
            }
        }

        console.log("Datos del pedido:", transformData);

        const response = await createOrder(transformData);
        console.log("Respuesta del servidor:", response);

        if (response.id) {
            localStorage.setItem("preferenceId", response.id);
        }

        navigate("/payment");
    }

    return (
        <div className="min-h-screen pt-6 bg-gray-100">
            <div className='w-4/5 mx-auto flex justify-between gap-8'>
                <div className='bg-white shadow-md rounded-lg p-4 w-full'>
                    <h1 className="font-bold text-xl">Información del Pedido</h1>
                    <div className="grid grid-cols-2 gap-4">
                        <div className='mt-4'>
                            <label className='block text-sm font-medium text-gray-700'>Nombre</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData?.firstName}
                                onChange={handleInputChange}
                                className='mt-1 block w-full bg-gray-100 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500'
                                placeholder="Ingrese su nombre"
                            />
                        </div>
                        <div className='mt-4'>
                            <label className='block text-sm font-medium text-gray-700'>Apellido</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData?.lastName}
                                onChange={handleInputChange}
                                className='mt-1 block w-full bg-gray-100 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500'
                                placeholder="Ingrese su apellido"
                            />
                        </div>
                        <div className='mt-4 col-span-2'>
                            <label className='block text-sm font-medium text-gray-700'>Correo Electrónico</label>
                            <input
                                type="text"
                                name="email"
                                value={formData?.email}
                                onChange={handleInputChange}
                                className='mt-1 block w-full bg-gray-100 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500'
                                placeholder="Ingrese su correo electrónico"
                            />
                        </div>
                        <div className='mt-4'>
                            <label className='block text-sm font-medium text-gray-700'>Tipo de Identificación</label>
                            <input
                                type="text"
                                name="identificationType"
                                value={formData?.identificationType}
                                onChange={handleInputChange}
                                className='mt-1 block w-full bg-gray-100 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500'
                                placeholder="Ingrese su tipo de identificación"
                            />
                        </div>
                        <div className='mt-4'>
                            <label className='block text-sm font-medium text-gray-700'>Número de Identificación</label>
                            <input
                                type="text"
                                name="identificationNumber"
                                value={formData?.identificationNumber}
                                onChange={handleInputChange}
                                className='mt-1 block w-full bg-gray-100 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500'
                                placeholder="Ingrese su número de identificación"
                            />
                        </div>
                        <div className='mt-4'>
                            <label className='block text-sm font-medium text-gray-700'>Teléfono</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={formData?.phoneNumber}
                                onChange={handleInputChange}
                                className='mt-1 block w-full bg-gray-100 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500'
                                placeholder="Ingrese su teléfono"
                            />
                        </div>
                        <div className='mt-4'>
                            <label className='block text-sm font-medium text-gray-700'>Dirección</label>
                            <input
                                type="text"
                                name="addressStreetName"
                                value={formData?.addressStreetName}
                                onChange={handleInputChange}
                                className='mt-1 block w-full bg-gray-100 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500'
                                placeholder="Ingrese su dirección"
                            />
                        </div>
                    </div>
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

                    <button type="button" onClick={handlePayment} className='mt-4 w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-700'>
                        Ir a Pagar
                    </button>
                    <button className='mt-4 w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-400'>
                        <NavLink to="/cart">
                            Volver
                        </NavLink>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default InfoPage