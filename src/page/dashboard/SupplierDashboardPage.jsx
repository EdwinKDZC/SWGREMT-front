import React, { useState, useEffect } from "react";
import SupplierModalDashboardComponent from "../../components/dashboard/SupplierModalDashboardComponent";
import { getSuppliers, deleteSupplier } from "../../service/supplierService";

const SupplierDashboardPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [suppliers, setSuppliers] = useState([]);
    const [editingSupplier, setEditingSupplier] = useState(null);

    const fetchSuppliers = async () => {
        try {
            const data = await getSuppliers();
            setSuppliers(data);
        } catch (error) {
            console.error("Error fetching suppliers:", error);
        }
    };

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const handleOpenModal = (supplier = null) => {
        setEditingSupplier(
            supplier || {
                companyName: "",
                ruc: "",
                telefono: "",
                direccion: "",
                email: "",
            }
        );
        setIsModalOpen(true);
    };

    const handleDeleteSupplier = async (id) => {
        try {
            await deleteSupplier(id);
            fetchSuppliers(); // Actualiza la lista de proveedores después de eliminar
        } catch (error) {
            console.error("Error deleting supplier:", error);
        }
    };

    return (
        <div className="w-full min-h-screen p-6 bg-gray-100">
            <h1 className="text-2xl font-bold mb-6 text-blue-800">Supplier Dashboard</h1>

            <div className="flex justify-between items-center mb-4">
                <button
                    className="px-4 py-2 rounded-md bg-blue-800 text-white hover:bg-blue-700"
                    onClick={() => handleOpenModal()}
                >
                    Registrar Proveedor
                </button>
            </div>

            {/* Supplier List */}
            <div className="mt-6">
                <h3 className="text-lg font-bold mb-4">Proveedores Registrados</h3>
                <table className="w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-blue-800 text-white">
                        <tr>
                            <th className="p-2">Nombre o Razon Social</th>
                            <th className="p-2">RUC</th>
                            <th className="p-2">Telefono</th>
                            <th className="p-2">Direccion</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {suppliers.map((supplier) => (
                            <tr key={supplier._id} className="border-t text-center">
                                <td className="p-2">{supplier.companyName}</td>
                                <td className="p-2">{supplier.ruc}</td>
                                <td className="p-2">{supplier.telefono}</td>
                                <td className="p-2">{supplier.direccion}</td>
                                <td className="p-2">{supplier.email}</td>
                                <td className="p-2">
                                    <button
                                        className="text-blue-600 hover:underline mr-2"
                                        onClick={() => handleOpenModal(supplier)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="text-red-600 hover:underline"
                                        onClick={() => handleDeleteSupplier(supplier._id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <SupplierModalDashboardComponent
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                supplierData={editingSupplier}
                fetchSuppliers={fetchSuppliers}
                setSupplierData={setEditingSupplier}
            />
        </div>
    );
};

export default SupplierDashboardPage;
