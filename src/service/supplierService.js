import ClientAxios from "../config/ClientAxios";

const getSuppliers = async () => {
    try {
        const response = await ClientAxios.get("/suppliers/getSuppliers");
        return response.data;
    } catch (error) {
        console.error("Error fetching suppliers:", error);
        throw error;
    }
};

const getSupplierById = async (id) => {
    try {
        const response = await ClientAxios.get(`/suppliers/getSupplierById/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching supplier:", error);
        throw error;
    }
};

const createSupplier = async (supplierData) => {
    try {
        const response = await ClientAxios.post("/suppliers/createSupplier", supplierData);
        return response.data;
    } catch (error) {
        console.error("Error creating supplier:", error);
        throw error;
    }
};

const updateSupplier = async (id, supplierData) => {
    try {
        const response = await ClientAxios.put(`/suppliers/updateSupplier/${id}`, supplierData);
        return response.data;
    } catch (error) {
        console.error("Error updating supplier:", error);
        throw error;
    }
};

const deleteSupplier = async (id) => {
    try {
        const response = await ClientAxios.delete(`/suppliers/deleteSupplier/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting supplier:", error);
        throw error;
    }
};

const uploadSupplierFile = async (file) => {
    try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await ClientAxios.post("/suppliers/uploadSupplierFile", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error uploading supplier file:", error);
        throw error;
    }
}

const importSuppliers = async (supplierId, file) => {
    try {
        const formData = new FormData();
        formData.append("supplierId", supplierId);
        formData.append("file", file);

        const response = await ClientAxios.post("/suppliers/importSuppliers", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error importing suppliers:", error);
        throw error;
    }
}

const getCatalogSuppliers = async (supplierId) => {
    try {
        const response = await ClientAxios.get(`/suppliers/getCatalogSuppliers/${supplierId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching catalog suppliers:", error);
        throw error;
    }
}

export { getSuppliers, getSupplierById, createSupplier, updateSupplier, deleteSupplier, uploadSupplierFile, importSuppliers, getCatalogSuppliers };
