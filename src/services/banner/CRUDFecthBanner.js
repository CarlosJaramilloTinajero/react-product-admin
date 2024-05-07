import { fetchData, makeApiRequest } from "../auxiliar";

export const getBannerAPI = () => fetchData({ url: '/public/banners', method: 'get', usePublicToken: true, useToken: false }).then(res => res ? res.data : []);

export function getBannerByFiltersAPI({ page = 0, perPage = 30, filters = {}, funcSuccess = () => { }, funcError = () => { }, showNotify = false }) {
    makeApiRequest({
        url: `/public/banners?page=${page}&perPage=${perPage}`,
        method: 'post',
        msgError: 'Error al obtener los banners',
        msgSuccess: 'Banners cargados con exito',
        requestData: filters,
        funcSuccess,
        funcError,
        showNotify,
        usePublicToken: true,
        useToken: false
    })
}

export function deleteBannerAPI({ id, funcSuccess = () => { }, funcError = () => { }, showNotify = false }) {
    makeApiRequest({
        url: `/banner/${id}`,
        method: 'delete',
        msgError: 'Error al eliminar el banner',
        msgSuccess: 'Banner eliminado correctamente',
        funcSuccess,
        funcError,
        showNotify
    })
}

export function updateBannerAPI({ id, requestData, funcSuccess = () => { }, funcError = () => [], showNotify = false }) {
    const notAddToFormData = ['image_act'];
    const newFormData = new FormData();

    Object.entries(requestData).map(([index, value]) => {
        if (!value) return;
        if (notAddToFormData.includes(index)) return;
        newFormData.append(index, value);
    });

    makeApiRequest({
        url: `/banner/${id}`,
        method: 'post',
        msgSuccess: 'Banner actualizado correctamente',
        msgError: 'Error al actualizar el banner',
        funcSuccess,
        funcError,
        requestData: newFormData,
        showNotify
    });
}

export function addBannerAPI({ requestData, funcSuccess = () => { }, funcError = () => { }, showNotify = false }) {
    const notAddToFormData = ['image_act'];
    const newFormData = new FormData();

    Object.entries(requestData).map(([index, value]) => {
        if (!value) return;
        if (notAddToFormData.includes(index)) return;
        newFormData.append(index, value);
    });

    makeApiRequest({
        url: '/banner',
        method: 'post',
        msgSuccess: 'Banner creado correctamente',
        msgError: 'Error al crear el banner',
        funcSuccess,
        funcError,
        requestData: newFormData,
        showNotify
    });
}