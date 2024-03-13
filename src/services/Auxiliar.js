import { notify, updateNotify } from "../notify";
import loadData from "./api";

export const fetchData = async ({ url, method, requestData = {} }) => {
    try {
        const { data } = await loadData({ url: url, method: method, data: requestData });
        return data && data.status ? data : null;
    } catch (error) {
        // console.log(error);
        if (error.response.status !== 401) {
            notify({ msg: 'Error en el servidor', type: 'error' });
        }
        return null;
    }
}

export const makeApiRequest = async ({ url, method, requestData = {}, funcSuccess = () => { }, funcError = () => { }, showNotify = false, msgSuccess = '', msgError = '' }) => {
    let idNotify = null;
    if (showNotify) idNotify = notify({ msg: 'Cargando...', type: 'loading' });

    try {
        const data = await fetchData({ url, method, requestData });

        if (data && data.status) {
            if (idNotify) updateNotify({ id: idNotify, msg: msgSuccess, type: 'success' });
            funcSuccess(data);
        } else {
            if (idNotify) updateNotify({ id: idNotify, msg: msgError, type: 'error' });
            funcError(data);
        }
    } catch (error) {
        funcError();
        if (idNotify) updateNotify({ id: idNotify, msg: msgError, type: 'error' });
    }

} 