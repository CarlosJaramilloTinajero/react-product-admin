import { makeApiRequest } from "../Auxiliar";

export const updateProduct = async ({ formData, funcSuccess = () => { }, funcError = () => { }, idProduct, showNotify = false }) => {
    if (!idProduct) return null;

    const newFormData = new FormData();
    // Iteramos sobre cada propiedad del objeto 'formData' para guardarlo en el nuevo FormData, para poder
    // mandar la imagen en el formato correcto
    Object.entries(formData).map(([index, value]) => {
        newFormData.append(index, value);
    })

    makeApiRequest({
        url: `product/post/${idProduct}`,
        method: 'post',
        funcSuccess,
        funcError,
        showNotify,
        msgSuccess: 'Producto actualizado correctamente',
        msgError: 'Error al actualizar el producto',
        requestData: newFormData,
    });
}

export const addProduct = async ({ formData, funcSuccess = () => { }, funcError = () => { }, showNotify = false }) => {
    const newFormData = new FormData();
    // Iteramos sobre cada propiedad del objeto 'formData' para guardarlo en el nuevo FormData, para poder
    // mandar la imagen en el formato correcto
    Object.entries(formData).map(([index, value]) => {
        newFormData.append(index, value);
    })
    makeApiRequest({
        url: '/products/create',
        method: 'post',
        funcSuccess,
        funcError,
        showNotify,
        msgSuccess: 'Producto agregado correctamente',
        msgError: 'Error al agragar el producto',
        requestData: newFormData,
    });
}

export const deleteProductByID = async ({ id, funcSuccess = () => { }, funcError = () => { }, showNotify = false }) => {
    makeApiRequest({
        url: `product/${id}`,
        method: 'delete',
        funcSuccess,
        funcError,
        showNotify,
        msgSuccess: 'Productos eliminado correctamente',
        msgError: 'Error al eliminar el productos',
    });
}

export const getProductsAPI = async ({ page = 0, perPage = 30, filters = {}, funcSuccess = () => { }, funcError = () => { }, showNotify = false }) => {
    makeApiRequest({
        url: 'products?page=' + page + '&perPage=' + perPage,
        method: 'post',
        funcSuccess,
        funcError,
        showNotify,
        msgSuccess: 'Productos cargados correctamente',
        msgError: 'Error al cargar los productos',
        requestData: filters
    });
}