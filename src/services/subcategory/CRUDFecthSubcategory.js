import { makeApiRequest } from "../Auxiliar";

export const getSubcategoriesAPI = ({ page = 0, perPage = 30, filters = {}, funcSuccess = () => { }, funcError = () => { }, showNotify = false }) => {
    makeApiRequest({
        url: `/subcategories?page=${page}&perPage=${perPage}`,
        method: 'post',
        funcSuccess,
        funcError,
        requestData: filters,
        showNotify,
        msgSuccess: 'Subcategorias cargadas correctamente',
        msgError: 'Error al cargar las subcategorias'
    });
};

export const deleteSubcategoryAPI = ({ id, funcSuccess = () => { }, funcError = () => { }, showNotify = false }) => {
    makeApiRequest({
        url: `/subcategory/${id}`,
        method: 'delete',
        funcSuccess,
        funcError,
        showNotify,
        msgSuccess: 'Subcategoria eliminada correctamente',
        msgError: 'Error al eliminar la subcategoria'
    });
};

export const updateSubcategoryAPI = ({ id, requestData, funcSuccess = () => { }, funcError = () => { }, showNotify = false }) => {
    makeApiRequest({
        url: `/subcategory/${id}`,
        method: 'post',
        funcSuccess,
        funcError,
        requestData,
        showNotify,
        msgSuccess: 'Subcategoria actualizada correctamente',
        msgError: 'Error al actualizar la subcategoria'
    })
};

export const addSubcategoryAPI = ({ requestData, funcSuccess = () => { }, funcError = () => { }, showNotify = false }) => {
    makeApiRequest({
        url: '/subcategory',
        method: 'post',
        funcSuccess,
        funcError,
        requestData,
        showNotify,
        msgSuccess: 'Subcategoria creada correctamente',
        msgError: 'Error al crear la subcategoria'
    });
};