import { makeApiRequest } from "../auxiliar";

export const getDepartamentsAPI = ({ page = 0, perPage = 30, filters = {}, funcSuccess = () => { }, funcError = () => { }, showNotify = false }) => {
    makeApiRequest({
        url: `/public/departaments?page=${page}&perPage=${perPage}`,
        method: 'post',
        funcSuccess,
        funcError,
        showNotify,
        msgSuccess: 'Departamentos cargados correctamente',
        msgError: 'Error al cargar las departamentos',
        requestData: filters,
        usePublicToken: true,
        useToken: false
    })
};

export const deleteDepartamentAPI = ({ id, funcSuccess = () => { }, funcError = () => { }, showNotify = false }) => {
    makeApiRequest({
        url: `/departament/${id}`,
        method: 'delete',
        funcSuccess,
        funcError,
        showNotify,
        msgSuccess: 'Departamento eliminado correctamente',
        msgError: 'Error al eliminar el departamento'
    })
};

export const updateDepartamentAPI = ({ requestData, id, funcSuccess = () => { }, funcError = () => { }, showNotify = false }) => {
    if (!id) return null;

    makeApiRequest({
        url: `/departament/${id}`,
        method: 'post',
        funcSuccess,
        funcError,
        requestData,
        showNotify,
        msgSuccess: 'Departamento actualizado correctamente',
        msgError: 'Error al actualizar el departamento'
    });
};

export const addDepartamentAPI = ({ requestData, funcSuccess = () => { }, funcError = () => { }, showNotify = false }) => {
    makeApiRequest({
        url: '/departament',
        method: 'post',
        funcSuccess,
        funcError,
        requestData,
        showNotify,
        msgSuccess: 'Departamento creado correctamente',
        msgError: 'Error al crear el departamento'
    });
};