import { makeApiRequest } from '../Auxiliar';

export const getBrandsAPI = ({ page = 0, perPage = 30, filters = {}, funcSuccess = () => { }, funcError = () => { }, showNotify = false }) => {
    makeApiRequest({
        url: `/public/brands?page=${page}&perPgae=${perPage}`,
        method: 'post',
        funcSuccess,
        funcError,
        showNotify,
        msgSuccess: 'Marcas cargadas correctamente',
        msgError: 'Error al cargar las marcas',
        requestData: filters,
        usePublicToken: true,
        useToken: false
    });
}

export const deleteBrandAPI = ({ id, funcSuccess = () => { }, funcError = () => { }, showNotify = false }) => {
    makeApiRequest({
        url: `/brand/${id}`,
        method: 'delete',
        funcSuccess,
        funcError,
        showNotify,
        msgSuccess: 'Marca eliminada correctamente',
        msgError: 'Error al eliminar la marca'
    });
}

export const updateBrandAPI = ({ id, requestData, funcSuccess = () => { }, funcError = () => { }, showNotify = false }) => {
    if (!id) return null;

    makeApiRequest({
        url: `/brand/${id}`,
        method: 'post',
        requestData,
        funcSuccess,
        funcError,
        showNotify,
        msgError: 'Error al actualizar la marca',
        msgSuccess: 'Marca actualizada correctamente'
    })
}

export const addBrandAPI = ({ requestData, funcSuccess = () => { }, funcError = () => { }, showNotify = false }) => {
    makeApiRequest({
        url: '/brand',
        method: 'post',
        funcSuccess,
        funcError,
        showNotify,
        msgSuccess: 'Marca creada correctamente',
        msgError: 'Error al crear la marca',
        requestData
    })
}