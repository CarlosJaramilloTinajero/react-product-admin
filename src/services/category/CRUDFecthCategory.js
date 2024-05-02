import { makeApiRequest } from "../auxiliar";

export const getCategoriesAPI = ({ page = 0, perPage = 30, filters = {}, funcSuccess = () => { }, funcError = () => { }, showNotify = false }) => {
    makeApiRequest({
        url: `/public/categories?page=${page}&perPage=${perPage}`,
        method: 'post',
        funcSuccess,
        funcError,
        showNotify,
        msgSuccess: 'Categorias cargadas correctamente',
        msgError: 'Error al cargar las categorias',
        requestData: filters,
        usePublicToken: true,
        useToken: false
    })
};

export const deleteCategoryAPI = ({ id, funcSuccess = () => { }, funcError = () => { }, showNotify = false }) => {
    makeApiRequest({
        url: `/category/${id}`,
        method: 'delete',
        funcSuccess,
        funcError,
        showNotify,
        msgSuccess: 'Categoria eliminada c  orrectamente',
        msgError: 'Error al eliminar la categoria'
    })
};

export const updateCategoryAPI = ({ requestData, id, funcSuccess = () => { }, funcError = () => { }, showNotify = false }) => {
    if (!id) return null;

    makeApiRequest({
        url: `/category/${id}`,
        method: 'post',
        funcSuccess,
        funcError,
        requestData,
        showNotify,
        msgSuccess: 'Catgoria actualizada correctamente',
        msgError: 'Error al actualizar la categoria'
    });
};

export const addCategoryAPI = ({ requestData, funcSuccess = () => { }, funcError = () => { }, showNotify = false }) => {
    makeApiRequest({
        url: '/category',
        method: 'post',
        funcSuccess,
        funcError,
        requestData,
        showNotify,
        msgSuccess: 'Categoria creada correctamente',
        msgError: 'Error al crear la categoria'
    });
};