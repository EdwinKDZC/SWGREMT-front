import React, { useState, useEffect } from "react";
import { createSupplier, importSuppliers, updateSupplier } from "../../service/supplierService";

const SupplierModalDashboardComponent = ({
  isOpen,
  onClose,
  supplierData,
  fetchSuppliers,
  setSupplierData,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSupplierData({ ...supplierData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("Archivo seleccionado:", file);
    if (file) {
    setSupplierData({ ...supplierData, file: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (supplierData._id) {
        // Update existing supplier
        response = await updateSupplier(supplierData._id, supplierData);
        console.log("Proveedor actualizado:", response);
      } else {
        // Create new supplier
        response = await createSupplier(supplierData);
        console.log("Proveedor guardado:", response);
        await importSuppliers(response._id, supplierData.file); // Importa los datos del archivo
      }
      fetchSuppliers(); // Actualiza la lista de proveedores después de guardar
      onClose(); // Cierra el modal después de guardar
    } catch (error) {
      console.error("Error al guardar el proveedor:", error);
    }
  };



  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          {supplierData._id ? "Editar Proveedor" : "Registrar Proveedor"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium" htmlFor="companyName">
              Nombre o Razon Social
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={supplierData.companyName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium" htmlFor="ruc">
              RUC
            </label>
            <input
              type="text"
              id="ruc"
              name="ruc"
              value={supplierData.ruc}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium" htmlFor="telefono">
              Telefono
            </label>
            <input
              type="text"
              id="telefono"
              name="telefono"
              value={supplierData.telefono}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium" htmlFor="direccion">
              Direccion
            </label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              value={supplierData.direccion}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={supplierData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium" htmlFor="file">
              Archivo de Datos
            </label>
            <input
              type="file"
              id="file"
              name="file"
              accept=".csv, .xlsx, .xls"
              onChange={handleFileChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default SupplierModalDashboardComponent;
